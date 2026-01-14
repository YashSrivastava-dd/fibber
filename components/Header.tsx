'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Menu, X, User } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { openCart, getItemCount } = useCartStore()
  const itemCount = getItemCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'SHOP', href: '/collections/all', hasDropdown: true },
    { name: 'SCIENCE', href: '/science' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'LYTE', href: '/lyte' },
  ]

  return (
    <>
      {/* Announcement Bar Marquee */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black py-2 overflow-hidden">
        <div className="flex animate-marquee-text whitespace-nowrap">
          {[...Array(20)].map((_, i) => ( 
            <span 
              key={i} 
              className="text-xs md:text-sm text-white mx-8 tracking-wider flex-shrink-0"
            >
              Free shipping on US orders over $100
            </span>
          ))}
        </div>
      </div>

      {/* Transparent Frosty Navbar */}
      <header
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-500 pt-4 ${
          isScrolled
            ? 'bg-white/60 backdrop-blur-xl border-b border-white/20 shadow-lg'
            : 'bg-white/40 backdrop-blur-lg border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 transition-colors z-10 ${
                isScrolled ? 'text-black' : 'text-black'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo - Left side */}
            <Link href="/" className="flex-shrink-0 relative h-6 w-24 md:h-7 md:w-28 lg:h-8 lg:w-32">
              <Image
                src="/fiberisefit dark logo.png"
                alt="Fiberise Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>

            {/* Desktop Navigation - Center (hidden on mobile) */}
            <NavigationMenu className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-10">
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <Link href="/collections/all" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'text-xs font-semibold uppercase tracking-wider bg-transparent hover:bg-transparent hover:opacity-70 h-auto px-3 py-2',
                        isScrolled ? 'text-black' : 'text-black'
                      )}
                    >
                      SHOP
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/science" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'text-xs font-semibold uppercase tracking-wider bg-transparent hover:bg-transparent hover:opacity-70 h-auto px-3 py-2',
                        isScrolled ? 'text-black' : 'text-black'
                      )}
                    >
                      SCIENCE
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'text-xs font-semibold uppercase tracking-wider bg-transparent hover:bg-transparent hover:opacity-70 h-auto px-3 py-2',
                        isScrolled ? 'text-black' : 'text-black'
                      )}
                    >
                      CONTACT
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/lyte" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'text-xs font-semibold uppercase tracking-wider bg-transparent hover:bg-transparent hover:opacity-70 h-auto px-3 py-2',
                        isScrolled ? 'text-black' : 'text-black'
                      )}
                    >
                      LYTE
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* User Profile */}
              <button
                className={`hidden lg:block p-2 transition-colors ${
                  isScrolled ? 'text-black' : 'text-black'
                } hover:opacity-70`}
                aria-label="User account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className={`relative p-2 transition-colors ${
                  isScrolled ? 'text-black' : 'text-black'
                } hover:opacity-70`}
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm font-semibold uppercase tracking-wide py-2 text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

