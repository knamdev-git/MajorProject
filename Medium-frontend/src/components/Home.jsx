import React, {useEffect, useState} from 'react'
import {getArticleService} from "../services/ArticleServices.jsx";
import {useNavigate} from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  // Demo articles data
  const [articles, setArticles] = useState([]);

  useEffect(() => {
      getArticleService().then((response) => {
        setArticles(response.data);
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      })
  }, []);

  function thisFuntion() {
    console.log("Button cickekdehdjdvn")
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-zinc-900 to-red-50 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Hero Text */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to ArtiPod
              </h1>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Discover amazing stories, insights, and ideas from writers around the world.
              </p>
              <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 cursor-pointer transition duration-300" onClick={() => {
                navigate('/getArticles');
              }}>
                Start Reading
              </button>
            </div>
            
            {/* Hero Image */}
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=500&fit=crop" 
                alt="Hero"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Articles
            </h2>
            <p className="text-gray-600 text-lg">
              Read our latest and most popular articles
            </p>
          </div>

          {/* Articles Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <div 
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                {/* Article Image */}
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Article Content */}
                <div className="p-5">
                  {/* Category Badge */}
                  <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {article.tag}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.content}
                  </p>
                  
                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{article.author}</span>
                    <span>{article.created_at}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-zinc-900 to-red-50 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Reading Today
          </h2>

          <p className="text-lg mb-8 opacity-90">
            Join thousands of readers discovering great articles and stories.
          </p>

          <button className="bg-white text-blue-600 font-bold py-3 px-10 rounded-lg cursor-pointer text-lg" onClick={() => {navigate('/getArticles')}} >
            Explore All Articles
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Stat 1 */}
            <div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">500+</h3>
              <p className="text-gray-600 text-lg">Articles Published</p>
            </div>
            
            {/* Stat 2 */}
            <div>
              <h3 className="text-4xl font-bold text-purple-600 mb-2">10K+</h3>
              <p className="text-gray-600 text-lg">Active Readers</p>
            </div>
            
            {/* Stat 3 */}
            <div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">50+</h3>
              <p className="text-gray-600 text-lg">Expert Writers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
