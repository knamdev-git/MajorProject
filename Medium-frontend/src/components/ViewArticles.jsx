import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import SubNavBar from './subNavbar/SubNavBar';
import ListComponent from './listComponent/ListComponent';
import {getArticleService} from "../services/ArticleServices.jsx";

const ViewArticles = () => {

  const [articles, setArticles] = useState([]);

  //it will run in the background
  useEffect(() => {
    getArticleService().then((response) => {
        setArticles(response.data);
        console.log("Response from backend : ", response.data);
      })
      .catch((error) => {
        console.log("Error while getting the articles");
      });
  }, []);

  return (
    // fetching all the articles with axios 
    <div>
      <div>
        <SubNavBar />
      </div>

      {articles.map((elem, idx) => (
          <div key={idx}>
            <ListComponent user={elem.id} title={elem.title} description={elem.content} likes={elem.likes} comments={elem.comments} />
          </div>
      ))}
    </div>
  )
}

export default ViewArticles
