import Contentful from 'contentful';

export interface ProjectItem {
  slug: Contentful.EntryFields.Text;
  heroImage: Contentful.Asset;
  title: Contentful.EntryFields.Text;
  shortDescription: Contentful.EntryFields.Text;
  description: Contentful.EntryFields.RichText;
  url: Contentful.EntryFields.Text;
  repo: Contentful.EntryFields.Text;
}