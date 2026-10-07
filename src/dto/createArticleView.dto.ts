export class CreateArticleViewDto {
  title: string;
  url: string;
  views: number;

  constructor(title = '', url = '', views = NaN) {
    this.title = title;
    this.url = url;
    this.views = views;
  }
}