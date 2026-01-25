import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface CodeBlockProps {
  children: ReactNode
  className?: string
}

function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <pre className={`${className} overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm`}>
      <code className="text-gray-100">{children}</code>
    </pre>
  )
}

interface CustomImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

function CustomImage({ src, alt, width = 800, height = 400 }: CustomImageProps) {
  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full object-cover"
        />
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

interface CustomLinkProps {
  href: string
  children: ReactNode
}

function CustomLink({ href, children }: CustomLinkProps) {
  const isInternal = href.startsWith('/') || href.startsWith('#')

  if (isInternal) {
    return (
      <Link href={href} className="text-primary-600 hover:text-primary-700 underline">
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-600 hover:text-primary-700 underline"
    >
      {children}
    </a>
  )
}

interface CalloutProps {
  children: ReactNode
  type?: 'info' | 'warning' | 'success'
}

function Callout({ children, type = 'info' }: CalloutProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  }

  return (
    <div className={`my-6 rounded-lg border-l-4 p-4 ${styles[type]}`}>
      {children}
    </div>
  )
}

export const MDXComponents = {
  pre: CodeBlock,
  img: CustomImage,
  Image: CustomImage,
  a: CustomLink,
  Callout,
}
