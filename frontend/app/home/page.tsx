'use client'
import { useEffect, useRef } from 'react'
import Navbar from '@/components/home-components/Navbar'
import Hero from '@/components/home-components/Hero'
import Features from '@/components/home-components/Features'
import Pricing from '@/components/home-components/Pricing'
import About from '@/components/home-components/About'
import CTA from '@/components/home-components/CTA'
import Footer from '@/components/home-components/Footer'

export default function Home() {
  
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const href = anchor.getAttribute('href')
        if (!href) return

        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el)
      }
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <main className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <Features />
        <About />
        <Pricing />
        <CTA />
        <Footer />
      </main>
    </>
  )
}