import { htmlToText } from 'html-to-text';

export function parseInstructions(rawHtml) {
    const text = htmlToText(rawHtml, {
        wordwrap: false,
        selectors: [
            { selector: 'body', format: 'block' },
            { selector: 'div', format: 'block' },
            { selector: 'p', format: 'block' },
            { selector: 'li', format: 'block' },
            { selector: 'br', format: 'lineBreak' },
            { selector: 'ul', format: 'block' },
            { selector: 'ol', format: 'block' },
            { selector: 'span', format: 'inline' },
            { selector: 'strong', format: 'inline' },
            { selector: 'b', format: 'inline' },
            { selector: 'i', format: 'inline' },
            { selector: 'em', format: 'inline' },
            { selector: 'h1', format: 'block' },
            { selector: 'h2', format: 'block' },
            { selector: 'h3', format: 'block' },
            { selector: 'h4', format: 'block' }
        ],
        preserveNewlines: true
    });

    const steps = text
        .split(/[\.\n]+/)
        .map(step => step.trim())
        .filter(step => step.length > 0);

    return steps;
}
