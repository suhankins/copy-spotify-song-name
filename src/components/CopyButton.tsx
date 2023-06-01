'use client';

import {
    ClipboardDocumentIcon,
    ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    return (
        <button
            type="button"
            className="copy-button"
            onClick={() => {
                navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }}
        >
            {copied ? (
                <ClipboardDocumentCheckIcon />
            ) : (
                <ClipboardDocumentIcon />
            )}
        </button>
    );
}
