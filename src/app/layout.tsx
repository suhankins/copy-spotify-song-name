import { GithubLink } from './About/About';
import './globals.css';

export const metadata = {
    title: 'Copy Spotify song name',
    description: 'Tool to copy Spotify song name from link',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {children}
                <GithubLink />
            </body>
        </html>
    );
}
