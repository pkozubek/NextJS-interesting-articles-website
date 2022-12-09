export interface IArticleDTO {
  title: string;
  description: string;
  content: string;
  tags: string[];
  articleImage: string;
}
export interface IArticleToInsert extends IArticleDTO {
  createdAt: string;
}

export interface IArticle extends IArticleToInsert {
  _id: string;
}
