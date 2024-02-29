/* eslint-disable @next/next/no-img-element */
import { CopyButton } from './CopyButton/CopyButton';
import styles from './SongCard.module.css';

export function SongCard({
    imgSrc = './nocover.png',
    title = 'No title',
    artist = 'No artist',
}: {
    imgSrc?: string;
    title?: string;
    artist?: string;
}) {
    return (
        <article className={styles.card} role="region" aria-live="polite">
            <img className={styles.image} src={imgSrc} alt="Song cover" />
            <div className={styles.info}>
                <h1 className={styles.title}>
                    <span>{title}</span>
                    <CopyButton text={title} />
                </h1>
                <h2 className={styles.artist}>
                    <span>{artist}</span>
                    <CopyButton text={artist} />
                </h2>
            </div>
        </article>
    );
}
