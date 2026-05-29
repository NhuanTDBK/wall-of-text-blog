import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import vibeAppData from '@/data/vibeAppData'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const currentDate = new Date().toISOString().split('T')[0]

  // Blog posts with priority and changefreq
  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  // Main static routes with priority
  const mainRoutes = [
    { route: '', priority: 1.0, changeFrequency: 'daily' as const },
    { route: 'blog', priority: 0.8, changeFrequency: 'daily' as const },
    { route: 'projects', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: 'about', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: 'experience', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: 'portfolio', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: 'tags', priority: 0.7, changeFrequency: 'weekly' as const },
    { route: 'vibe-app', priority: 0.7, changeFrequency: 'weekly' as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${siteUrl}/${route}`,
    lastModified: currentDate,
    changeFrequency,
    priority,
  }))

  // Individual tag pages
  const tagRoutes = Object.keys(tagData).map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  // Individual vibe-app pages
  const vibeAppRoutes = vibeAppData
    .filter((app) => app.href)
    .map((app) => ({
      url: `${siteUrl}${app.href}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

  // Portfolio sub-pages (add more if you have dynamic routes)
  const portfolioRoutes = [
    {
      url: `${siteUrl}/portfolio/semantic-search`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  return [...mainRoutes, ...blogRoutes, ...tagRoutes, ...vibeAppRoutes, ...portfolioRoutes]
}
