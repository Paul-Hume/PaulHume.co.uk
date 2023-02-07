import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Contentful from 'contentful';

import styles from './RenderRichText.module.css';

import { AssetNode, ItemContent } from 'Types';
import { sanitizeHtml } from 'Utils';

interface RenderRichTextProps {
  className: string;
  content: ItemContent | Contentful.EntryFields.RichText;
}

export const RenderRichText = ({ content, className }: RenderRichTextProps) => {
  let options = {};
  let renderContent = undefined;

  const isItemContent = (content: ItemContent | Contentful.EntryFields.RichText): content is ItemContent => {
    return (content as ItemContent)?.json !== undefined;
  };

  if (isItemContent(content)) {
    const assets = content?.links?.assets?.block;

    options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node: Object) => {
          return `<img src="${assets.find(asset => asset.sys.id === (node as AssetNode).data.target.sys.id)?.url}" />`;
        }
      }
    };

    renderContent = documentToHtmlString(content?.json, options);
  } else {
    // @ts-ignore
    renderContent = documentToHtmlString(content, options);
  }
  
  return (
    <section className={`${styles.container} ${className}`} dangerouslySetInnerHTML={{__html: sanitizeHtml(renderContent)}} />
  );
};

RenderRichText.defaultProps = {
  className: '',
};