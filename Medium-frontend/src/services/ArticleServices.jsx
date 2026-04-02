import axios from "axios";

const ARTICLE_BASE_URL = "http://localhost:8082/article"

export const getArticleService = () => {
  return axios.get(`${ARTICLE_BASE_URL}/get`);
}

export const addArticlesService = (article) => {
    return axios.post(`${ARTICLE_BASE_URL}/add`, article)
}

export const updateArticleService = (article, articleId) => {
    return axios.put(`${ARTICLE_BASE_URL}/${articleId}`, article)
}

export const deleteArticlesService = (articleId) => {
    return axios.delete(`${ARTICLE_BASE_URL}/${articleId}`)
}

export const getMyArticlesService = () => {
    return axios.get(`${ARTICLE_BASE_URL}/myArticles`)
}