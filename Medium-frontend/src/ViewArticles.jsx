import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    console.log("useEffect called");
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const response = await axios.get("http://localhost:8082/article/get");
    console.log(response.data);
    setArticles(response.data);
  };

  return (
    <div>
      <h2>Articles</h2>
      {articles.map((a, index) => (
        <div key={index}>
          <p>User: {a.user}</p>
          <p>Title: {a.title}</p>
          <p>Content: {a.content}</p>
          <p>Created At: {a.created_at}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}