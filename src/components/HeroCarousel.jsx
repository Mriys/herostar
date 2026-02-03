import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HeroCarousel({ slides = [], interval = 5000, glow = true, glowPower = 2 }){
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)
  const len = slides.length

  useEffect(() => {
    if (len <= 1) return
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % len)
    }, interval)
    return () => clearInterval(timerRef.current)
  }, [len, interval])

  const goTo = (i) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setIndex((i + len) % len)
  }

  if (len === 0) return null

  return (
    <section className="relative overflow-hidden">
      {glow && (
        <>
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[80%] rounded-full bg-brand/20 blur-3xl"
            style={{ opacity: Math.min(0.25 * glowPower, 0.6) }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-[60%] rounded-full bg-brand/15 blur-3xl"
            style={{ opacity: Math.min(0.2 * glowPower, 0.5) }}
          />
        </>
      )}
      <div className="container-max py-10 md:py-14">
        <div className="relative rounded-2xl border border-border bg-muted/30">
          <div className="relative w-full overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((s, i) => (
                <div key={i} className="w-full shrink-0">
                  <div className="grid md:grid-cols-2 gap-8 items-center p-6 md:p-10">
                    <div>
                      {s.badge && <span className="badge mb-4">{s.badge}</span>}
                      <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                        {s.titleBefore} <span className={s.highlightClass || 'text-brand'}>{s.titleHighlight}</span> {s.titleAfter}
                      </h2>
                      {s.offer && (
                        <div className="mt-3 inline-flex items-center rounded-full bg-brand text-black px-3 py-1 font-semibold shadow-soft">
                          {s.offer}
                        </div>
                      )}
                      {s.text && <p className="mt-4 text-gray-300">{s.text}</p>}
                      {s.cta && (
                        <div className="mt-6 flex gap-3">
                          {s.cta.primary && (
                            <Link to={s.cta.primary.href} className="btn btn-primary">{s.cta.primary.label}</Link>
                          )}
                          {s.cta.secondary && (
                            <Link to={s.cta.secondary.href} className="btn btn-outline">{s.cta.secondary.label}</Link>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-tr from-brand to-yellow-300 p-1">
                        <div className="relative h-full w-full rounded-2xl bg-background overflow-hidden">
                          {s.video ? (
                            <video
                              className="absolute inset-0 h-full w-full object-cover"
                              src={s.video}
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <img src={s.image} alt={s.alt || 'slide'} className="absolute inset-0 h-full w-full object-cover" />
                          )}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {len > 1 && (
              <>
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-outline h-10 px-3"
                  onClick={() => goTo(index - 1)}
                  aria-label="Önceki"
                >
                  ‹
                </button>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-outline h-10 px-3"
                  onClick={() => goTo(index + 1)}
                  aria-label="Sonraki"
                >
                  ›
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-2 w-2 rounded-full ${i === index ? 'bg-brand' : 'bg-border'}`}
                      aria-label={`Slide ${i+1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
