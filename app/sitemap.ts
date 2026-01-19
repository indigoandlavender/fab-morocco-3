import { MetadataRoute } from 'next'
import { getSheetData } from '@/lib/sheets'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fabmorocco.com'

// Static pages with their priorities
const STATIC_PAGES = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/tours', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/journeys', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/stories', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/places', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/plan-your-trip', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/manifesto', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/whats-included', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/visa-info', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/day-trips', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/guides', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/epic', priority: 0.8, changeFrequency: 'weekly' as const },
]

// Helper to check published status consistently
const isPublished = (value: any): boolean => {
  if (value === true || value === 1) return true;
  const str = String(value || "").toUpperCase().trim();
  return str === "TRUE" || str === "YES" || str === "1";
};

async function getDynamicPages() {
  const dynamicPages: MetadataRoute.Sitemap = []

  try {
    // Fetch tours
    const tours = await getSheetData('Tours')
    tours.forEach((tour: any) => {
      if (tour.slug && isPublished(tour.published)) {
        dynamicPages.push({
          url: `${BASE_URL}/tours/${tour.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
        })
      }
    })
  } catch (e) {
    console.error('Failed to fetch tours for sitemap:', e)
  }

  try {
    // Fetch journeys
    const journeys = await getSheetData('Journeys')
    journeys.forEach((journey: any) => {
      if (journey.Slug && isPublished(journey.Published)) {
        dynamicPages.push({
          url: `${BASE_URL}/journeys/${journey.Slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      }
    })
  } catch (e) {
    console.error('Failed to fetch journeys for sitemap:', e)
  }

  try {
    // Fetch stories
    const stories = await getSheetData('Stories')
    stories.forEach((story: any) => {
      if (story.Slug && isPublished(story.Published)) {
        dynamicPages.push({
          url: `${BASE_URL}/story/${story.Slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    })
  } catch (e) {
    console.error('Failed to fetch stories for sitemap:', e)
  }

  try {
    // Fetch places
    const places = await getSheetData('Places')
    places.forEach((place: any) => {
      if (place.Slug && isPublished(place.Published)) {
        dynamicPages.push({
          url: `${BASE_URL}/places/${place.Slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    })
  } catch (e) {
    console.error('Failed to fetch places for sitemap:', e)
  }

  return dynamicPages
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Dynamic pages from Google Sheets
  const dynamicPages = await getDynamicPages()

  return [...staticPages, ...dynamicPages]
}
