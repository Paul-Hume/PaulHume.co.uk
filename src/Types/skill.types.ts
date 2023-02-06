import Contentful from 'contentful';

export interface Skill {
  skill: Contentful.EntryFields.Text;
  date: Contentful.EntryFields.Date;
}