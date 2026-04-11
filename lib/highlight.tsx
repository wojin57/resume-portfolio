import type { ReactNode } from "react";

/**
 * Wraps occurrences of `keywords` inside `text` with bold blue <strong>.
 * Matching is case-insensitive. Longer keywords are matched first to prevent
 * partial matches (e.g. "Redis" before "Red").
 * Returns a ReactNode array safe to render directly in JSX.
 */
export function highlightKeywords(
    text: string,
    keywords: string[],
): ReactNode {
    if (!keywords.length) return text;

    const escaped = keywords
        .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .sort((a, b) => b.length - a.length);

    const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text.split(pattern);

    return parts.map((part, i) =>
        keywords.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
            <strong key={i} className="font-semibold text-blue-600">
                {part}
            </strong>
        ) : (
            part
        ),
    );
}
