'use client';

import { SongCard } from '@/components/SongCard';
import {
    MagnifyingGlassIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { useId, useState } from 'react';

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
        if (!url || !url.startsWith('https://open.spotify.com/track/')) {
            setError('Please enter a valid Spotify song URL');
            return;
        }
        setLoading(true);
        const result = await fetch(`/getSong?url=${url}`);
        setLoading(false);
        if (!result.ok) {
            setError('Error');
            return;
        }
        const { title, author, cover } = await result.json();
        setSong({ title, author, cover });
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label className="url-input-label" htmlFor={searchInputId}>
                    Put a Spotify song URL here
                </label>
                <div className="input-group">
                    <input
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
                <label className="url-input-label">{error}</label>
            </form>
            <SongCard
                imgSrc={song?.cover}
                title={song?.title}
                artist={song?.author}
            />
        </main>
    );
}
