'use client';

import {
    ClipboardDocumentIcon,
    ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import styles from './CopyButton.module.css';

export function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    return (
        <button
            type="button"
            aria-label={`Copy ${text} to clipboard`}
            className={styles.copyButton}
            onClick={() => {
                navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }}
        >
            {copied ? (
                <>
                    <ClipboardDocumentCheckIcon />
                    <span className="sr-only" aria-live="polite">
                        Copied!
                    </span>
                </>
            ) : (
                <ClipboardDocumentIcon />
            )}
        </button>
    );
}
