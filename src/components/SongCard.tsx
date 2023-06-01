import { CopyButton } from './CopyButton';

export function SongCard({
    imgSrc = 'https://via.placeholder.com/300x300?text=No+cover',
    title = 'No title',
    artist = 'No artist',
}: {
    imgSrc?: string;
    title?: string;
    artist?: string;
}) {
    return (
        <div className="song-card">
            <img className="song-card__image" src={imgSrc} alt="Song cover" />
            <div className="song-card__info">
                <h2 className="song-card__title">
                    <span>{title}</span>
                    <CopyButton text={title} />
                </h2>
                <h3 className="song-card__artist">
                    <span>{artist}</span>
                    <CopyButton text={artist} />
                </h3>
            </div>
        </div>
    );
}
