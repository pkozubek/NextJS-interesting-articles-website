export interface IArticleDTO {
  title: string;
  description: string;
  content: string;
  tags: string[];
}

export interface IArticle extends IArticleDTO {
  id: string;
}
