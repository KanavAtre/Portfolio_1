import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ResumePage() {
  return (
    <>
      <Head>
        <title>Resume | Kanav Atre </title>
        <meta name="description" content="Download my resume or view my professional experience." />
      </Head>

      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Resume</h1>
          <p className="text-lg text-gray-600 mb-8">
            Download my resume to learn more about my professional experience, education, and skills.
          </p>

          {/* Download Button */}
          <a
            href="/Kanav_Atre_Resume.pdf"
            download
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-lg"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </a>

          <p className="mt-4 text-sm text-gray-500">
            Or view my experience on{' '}
            <a
              href="https://www.linkedin.com/in/kanav-atre-759693207/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700"
            >
              LinkedIn
            </a>
          </p>

          {/* Quick Overview */}
          <div className="mt-16 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Overview</h2>
            
            <div className="space-y-8">
              {/* Education */}
              <div className="p-6 rounded-xl bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Education
                </h3>
                <div>
                  <p className="font-semibold text-gray-900">Bachelor of Science in Data Science & Applied Statistics</p>
                  <p className="text-gray-600">Purdue University</p>
                  <p className="text-sm text-gray-500">2022 - 2026</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="p-6 rounded-xl bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Highlights
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Built and deployed production systems serving millions of users
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                   Experience in Software Engineer Intern & Data Science Intern
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Experience across systems, ML, and full-stack web development
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interested in working together?</h3>
            <p className="text-gray-600 mb-4">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            <a
              href="mailto:kanavatre04@gmail.com"
              className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
            >
              Get in touch
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </>
  )
}
