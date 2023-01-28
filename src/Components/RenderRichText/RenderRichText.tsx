import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import styles from './RenderRichText.module.css';

import { AssetNode, ItemContent } from 'Types';
import { sanitizeHtml } from 'Utils';

interface RenderRichTextProps {
  className: string;
  content: ItemContent
}

export const RenderRichText = ({ content, className }: RenderRichTextProps) => {

  const assets = content?.links?.assets?.block;

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Object) => {
        return `<img src="${assets.find(asset => asset.sys.id === (node as AssetNode).data.target.sys.id)?.url}" />`;
      }
    }
  };
  
  return (
    <section className={`${styles.container} ${className}`} dangerouslySetInnerHTML={{__html: sanitizeHtml(documentToHtmlString(content?.json, options))}} />
  );
};

RenderRichText.defaultProps = {
  className: '',
};