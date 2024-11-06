import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://healthconnect-5248e-default-rtdb.firebaseio.com/news.json",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        // Transform data if necessary and set it to the state
        const newsArray = Object.entries(data).map(([id, newsItem]) => ({
          id,
          ...newsItem,
        }));
        setNews(newsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        toast.error("Failed to load news.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading news...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6 mt-16">
      <ToastContainer />
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
        Health Connect News
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Stay up-to-date with the latest news, health tips, and updates from
        Health Connect.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {news.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{article.date}</p>
              <p className="text-gray-700 mb-6">{article.summary}</p>
              <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
