import { error } from '@sveltejs/kit';
import { JSDOM } from 'jsdom';

export async function POST({ request }) {
  const { url } = await request.json();

  if (!url) {
    throw error(400, 'URL is required');
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const content = dom.window.document.body.textContent || "";

    return new Response(JSON.stringify({ content }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Scraping error:', err);
    throw error(500, 'Failed to scrape the webpage');
  }
}