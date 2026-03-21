import { useState, useEffect } from 'react'
import { X, ZoomIn, Loader2, Images, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { getGalleryImages } from '../utils/supabase'

const TAGS = ['All', 'DataThon', 'Workshop', 'Talk', 'Team', 'Event']

export default function Gallery() {
  const { isDark } = useTheme()
  const [activeTag, setActiveTag]   = useState('All')
  const [lightbox, setLightbox]     = useState(null)
  const [images, setImages]         = useState([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    getGalleryImages()
      .then(({ data }) => { if (data?.length) setImages(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeTag === 'All' ? images : images.filter(img => img.tag === activeTag)

  // Lightbox navigation
  const lightboxIndex = lightbox ? filtered.findIndex(i => i.id === lightbox.id) : -1
  const goPrev = () => lightboxIndex > 0 && setLightbox(filtered[lightboxIndex - 1])
  const goNext = () => lightboxIndex < filtered.length - 1 && setLightbox(filtered[lightboxIndex + 1])

  useEffect(() => {
    if (!lightbox) return
    const handler = (e) => {
      if (e.key === 'Escape')     setLightbox(null)
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, lightboxIndex, filtered])

  const sub = isDark ? 'text-gray-400' : 'text-slate-500'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-light-50'}`}>

      {/* Hero */}
      <section className={`relative pt-32 pb-20 overflow-hidden ${isDark ? 'bg-dark-800' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="orb w-80 h-80 bg-pink-600/20 top-0 right-10" />
        <div className="orb w-56 h-56 bg-cyan-600/15 bottom-0 left-10" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-mono uppercase tracking-widest text-primary-400 mb-4">Memories</p>
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Our <span className="glow-text">Gallery</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Snapshots of the moments that made Datum what it is — the late nights, the breakthroughs, and the celebrations.
          </p>
          {!loading && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Images size={16} className="text-primary-400" />
              <span className="text-primary-400 font-mono text-sm">{images.length} Photos</span>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Filter */}
        <div className="flex gap-3 flex-wrap justify-center mb-12">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTag === tag
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : isDark ? 'bg-dark-500/60 text-gray-300 hover:bg-dark-400/60 border border-white/5' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 size={32} className="animate-spin text-primary-400" />
            <p className={`text-sm ${sub}`}>Loading gallery…</p>
          </div>
        )}

        {/* Masonry grid */}
        {!loading && filtered.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filtered.map((img) => (
              <div
                key={img.id}
                className="break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden mb-4"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium line-clamp-2">{img.caption}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-xs">{img.tag}</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🖼️</div>
            <p className={sub}>No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>

          {/* Prev */}
          {lightboxIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={e => { e.stopPropagation(); goPrev() }}
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Next */}
          {lightboxIndex < filtered.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={e => { e.stopPropagation(); goNext() }}
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-5xl w-full rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="w-full max-h-[78vh] object-contain bg-black"
            />
            <div className="bg-dark-800 px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-white font-medium text-sm">{lightbox.caption}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400 text-xs border border-primary-500/30">
                  {lightbox.tag}
                </span>
              </div>
              <p className="text-gray-600 text-xs font-mono flex-shrink-0">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}