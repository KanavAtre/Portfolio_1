import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, AnchorHTMLAttributes, ImgHTMLAttributes, HTMLAttributes } from 'react'
import type { MDXComponents as MDXComponentsType } from 'mdx/types'

function CodeBlock({ children, className, ...props }: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre className={`${className || ''} overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm`} {...props}>
      <code className="text-gray-100">{children}</code>
    </pre>
  )
}

function CustomImage({ src, alt, width, height, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null
  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt || ''}
          width={Number(width) || 800}
          height={Number(height) || 400}
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

function CustomLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return <span {...props}>{children}</span>
  
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
      {...props}
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

export const MDXComponents: MDXComponentsType = {
  pre: CodeBlock,
  img: CustomImage,
  a: CustomLink,
  Callout,
}
