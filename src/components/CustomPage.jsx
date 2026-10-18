import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Calendar, FileText } from 'lucide-react'
import TenderLogo from './TenderLogo'

// Import all page JSON files from the pages directory
const pageModules = import.meta.glob('../data/pages/*.json', { eager: true })

function getPageBySlug(slug) {
  for (const path in pageModules) {
    const mod = pageModules[path]
    const data = mod.default || mod
    if (data.slug === slug && data.published !== false) {
      return data
    }
  }
  return null
}

function getAllPages() {
  const pages = []
  for (const path in pageModules) {
    const mod = pageModules[path]
    const data = mod.default || mod
    if (data.published !== false) {
      pages.push(data)
    }
  }
  return pages.sort((a, b) => (a.order || 99) - (b.order || 99))
}

export { getAllPages }

export default function CustomPage() {
  const { slug } = useParams()
  const [page, setPage] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const found = getPageBySlug(slug)
    if (found) {
      setPage(found)
      setNotFound(false)
    } else {
      setPage(null)
      setNotFound(true)
    }
    window.scrollTo(0, 0)
  }, [slug])

  if (notFound) {
    return (
      <section className="custom-page">
        <div className="custom-page__hero custom-page__hero--404">
          <div className="container">
            <FileText size={64} strokeWidth={1} style={{ opacity: 0.4, marginBottom: '1rem' }} />
            <h1>Page Not Found</h1>
            <p>The page you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="custom-page__back-btn">
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    )
  }

  if (!page) {
    return (
      <section className="custom-page">
        <div className="custom-page__loading">
          <div className="preloader__spinner"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="custom-page">
      {/* Hero Banner */}
      <div
        className={`custom-page__hero ${page.slug === 'tenders' ? 'custom-page__hero--tender' : ''}`}
        style={page.heroImage ? { backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.7)), url(${page.heroImage})` } : {}}
      >
        <div className="container">
          <Link to="/" className="custom-page__back-link">
            <ArrowLeft size={16} />
            Home
          </Link>
          <div className="custom-page__title-wrap">
            {page.slug === 'tenders' && (
              <div className="custom-page__tender-emblem">
                <TenderLogo size={52} glow />
              </div>
            )}
            <div>
              {page.slug === 'tenders' && (
                <div className="custom-page__tender-tag">Official Procurement &amp; E-Tenders</div>
              )}
              <h1>{page.title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="custom-page__content">
        <div className="container">
          <article className="custom-page__article">
            {/* Auto-detect: if body starts with HTML tags, render as HTML (from GrapeJS builder);
                otherwise render as markdown (from the text editor) */}
            {page.body && (page.body.trim().startsWith('<') || page.body.trim().startsWith('<style>')) ? (
              <div
                className="custom-page__builder-content"
                dangerouslySetInnerHTML={{ __html: page.body }}
              />
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => <h1 className="custom-page__h1">{children}</h1>,
                  h2: ({children}) => <h2 className="custom-page__h2">{children}</h2>,
                  h3: ({children}) => <h3 className="custom-page__h3">{children}</h3>,
                  p: ({children}) => <p className="custom-page__p">{children}</p>,
                  ul: ({children}) => <ul className="custom-page__list">{children}</ul>,
                  ol: ({children}) => <ol className="custom-page__list custom-page__list--ordered">{children}</ol>,
                  blockquote: ({children}) => <blockquote className="custom-page__blockquote">{children}</blockquote>,
                  table: ({children}) => (
                    <div className="custom-page__table-wrap">
                      <table className="custom-page__table">{children}</table>
                    </div>
                  ),
                  a: ({href, children}) => {
                    const isExternal = href && (href.startsWith('http') || href.startsWith('//'))
                    return (
                      <a
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="custom-page__link"
                      >
                        {children}
                      </a>
                    )
                  },
                  img: ({src, alt}) => (
                    <figure className="custom-page__figure">
                      <img src={src} alt={alt || ''} className="custom-page__img" loading="lazy" />
                      {alt && <figcaption>{alt}</figcaption>}
                    </figure>
                  )
                }}
              >
                {page.body}
              </ReactMarkdown>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}
