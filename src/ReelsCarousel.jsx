import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const ReelsCarousel = () => {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(null)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50) paginate(1)
    else if (diff < -50) paginate(-1)
    touchStartX.current = null
  }

  const reels = [
    {
      id: 1,
      iframeUrl: 'https://www.instagram.com/reel/DQNYl6GDI_m/embed/',
    },
    {
      id: 2,
      iframeUrl: 'https://www.instagram.com/reel/DVMvVf9DHNj/embed/',
    },
    {
      id: 3,
      iframeUrl: 'https://www.instagram.com/reel/DKSotwLsx0u/embed/',
    },
    {
      id: 4,
      iframeUrl: 'https://www.instagram.com/reel/DGVv30sMbEB/embed/',
    },
  ]

  const paginate = (dir) => {
    setCurrent((c) => (c + dir + reels.length) % reels.length)
  }

  return (
    <section className="section reels-carousel">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>
            Recetas del <span className="gradient-text">Volga</span> en Reels
          </h2>
          <p>Los mejores momentos de nuestro programa en Instagram</p>
        </motion.div>

        <div
          className="carousel-stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {reels.map((reel, i) => {
            const offset =
              (((i - current) % reels.length) + reels.length) % reels.length
            const isCurrent = offset === 0
            const isNext = offset === 1
            const isPrev = offset === reels.length - 1
            const isVisible = isCurrent || isNext || isPrev

            return (
              <div
                key={reel.id}
                className={`reel-slot${isCurrent ? ' reel-center' : ' reel-side'}`}
                style={{
                  display: !isVisible ? 'none' : undefined,
                  order: isPrev ? 0 : isCurrent ? 1 : 2,
                  cursor: !isCurrent ? 'pointer' : 'default',
                }}
                onClick={
                  !isCurrent ? () => paginate(isNext ? 1 : -1) : undefined
                }
              >
                <iframe
                  src={reel.iframeUrl}
                  className="carousel-iframe"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen={true}
                />
                {!isCurrent && <div className="reel-overlay" />}
              </div>
            )
          })}
        </div>

        <div className="carousel-controls">
          <motion.button
            className="carousel-button"
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={26} style={{ transform: 'rotate(180deg)' }} />
          </motion.button>

          <div className="carousel-dots">
            {reels.map((_, i) => (
              <motion.button
                key={i}
                className={`dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          <motion.button
            className="carousel-button"
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={26} />
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default ReelsCarousel
