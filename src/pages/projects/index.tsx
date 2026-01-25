import { useState } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'
import { getAllProjects, getAllTags, type ProjectMeta } from '@/lib/mdx'
import clsx from 'clsx'

interface ProjectsPageProps {
  projects: ProjectMeta[]
  tags: string[]
}

export default function ProjectsPage({ projects, tags }: ProjectsPageProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredProjects = selectedTag
    ? projects.filter((project) => project.tags.includes(selectedTag))
    : projects

  return (
    <>
      <Head>
        <title>Projects | Your Name</title>
        <meta name="description" content="Browse my portfolio of projects in systems, ML, and web development." />
      </Head>

      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Projects</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            A collection of projects I've worked on, ranging from systems programming to machine learning and web development.
          </p>

          {/* Tag Filters */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setSelectedTag(null)}
                className={clsx(
                  'px-4 py-2 text-sm font-medium rounded-full transition-colors',
                  selectedTag === null
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={clsx(
                    'px-4 py-2 text-sm font-medium rounded-full transition-colors',
                    selectedTag === tag
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">No projects found with the selected filter.</p>
              <button
                onClick={() => setSelectedTag(null)}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filter
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  const projects = getAllProjects()
  const tags = getAllTags()

  return {
    props: {
      projects,
      tags,
    },
  }
}
