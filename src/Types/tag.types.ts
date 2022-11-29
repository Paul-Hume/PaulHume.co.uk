import Contentful from 'contentful';

export interface Tag {
  name: string;
  sys: Contentful.Sys;
}