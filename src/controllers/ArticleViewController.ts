import { ArticleView } from "../interfaces/ArticleView.js";
import { data } from "../data.js";

export const articles: ArticleView[] = data.map(element => ({
    title : element.title,
    url : element.url,
    views : element.views
}));




