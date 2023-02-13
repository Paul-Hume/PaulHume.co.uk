import { useEffect } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import Contentful from 'contentful';
// @ts-ignore
import Prism from 'prismjs';

import styles from './RenderRichText.module.css';

import { sanitizeHtml } from 'Utils';

interface RenderRichTextProps {
  className: string;
  content: Contentful.EntryFields.RichText;
}

export const RenderRichText = ({ content, className }: RenderRichTextProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  let options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: unknown) => {
        //  @ts-ignore
        const assetUrl = node?.data?.target?.fields?.file?.url;

        if (!assetUrl) return null;

        return `<img src="${assetUrl}" />`;
      }
    },
    renderMark: {
      [MARKS.CODE]: (text: string) => {
        return `<pre><code class="language-javascript">${text}</code></pre>`;
      },
      [MARKS.UNDERLINE]: (text: string) => `<pre>${text}</pre>`,
    }
  };

  // @ts-ignore
  const renderContent = documentToHtmlString(content, options);
  
  return (
    <section className={`${styles.container} ${className}`} dangerouslySetInnerHTML={{__html: sanitizeHtml(renderContent)}} />
  );
};

RenderRichText.defaultProps = {
  className: '',
};