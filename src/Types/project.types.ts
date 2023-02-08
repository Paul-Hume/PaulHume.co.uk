import Contentful from 'contentful';

export interface ProjectItem {
  title: Contentful.EntryFields.Text;
  slug: Contentful.EntryFields.Text;
  url: Contentful.EntryFields.Text;
  repo: Contentful.EntryFields.Text;
  description: Contentful.EntryFields.RichText;
  image: Contentful.Asset;
}