export interface Tag {
  id?: string;
  name: string;
  count: number;
}

export interface MetaData {
  tags: Tag[];
}