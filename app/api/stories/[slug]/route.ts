import { NextResponse } from 'next/server';
import { getSlowMoroccoData, convertDriveUrl } from '@/lib/sheets';

export const revalidate = 60;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const stories = await getSlowMoroccoData('stories');

    const story = stories.find((s: any) => s.slug === slug);

    if (!story) {
      return NextResponse.json({ success: false, error: 'Story not found' }, { status: 404 });
    }

    // Get story images
    const storyImages = await getSlowMoroccoData('story_images');
    const images = storyImages
      .filter((img: any) => img.story_slug === slug && img.image_url)
      .map((img: any) => ({
        ...img,
        image_url: convertDriveUrl(img.image_url || ''),
      }))
      .sort((a: any, b: any) => (parseInt(a.image_order) || 0) - (parseInt(b.image_order) || 0));

    return NextResponse.json({
      success: true,
      story: {
        slug: story.slug || '',
        title: story.title || '',
        subtitle: story.subtitle || '',
        mood: story.mood || '',
        heroImage: convertDriveUrl(story.heroImage || ''),
        heroCaption: story.heroCaption || '',
        excerpt: story.excerpt || '',
        body: story.body ? story.body.replace(/<br>/g, '\n') : '',
        destination: story.destination || '',
        tags: story.tags || '',
        relatedTour: story.relatedTour || '',
        relatedTourSlug: story.relatedTourSlug || '',
      },
      images,
    });
  } catch (error) {
    console.error('Error fetching story:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch story' }, { status: 500 });
  }
}
