/**
 * Customer service ticket service.
 * Handles:
 *   1. Atomic ticket ID generation (#FF101, #FF102, ...)
 *   2. Image upload to Firebase Storage
 *   3. Firestore document creation in customer_service collection
 *
 * Uses Firebase v9 modular SDK.
 */

import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import { db, storage } from '@/lib/firebase/client-firestore'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TicketInput {
  name: string
  phone: string
  orderId?: string
  description: string
  imageFile?: File | null
}

export interface TicketResult {
  ticketId: string
  docId: string
}

// ─── Ticket Number ────────────────────────────────────────────────────────────

/**
 * Get next ticket number using atomic increment.
 * Uses FieldValue.increment(1) — no transaction needed.
 */
async function getNextTicketNumber(): Promise<number> {
  const counterRef = doc(db, 'counters', 'ticket_counter')
  const snap = await getDoc(counterRef)

  if (!snap.exists()) {
    // First ever ticket — initialise counter at 101
    await setDoc(counterRef, { last_ticket_number: 101 })
    return 101
  }

  // Atomically increment
  await updateDoc(counterRef, { last_ticket_number: increment(1) })
  const updated = await getDoc(counterRef)
  return updated.data()?.last_ticket_number ?? 101
}

// ─── Image Upload ─────────────────────────────────────────────────────────────

async function uploadTicketImage(file: File, ticketNumber: number): Promise<string> {
  const timestamp = Date.now()
  const safeFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const path = `customer_service_images/FF${ticketNumber}_${timestamp}_${safeFilename}`

  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file, {
    contentType: file.type,
    cacheControl: 'public, max-age=31536000',
  })

  return getDownloadURL(snapshot.ref)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export async function createSupportTicket(input: TicketInput): Promise<TicketResult> {
  console.log('[ticketService] Starting ticket creation...')

  // Step 1: Get ticket number
  const ticketNumber = await getNextTicketNumber()
  const ticketId = `#FF${ticketNumber}`
  console.log('[ticketService] Ticket ID:', ticketId)

  // Step 2: Upload image (non-blocking on failure)
  let imageUrl: string | null = null
  if (input.imageFile) {
    try {
      console.log('[ticketService] Uploading image...')
      imageUrl = await uploadTicketImage(input.imageFile, ticketNumber)
      console.log('[ticketService] Image uploaded:', imageUrl)
    } catch (err) {
      console.error('[ticketService] Image upload failed (continuing without image):', err)
    }
  }

  // Step 3: Write ticket to Firestore
  const ticketsRef = collection(db, 'customer_service')
  const newDocRef = doc(ticketsRef)

  const ticketData = {
    ticket_id: ticketId,
    name: input.name.trim(),
    phone: input.phone.trim(),
    order_id: input.orderId?.trim() || null,
    description: input.description.trim(),
    image_url: imageUrl,
    status: 'open',
    created_at: serverTimestamp(),
  }

  console.log('[ticketService] Writing to Firestore...')
  await setDoc(newDocRef, ticketData)
  console.log('[ticketService] Ticket created successfully:', newDocRef.id)

  return { ticketId, docId: newDocRef.id }
}
