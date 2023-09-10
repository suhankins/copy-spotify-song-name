'use client';

import { SongCard } from '@/app/SongCard/SongCard';
import {
    MagnifyingGlassIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { useId, useState } from 'react';
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!url || !validateUrl(url)) {
            setError('Please enter a valid Spotify song URL');
            return;
        }
        setLoading(true);
        const result = await fetch(`/getSong?url=${url}`).catch(() => {
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
        const { title, author, cover } = await result.json();
        setSong({ title, author, cover });
        setLoading(false);
    };

    return (
        <main>
            <form onSubmit={handleSubmit} role="search">
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
