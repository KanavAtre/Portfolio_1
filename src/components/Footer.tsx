import Link from 'next/link'

const socialLinks = [
  { href: 'https://github.com/KanavAtre', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/kanav-atre-759693207/', label: 'LinkedIn' },
  { href: 'https://devpost.com/KanavAtre', label: 'Devpost' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-auto">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Kanav Atre. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
