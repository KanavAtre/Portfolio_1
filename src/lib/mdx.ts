import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export interface ProjectMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  image: string | null
  github: string | null
  demo: string | null
  featured: boolean
}

export interface Project extends ProjectMeta {
  content: string
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }
  return fs.readdirSync(projectsDirectory).filter((file) => file.endsWith('.mdx'))
}

export function getProjectBySlug(slug: string): Project {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(projectsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    tags: data.tags || [],
    image: data.image || null,
    github: data.github || null,
    demo: data.demo || null,
    featured: data.featured || false,
    content,
  }
}

export function getAllProjects(): ProjectMeta[] {
  const slugs = getProjectSlugs()
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))

  return projects.map(({ content, ...meta }) => meta)
}

export function getFeaturedProjects(): ProjectMeta[] {
  return getAllProjects().filter((project) => project.featured)
}

export function getAllTags(): string[] {
  const projects = getAllProjects()
  const tags = new Set<string>()
  projects.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}
