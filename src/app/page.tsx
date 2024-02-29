'use client';

import { SongCard } from '@/app/SongCard/SongCard';
import {
    MagnifyingGlassIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { useCallback, useEffect, useId, useState } from 'react';
import { validateUrl } from './validateUrl';

interface Song {
    title: string;
    author: string;
    cover: string;
}

export default function App() {
    const searchInputId = useId();
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [song, setSong] = useState<Song | null>(null);

    const fetchSong = useCallback(
        async (event: React.FormEvent<HTMLFormElement> | string) => {
            if (typeof event !== 'string') {
                event.preventDefault();
            }
            const songUrl = typeof event === 'string' ? event : url;
            if (!songUrl || !validateUrl(songUrl)) {
                setError('Please enter a valid Spotify song URL');
                return;
            }
            setLoading(true);
            const result = await fetch(`./getSong?url=${songUrl}`).catch(() => {
                setLoading(false);
                setError('Network error');
            });
            if (!result) return;
            if (!result.ok) {
                setError(
                    `Error: ${result.status} ${
                        result.statusText
                    } - ${await result.text()}`
                );
                setLoading(false);
                return;
            }
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set('url', songUrl);
            window.history.pushState(null, '', `?${searchParams.toString()}`);
            const { title, author, cover } = await result.json();
            setSong({ title, author, cover });
            setLoading(false);
        },
        [url]
    );

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('url')) {
            const url = searchParams.get('url') as string;
            setUrl(url);
            fetchSong(url);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main>
            <form onSubmit={fetchSong} role="search">
                <label className="url-input-label" htmlFor={searchInputId}>
                    Put a Spotify song URL here
                </label>
                <div className="input-group">
                    <input
                        role="searchbox"
                        onInput={(e) => {
                            setUrl(e.currentTarget.value);
                            setError(null);
                        }}
                        value={url}
                        type="text"
                        autoComplete="off"
                        placeholder="https://open.spotify.com/track/..."
                        id={searchInputId}
                        className="url-input"
                        disabled={loading}
                        name="search"
                        required
                    />
                    <button
                        type="submit"
                        className="search-button"
                        aria-label="Search"
                        aria-busy={loading}
                        disabled={loading}
                    >
                        {loading ? <ArrowPathIcon /> : <MagnifyingGlassIcon />}
                    </button>
                </div>
                <label
                    className="url-input-label"
                    aria-live="polite"
                    aria-hidden={!error}
                >
                    {error}
                </label>
            </form>
            <SongCard
                imgSrc={song?.cover}
                title={song?.title}
                artist={song?.author}
            />
        </main>
    );
}
