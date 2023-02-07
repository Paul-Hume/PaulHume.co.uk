import Contentful from 'contentful';

export interface JobHistoryItem {
  contract: Contentful.EntryFields.Boolean;
  project: Contentful.EntryFields.Text;
  from: Contentful.EntryFields.Date;
  to: Contentful.EntryFields.Date;
  location: Contentful.EntryFields.Text;
  role: Contentful.EntryFields.Text;
  client: Contentful.EntryFields.Text;
  description: Contentful.EntryFields.RichText;
}