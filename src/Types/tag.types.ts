export interface Tag {
  id?: string;
  name: string;
  count: number;
  selected?: boolean;
}

export interface MetaData {
  tags: Tag[];
}