import { Injectable } from '@nestjs/common';
import { articles } from './controllers/ArticleViewController.js';
import { CreateArticleViewDto } from './dto/createArticleView.dto.js';


@Injectable()
export class AppService {
  getArticlesSorted() {
    return articles.toSorted((a, b) => a.title.localeCompare(b.title));
  }

  getFilteredArticles(minViews: number) {
    return articles
      .filter(a => a.views >= minViews)
      .toSorted((a, b) => a.title.localeCompare(b.title));
  }

  validate(dto: CreateArticleViewDto): string | null {
    if (!dto.title || dto.title.length < 1) {
      return 'A cím megadása kötelező (min. 1 karakter).';
    }
    if (!dto.url) {
      return 'Az URL megadása kötelező.';
    }
    if (!dto.url.startsWith('https://')) {
      return 'Az URL-nek "https://"-rel kell kezdődnie.';
    }
    if (isNaN(dto.views) || dto.views < 0) {
      return 'A megtekintések száma min. 0 kell legyen.';
    }
    return null;
  }

  createArticle(dto: CreateArticleViewDto) {
    articles.push({
      title: dto.title,
      url: dto.url,
      views: dto.views
    });
  }
}