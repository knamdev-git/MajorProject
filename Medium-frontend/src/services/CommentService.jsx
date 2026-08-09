import axios from "axios";

const BASE_URL_COMMENTS = "http://localhost:8082/comments"

export const getAllCommentsService = () => axios.get(`${BASE_URL_COMMENTS}/`)
export const getCommentByArticleId = (articleId) => axios.get(`${BASE_URL_COMMENTS}/${articleId}`)
