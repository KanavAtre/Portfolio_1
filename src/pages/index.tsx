import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'
import { getFeaturedProjects, type ProjectMeta } from '@/lib/mdx'

interface HomeProps {
  featuredProjects: ProjectMeta[]
}

export default function Home({ featuredProjects }: HomeProps) {
  return (
    <>
      <Head>
        <title>Kanav Atre | Software Engineer</title>
        <meta
          name="description"
          content="Kanav Atre — Purdue Data Science & Applied Statistics. I build high-performance systems, data products, and ML-powered web apps."
        />
      </Head>

      {/* Hero Section */}
      <section className="container-custom py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600">
            <span className="h-2 w-2 rounded-full bg-primary-600" />
            Purdue • Data Science & Applied Statistics • Dec 2026
          </div>

          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Hi, I&apos;m <span className="text-primary-600">Kanav Atre</span>
          </h1>

          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            I build <span className="text-gray-900 font-medium">intelligent systems</span> — from{' '}
            <span className="text-gray-900 font-medium">autonomy + perception pipelines</span> to{' '}
            <span className="text-gray-900 font-medium">scalable product software</span>.
            <br className="hidden sm:block" />
            I care about reliability, explainability, and building things that actually change how people interact with technology.
          </p>


          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              View Projects
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 transition-colors"
            >
              About Me
            </Link>

            <Link
              href="/resume"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 transition-colors"
            >
              Resume
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {[
              'SQL • MongoDB',
              'TypeScript • Next.js',
              'Java • Python',
              'Computer Vision • ML',
              'Postgres • ClickHouse',
              'Docker • AWS',
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-gray-50 text-gray-700 rounded-full border border-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="container-custom py-16 border-t border-gray-100">
          <div className="flex items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
              <p className="mt-1 text-sm text-gray-600">
                Core algorithmic and web development stuff, and computer vision/Machin Learning Projects — with clean UX and measurable outcomes.
              </p>

            </div>

            <Link
              href="/projects"
              className="shrink-0 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Skills Highlight */}
      <section className="container-custom py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What I Work With</h2>
        <p className="text-sm text-gray-600 mb-8 max-w-2xl">
          I like building end-to-end: a sharp UI, a sane backend, and data plumbing that doesn&apos;t fall over at scale.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Systems & Algorithms',
              description: 'Performance-minded code, data structures, and graph/pathfinding work.',
              skills: ['Rust', 'C++', 'Go', 'Linux', 'Distributed Systems'],
            },
            {
              title: 'Data & ML',
              description: 'Analytics pipelines + practical ML for ranking, detection, and decision support.',
              skills: ['Python', 'Pandas', 'PyTorch', 'SQL', 'MLOps'],
            },
            {
              title: 'Product Engineering',
              description: 'Modern full-stack apps with clean UX and strong engineering discipline.',
              skills: ['TypeScript', 'React', 'Next.js', 'Postgres', 'Docker'],
            },
          ].map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gray-50"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs font-medium bg-white text-gray-700 rounded border border-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick CTA / Footer line */}
        <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Looking for Summer 2026</h3>
            <p className="text-sm text-gray-600">
              SWE / Infra / Data Engineering / Machine Learning
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Contact
          </Link>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const featuredProjects = getFeaturedProjects().slice(0, 3)

  return {
    props: {
      featuredProjects,
    },
  }
}
