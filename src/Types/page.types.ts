import Contentful from 'contentful';

export type PageTag = 'pageHome';
export interface PageSection {
  showTitle: Contentful.EntryFields.Boolean;
  title: Contentful.EntryFields.Text;
  subTitle: Contentful.EntryFields.Text;
  content: Contentful.EntryFields.RichText;
  sortOrder: Contentful.EntryFields.Number;
}