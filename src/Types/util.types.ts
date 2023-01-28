import { Document } from '@contentful/rich-text-types';

export interface ItemSys {
  id: string;
  firstPublishedAt: string;
}

export interface ItemAssetBlockItem {
  sys: ItemSys;
  title: string;
  url: string;
}

export interface ItemContent {
  json: Document;
  links: {
    assets: {
      block: ItemAssetBlockItem[];
    }
  }
}

export interface AssetNode {
  data: {
    target: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      }
    }
  },
  content: Object[],
  nodeType: string;
}