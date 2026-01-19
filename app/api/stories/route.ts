import { NextResponse } from 'next/server';
import { getSlowMoroccoData, convertDriveUrl } from '@/lib/sheets';

export const revalidate = 60;

export async function GET() {
  try {
    const stories = await getSlowMoroccoData('stories');

    // Filter published stories and add mood category
    const publishedStories = stories
      .filter((story: any) => {
        const pub = String(story.published || '').toLowerCase().trim();
        return pub === 'true' || pub === 'yes' || pub === '1';
      })
      .map((story: any) => ({
        slug: story.slug || '',
        title: story.title || '',
        subtitle: story.subtitle || '',
        mood: story.mood || '', // fierce, tender, sacred, golden
        heroImage: convertDriveUrl(story.heroImage || ''),
        excerpt: story.excerpt || '',
        destination: story.destination || '',
        tags: story.tags || '',
        featured: story.featured === true || story.featured === 'TRUE',
        body: story.body ? story.body.replace(/<br>/g, '\n') : '',
        order: parseInt(story.order) || 999,
      }))
      .sort((a: any, b: any) => a.order - b.order);

    return NextResponse.json({ success: true, stories: publishedStories });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ success: false, stories: [], error: 'Failed to fetch stories' }, { status: 500 });
  }
}
