import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'

const skills = {
  Languages: ['Python', 'Java', 'SQL', 'C++', 'JavaScript', 'TypeScript'],
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML', 'CSS'],
  Backend: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'ClickHouse', 'NeonDB'],
  Data: ['Pandas', 'scikit-learn', 'PyTorch', 'TensorFlow', 'OpenCV', 'Keras', 'Hugging Face'],
  Infra: ['Docker', 'AWS', 'GitHub Actions', 'Linux'],
  Tools: ['Git', 'Vim', 'VS Code'],
} as const

const experience = [
  {
    role: 'Software Engineer Intern',
    company: 'ketteQ',
    period: 'Jun 2025 — Aug 2025',
    description:
      'Built real-time KPI pipelines across Neon, ClickHouse, and PostgreSQL; delivered interactive dashboards (bias charts, treemaps, stacked bars) used by analysts and leadership.',
    highlights: [
      'Real-time analytics pipeline (Neon → ClickHouse/Postgres)',
      'Executive-facing KPI dashboards + demos for prospective customers',
      'Data migration + archival infrastructure to keep analytics fast',
    ],
  },
  {
    role: 'Undergraduate Researcher',
    company: 'Purdue University',
    period: 'Aug 2023 — Jun 2024',
    description:
      'Pedestrian detection and behavior analysis project using large-scale image datasets to study changes in pedestrian patterns before and after the COVID-19 pandemic.',
    highlights: [
      'Mentored by Prof. Carla Zoltswoski and Prof. Edward J. Delp',
      'Analyzed a dataset of 50,000+ images to study pre- and post-COVID pedestrian behavior',
      'Built models using KNNs, linear classifiers, and neural networks for feature extraction and accuracy improvement',
    ],
  },
  {
    role: 'Data Science Intern',
    company: 'Renzoe Box',
    location: 'West Lafayette, IN',
    period: 'Aug 2022 — Jan 2023',
    description:
      'Worked on computer vision and data pipelines for RenzoeMatch, improving color classification accuracy and powering product recommendation systems.',
    highlights: [
      'Improved the RenzoeMatch model by combining 3-point color matching with LAB-space feature extraction and brightness normalization for more reliable tone classification',
      'Engineered web-scraping pipelines using BeautifulSoup to collect structured product data from dynamic websites',
      'Built automated data ingestion workflows that directly powered RenzoeMatch’s recommendation engine',
    ],
  }
  ,
] as const

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | Kanav Atre</title>
        <meta
          name="description"
          content="Learn more about Kanav Atre — Purdue Data Science & Applied Statistics student building full-stack and data-intensive systems."
        />
      </Head>

      <div className="container-custom py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About</h1>

              <div className="prose prose-lg text-gray-600">
                <p>
                  I’m <strong>Kanav Atre</strong>, a <strong>Purdue</strong> senior in <strong>Data Science &amp; Applied Statistics</strong>. I like to work across the stack, but have a strong inlcination in <strong>Machine Learning, Computer Vision and databases </strong>.
                </p>

                <p>
                  In my most recent internship, I built a <strong>real-time KPI pipeline</strong> with <strong>Neon</strong>, <strong>ClickHouse</strong>, and <strong>Postgres</strong>. I was also responsible for deploying and maintaining a <strong>data migration and archival infrastructure</strong> for fast, accurate and most up-to-date analytics. I also worked a bit on the frontend integration of supply-chain specific charts and built <strong>executive-facing dashboards and demos</strong> for prospective customers.
                </p>

                <p>
                  I also have a strong undergraduate research project in <strong>pedestrian detection and behavior analysis</strong> using large-scale image datasets to study changes in pedestrian patterns before and after the COVID-19 pandemic.
                </p>

              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                  Purdue • Data Science & Applied Statistics
                </span>
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                  Graduation: Dec 2026
                </span>
                <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                  Interested in: data-intensive systems, full-stack, ML tooling
                </span>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 shadow-sm">
                {/* If you have a real headshot, drop it at /public/images/kanav.jpg and uncomment below */}
                <Image src="/images/kanav.jpg" alt="Kanav Atre" fill className="object-cover" priority />
              </div>
            </div>
          </div>

          {/* Skills */}
          <section className="mb-16">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Skills & Technologies</h2>
              <p className="text-sm text-gray-500">A snapshot of what I reach for most often.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, items], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="p-6 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm bg-white text-gray-700 rounded-full border border-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Experience</h2>

            <div className="space-y-10">
              {experience.map((job, index) => (
                <motion.div
                  key={`${job.company}-${job.role}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="relative pl-8 border-l-2 border-gray-200"
                >
                  <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-primary-600" />

                  <div className="pb-2">
                    <p className="text-sm text-gray-500 mb-1">{job.period}</p>
                    <h3 className="text-lg font-semibold text-gray-900">{job.role}</h3>
                    <p className="text-primary-700 mb-3">{job.company}</p>

                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {job.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </>
  )
}
