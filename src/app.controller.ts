import { Controller, Get, Render , Query, Post, Body} from '@nestjs/common';
import { AppService } from './app.service.js';
import { articles } from './controllers/ArticleViewController.js';
import { CreateArticleViewDto } from './dto/createArticleView.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
     return {
      articles:articles.toSorted(
        (a,b) => a.title.localeCompare(b.title)
      )
    }
  }


 @Get('/filter')
  @Render('filter')
  getFilter(@Query('minViews') minViews?: string) {
    const min = (minViews && !isNaN(Number(minViews)))? Number(minViews): 0;
    return {
      minViews:min,
      articles: articles
        .filter(a => a.views >= min)
        .toSorted((a, b) => a.title.localeCompare(b.title))
    };
  }


  @Get('/new')
  @Render('new')
  getNew() {
    return this.form();
  }

  @Post('/new')
  @Render('new')
  postNew(@Body() body: any) {
    const dto = new CreateArticleViewDto(
      body?.title?.trim() ?? '',
      body?.url?.trim() ?? '',
      (body?.views !== undefined && body?.views !== '') ? Number(body.views) : NaN
    );

    const error = this.appService.validate(dto);

    if (error) {
      return this.form(error, dto);
    }

    this.appService.createArticle(dto);
    return this.form(null, null, true);
  }

  private form(
    error: string | null = null,
    article: CreateArticleViewDto | null = null,
    success = false
  ) {
    return {
      success,
      error,
      article: article ?? new CreateArticleViewDto()
    };
  }
}


