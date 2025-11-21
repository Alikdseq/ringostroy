export type SplitOptions = {
  preserveSingleBreaks?: boolean;
};

const PLACEHOLDER_PARAGRAPH = 'Описание недоступно.';

export function splitTextToParagraphs(text?: string, options?: SplitOptions): string[] {
  if (!text) {
    return [];
  }

  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

  if (!normalized) {
    return [];
  }

  const segments = options?.preserveSingleBreaks
    ? normalized.split('\n')
    : normalized.split(/\n{2,}/);

  return segments.map(segment => segment.trim()).filter(Boolean);
}

export function extractFirstParagraph(text?: string): string {
  const [first] = splitTextToParagraphs(text);
  return first || '';
}

export function truncateText(text: string, limit = 140): string {
  if (!text) {
    return '';
  }

  return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
}

export function getParagraphsOrPlaceholder(
  text?: string,
  options?: SplitOptions,
  placeholder: string = PLACEHOLDER_PARAGRAPH
): string[] {
  const paragraphs = splitTextToParagraphs(text, options);
  return paragraphs.length ? paragraphs : [placeholder];
}

