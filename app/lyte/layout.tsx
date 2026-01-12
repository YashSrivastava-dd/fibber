import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LYTE - Engineered for Human Potential | Premium Health Monitoring',
  description: 'LYTE. Engineered for Human Potential. Precision in every moment. Data that moves you. The most advanced health monitoring device for elite performance.',
}

export default function LyteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
