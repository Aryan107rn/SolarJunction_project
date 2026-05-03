import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={dot}
        className="fixed top-0 left-0 z-[9999] w-3 h-3 rounded-full bg-[#c5f135] pointer-events-none mix-blend-difference" />
      <div ref={ring}
        className="fixed top-0 left-0 z-[9998] w-9 h-9 rounded-full border border-[#c5f135] pointer-events-none opacity-50" />
    </>
  )
}