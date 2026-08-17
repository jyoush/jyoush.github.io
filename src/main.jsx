import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  defaultContent,
  cloneContent,
} from './content'
import './styles.css'

function useSiteContent() {
  const [content] = useState(() => cloneContent(defaultContent))
  return { content, isLoading: false }
}

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

function externalProps(href) {
  return href?.startsWith('http')
    ? { target: '_blank', rel: 'noreferrer' }
    : {}
}

function currentPathname() {
  return window.location.pathname.replace(/\/$/, '') || '/'
}

function shouldIgnoreNavigation(event) {
  return event.defaultPrevented
    || event.button !== 0
    || event.metaKey
    || event.ctrlKey
    || event.shiftKey
    || event.altKey
}

function SiteHeader({ active, profile }) {
  const wordmark = profile?.name || 'jyous'

  return (
    <header className="site-header">
      <a className="site-wordmark" href="/" aria-label="Back to home">
        <span className="site-wordmark__mark">↳</span>
        <span>{wordmark.toLowerCase()}</span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className={active === 'projects' ? 'is-active' : ''} href="/projects">
          projects
        </a>
        <a className={active === 'blog' ? 'is-active' : ''} href="/blog">
          thoughts
        </a>
        <a className={active === 'contact' ? 'is-active' : ''} href="/contact">
          contact
        </a>
      </nav>
    </header>
  )
}

function PublicFrame({ active, profile, children, className = '' }) {
  return (
    <div className="board-page">
      <div className="board-frame">
        <aside className="board-rail">
          <a className={`board-rail__home ${active === 'home' ? 'is-active' : ''}`} href="/" aria-label="Home">
            <span aria-hidden="true">⌂</span>
            <span className="board-rail__home-label">home</span>
          </a>
          <nav className="board-rail__nav" aria-label="Main navigation">
            <a className={active === 'projects' ? 'is-active' : ''} href="/projects" aria-label="Projects">1 - Projects</a>
            <a className={active === 'blog' ? 'is-active' : ''} href="/blog" aria-label="Thoughts">2 - Thoughts</a>
            <a className={active === 'done' ? 'is-active' : ''} href="/done" aria-label="Things I&apos;ve done">3 - Things I&apos;ve done</a>
          </nav>
        </aside>
        <main className={`board-content ${className}`}>{children}</main>
      </div>
    </div>
  )
}

function PageIntro({ kicker, title, children }) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
      {children ? <div className="page-intro__copy">{children}</div> : null}
    </div>
  )
}

function ArchiveHeader({ kicker, title, children }) {
  return (
    <div className="archive-header">
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
      {children ? <div className="archive-header__copy">{children}</div> : null}
    </div>
  )
}

function ImageFrame({ src, alt, caption, className = '' }) {
  if (!src) return null

  return (
    <figure className={`image-frame ${className}`}>
      <div className="image-frame__inner">
        <img src={src} alt={alt} />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

function SectionHeading({ index, label, href }) {
  return (
    <div className="section-heading">
      <span className="section-heading__index">{index}</span>
      <h2 id={`${label.toLowerCase()}-heading`}>{label}</h2>
      {href ? <a href={href}>see all <span aria-hidden="true">↗</span></a> : null}
    </div>
  )
}

function HomePage({ content }) {
  const { profile } = content

  return (
    <PublicFrame active="home" profile={profile} className="board-home">
      <a className="board-name" href="/" aria-label="Home">{profile.name}</a>
      <div className="board-bio">
        <p className="board-bio__intro">{profile.intro}</p>
        <div className="board-bio__note">
          {profile.about.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </div>
      <nav className="board-home-links" aria-label="Homepage shortcuts">
        <a href="https://github.com/jyoush" target="_blank" rel="noreferrer">github ↗</a>
        <a href="/projects">projects ↗</a>
        <a href="/blog">thoughts ↗</a>
        <a href="/done">things i&apos;ve done ↗</a>
      </nav>
      <GitHubContributionGraph />
      {profile.avatarUrl ? (
        <figure className="board-home-figure">
          <img className="board-home-image" src={profile.avatarUrl} alt="A photograph from a city walk" />
          <figcaption className="board-home-caption">“{profile.avatarCaption || 'Scott Monument, Edinburgh'}”</figcaption>
        </figure>
      ) : null}
    </PublicFrame>
  )
}

function ProjectCard({ project, index }) {
  const projectContent = (
    <>
      <div className="project-card__topline">
        <span>0{index + 1}</span>
        <span>{project.year}</span>
      </div>
      <div className="project-card__body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="tag-row">
        {(project.tags || []).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <ImageFrame src={project.image} alt="" caption="view from the project" className="project-card__image" />
    </>
  )

  return project.href ? (
    <a className="project-card" href={project.href} {...externalProps(project.href)}>
      {projectContent}
    </a>
  ) : (
    <article className="project-card">{projectContent}</article>
  )
}

function ProjectEntry({ project, index }) {
  const entry = (
    <div className="project-entry__row">
      <span className="project-entry__number">0{index + 1}</span>
      <span className="project-entry__year">{project.year}</span>
      <div className="project-entry__body">
        <div className="project-entry__heading">
          <h2>{project.title}</h2>
          {project.status ? <span className="project-entry__status">{project.status}</span> : null}
        </div>
        <p>{project.description}</p>
        <div className="tag-row">
          {(project.tags || []).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      {project.image ? (
        <img
          className="project-entry__image"
          src={project.image}
          alt=""
          onError={(event) => { event.currentTarget.style.display = 'none' }}
        />
      ) : (
        <span className="project-entry__arrow" aria-hidden="true">↗</span>
      )}
    </div>
  )

  return project.id ? (
    <a className="project-entry" href={`/projects/${project.id}`}>{entry}</a>
  ) : (
    <article className="project-entry">{entry}</article>
  )
}

function BoardProject({ project, index }) {
  const content = (
    <div className="board-project">
      <div className="board-project__media">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            onError={(event) => { event.currentTarget.style.display = 'none' }}
          />
        ) : <span className="board-project__blank" />}
        <span className="board-project__number">{index + 1}</span>
      </div>
      <div className="board-project__caption">
        <span>{project.title}</span>
      </div>
    </div>
  )

  return project.href ? (
    <a className="board-project-link" href={project.href} {...externalProps(project.href)}>{content}</a>
  ) : content
}

function PostRow({ post, index }) {
  return (
    <a className="post-row" href={`/blog/${post.id}`}>
      <div className="post-row__number">0{index + 1}</div>
      <div className="post-row__main">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
      </div>
      <div className="post-row__meta">
        <span>{formatDate(post.date)}</span>
        <span>{post.readTime}</span>
      </div>
      <span className="post-row__arrow" aria-hidden="true">↗</span>
    </a>
  )
}

function SiteFooter({ profile }) {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>made of words &amp; small things</span>
    </footer>
  )
}

function GitHubContributionGraph() {
  return (
    <a
      className="github-contributions"
      href="https://github.com/jyoush"
      target="_blank"
      rel="noreferrer"
      aria-label="Open jyous's GitHub profile"
    >
      <img
        src="https://ghchart.rshah.org/3f6f8f/jyoush"
        alt="GitHub contribution activity"
      />
    </a>
  )
}

function ProjectsPage({ content }) {
  return (
    <PublicFrame active="projects" profile={content.profile} className="board-archive">
      <h1>projects</h1>
      <div className="board-list">
        {content.projects.map((project, index) => (
          <ProjectEntry key={project.id || project.title} project={project} index={index} />
        ))}
      </div>
    </PublicFrame>
  )
}

function projectDetailSections(value) {
  return (value || '')
    .split(/^##\s+/m)
    .map((block, index) => {
      const lines = block.split('\n')
      const heading = index === 0 ? '' : (lines.shift() || '').trim()
      const body = lines.join('\n').trim()

      return {
        heading,
        paragraphs: body.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean),
      }
    })
    .filter((section) => section.heading || section.paragraphs.length)
}

function ProjectDetailBody({ value }) {
  return projectDetailSections(value).map((section, sectionIndex) => (
    <section className="board-reading__section" key={section.heading || sectionIndex}>
      {section.heading ? <h2>{section.heading}</h2> : null}
      {section.paragraphs.map((paragraph, paragraphIndex) => (
        <p key={`${sectionIndex}-${paragraphIndex}`}>{paragraph}</p>
      ))}
    </section>
  ))
}

function ProjectDetailLinks({ detail }) {
  const links = Array.isArray(detail.links) && detail.links.length
    ? detail.links
    : detail.href
      ? [{ label: detail.linkLabel || 'website', href: detail.href }]
      : []

  if (!links.length) return null

  return (
    <div className="project-detail__links">
      {links.map((link) => (
        <a className="project-detail__link project-detail__link--inline" href={link.href} {...externalProps(link.href)} key={link.href}>
          {link.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  )
}

function projectDetailImages(detail) {
  return [
    ...(detail.websiteImage
      ? [{ src: detail.websiteImage, alt: 'Project website homepage', caption: 'the website' }]
      : []),
    ...(Array.isArray(detail.gallery) ? detail.gallery : []),
  ]
}

function ProjectDetailGallery({ images }) {

  if (!images.length) return null

  return (
    <div className="project-detail__gallery">
      {images.map((image) => (
        <ImageFrame
          key={image.src}
          src={image.src}
          alt={image.alt}
          caption={image.caption}
          className="project-detail__gallery-image"
        />
      ))}
    </div>
  )
}

function ProjectDetailPage({ content, slug }) {
  const project = content.projects.find((item) => item.id === slug)
  const starterProject = defaultContent.projects.find((item) => item.id === slug)
  const detail = project && starterProject ? { ...starterProject, ...project } : project || starterProject

  if (!detail) {
    return (
      <PublicFrame active="projects" profile={content.profile} className="board-reading">
        <h1>not found</h1>
        <a className="board-back" href="/projects">← projects</a>
      </PublicFrame>
    )
  }

  const galleryImages = projectDetailImages(detail)
  const galleryBreak = Number.isInteger(detail.galleryTextBreakAfter)
    ? Math.max(0, Math.min(detail.galleryTextBreakAfter, galleryImages.length))
    : galleryImages.length

  return (
    <PublicFrame active="projects" profile={content.profile} className="board-reading board-project-detail">
      <a className="board-back" href="/projects">← projects</a>
      <p className="board-meta">{detail.year} · project</p>
      <h1>{detail.title}</h1>
      <p className="board-reading__excerpt">{detail.description}</p>
      <div className="tag-row project-detail__tags">
        {(detail.tags || []).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <ProjectDetailLinks detail={detail} />
      <ProjectDetailGallery images={galleryImages.slice(0, galleryBreak)} />
      <div className="board-reading__body">
        <ProjectDetailBody value={detail.details || detail.description} />
      </div>
      <ProjectDetailGallery images={galleryImages.slice(galleryBreak)} />
    </PublicFrame>
  )
}

function DoneEntry({ item, index }) {
  const entry = (
    <div className="done-entry__row">
      <span className="done-entry__number">0{index + 1}</span>
      <div className="done-entry__body">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>
      <span className="done-entry__year">{item.year}</span>
      {item.href ? <span className="done-entry__arrow" aria-hidden="true">↗</span> : null}
    </div>
  )

  return item.href ? (
    <a className="done-entry" href={item.href} {...externalProps(item.href)}>{entry}</a>
  ) : (
    <article className="done-entry">{entry}</article>
  )
}

function DonePage({ content }) {
  const items = Array.isArray(content.done) ? content.done : defaultContent.done

  return (
    <PublicFrame active="done" profile={content.profile} className="board-archive board-done">
      <h1>things i&apos;ve done</h1>
      <div className="board-list board-done-list">
        {items.map((item, index) => (
          <DoneEntry key={item.id || item.title} item={item} index={index} />
        ))}
      </div>
    </PublicFrame>
  )
}

function BlogPage({ content }) {
  return (
    <PublicFrame active="blog" profile={content.profile} className="board-archive">
      <h1>thoughts</h1>
      <div className="board-list board-writing-list">
        {content.posts.map((post, index) => (
          <PostRow key={post.id || post.title} post={post} index={index} />
        ))}
      </div>
    </PublicFrame>
  )
}

function PostPage({ content, slug }) {
  const post = content.posts.find((item) => item.id === slug)

  if (!post) {
    return (
      <PublicFrame active="blog" profile={content.profile} className="board-reading">
        <h1>not found</h1>
        <a className="board-back" href="/blog">←</a>
      </PublicFrame>
    )
  }

  return (
    <PublicFrame active="blog" profile={content.profile} className="board-reading">
      <a className="board-back" href="/blog">←</a>
      <p className="board-meta">{formatDate(post.date)} · {post.readTime}</p>
      <h1>{post.title}</h1>
      <p className="board-reading__excerpt">{post.excerpt}</p>
      <div className="board-reading__body">
        {post.body.split(/\n\s*\n/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </PublicFrame>
  )
}

function ContactPage({ content }) {
  const { profile, contact } = content

  return (
    <PublicFrame active="contact" profile={profile} className="board-contact">
      <h1>contact</h1>
      <a className="board-contact__email" href={`mailto:${contact.email}`}>{contact.email}</a>
      <p>{contact.note}</p>
      <p>{contact.prompt}</p>
      <div className="board-contact__links">
        {profile.links.map((link) => (
          <a key={link.label} href={link.href} {...externalProps(link.href)}>{link.label} ↗</a>
        ))}
      </div>
    </PublicFrame>
  )
}

function App() {
  const { content, isLoading } = useSiteContent()
  const [pathname, setPathname] = useState(currentPathname)

  useEffect(() => {
    const handlePopState = () => {
      setPathname(currentPathname())
      window.scrollTo(0, 0)
    }

    const handleDocumentClick = (event) => {
      if (shouldIgnoreNavigation(event)) return

      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return

      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin || url.protocol !== window.location.protocol) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      event.preventDefault()
      window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
      setPathname(currentPathname())
      window.scrollTo(0, 0)
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleDocumentClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  if (isLoading && pathname === '/') {
    return <div className="loading-screen">opening the notebook<span>…</span></div>
  }

  if (pathname === '/projects') return <ProjectsPage content={content} />
  if (pathname.startsWith('/projects/')) return <ProjectDetailPage content={content} slug={pathname.slice('/projects/'.length)} />
  if (pathname === '/done' || pathname === '/things-ive-done') return <DonePage content={content} />
  if (pathname === '/blog' || pathname === '/writing') return <BlogPage content={content} />
  if (pathname === '/contact') return <ContactPage content={content} />
  if (pathname.startsWith('/blog/')) return <PostPage content={content} slug={pathname.slice('/blog/'.length)} />
  return <HomePage content={content} />
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
