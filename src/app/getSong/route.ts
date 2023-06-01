import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const url = params.get('url');

    if (!url || !url.startsWith('https://open.spotify.com/track/')) {
        return new Response('No url provided', { status: 400 });
    }

    const result = await fetch(url).catch(
        () => new Response('Request failed, try again later', { status: 500 })
    );

    if (!result.ok) {
        return new Response('Request failed, try again later', { status: 500 });
    }
    
    const text = await result.text();

    const title = text.match(/(?<=:title" content=")(.*?)(?=")/gm)?.[0];
    const author = text.match(
        /(?<=:description" content=")(.*?)(?= · )/gm
    )?.[0];
    const cover = text.match(/(?<=:image" content=")(.*?)(?=")/gm)?.[0];

    if (!title || !author || !cover) {
        return new Response('Invalid URL', { status: 400 });
    }

    return new Response(JSON.stringify({ title, author, cover }));
}
