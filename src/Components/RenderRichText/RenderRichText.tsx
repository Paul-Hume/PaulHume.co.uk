import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';

import { sanitizeHtml } from 'Utils';

interface RenderRichTextProps {
  className: string;
  content: {
    json: Document;
  }
}

export const RenderRichText = ({ content, className }: RenderRichTextProps) => {
  return (
    <section className={className} dangerouslySetInnerHTML={{__html: sanitizeHtml(documentToHtmlString(content?.json))}} />
  );
};

RenderRichText.defaultProps = {
  className: '',
};