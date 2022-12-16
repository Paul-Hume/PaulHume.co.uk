import sanitize from 'sanitize-html';

export const sanitizeHtml = (html: string): string => {
  const updated = sanitize(html).replace(/<code>/g, '<pre><code>').replace(/<\/code>/g, '</code></pre>');

  return updated;
};