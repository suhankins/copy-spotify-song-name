import styles from './About.module.css';

export function GithubLink() {
    return (
        <div className={styles.about}>
            <a href="https://github.com/suhankins/copy-spotify-song-name">
                Github
            </a>
            . This website is not affiliated with Spotify.
        </div>
    );
}
