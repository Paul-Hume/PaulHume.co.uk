import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Contentful from 'contentful';

import styles from './RenderRichText.module.css';

import { sanitizeHtml } from 'Utils';

interface RenderRichTextProps {
  className: string;
  content: Contentful.EntryFields.RichText;
}

export const RenderRichText = ({ content, className }: RenderRichTextProps) => {
  let options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: unknown) => {
        //  @ts-ignore
        const assetUrl = node?.data?.target?.fields?.file?.url;

        if (!assetUrl) return null;

        return `<img src="${assetUrl}" />`;
      }
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