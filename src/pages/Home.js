import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

import "./Home.css";

import axios from "axios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(response.data.categories);
    } catch (error) {
      setError(true);
    }
  };

  let navigate = useNavigate();

  const clickHandler = (category) => {
    navigate(`/results?c=${category}`);
  };

  return (
    <>
      <div className="hero">
        <header className="container">
          <div className="logo">Food Planet</div>
          <h2>
            Good food is the foundation of <br /> the genuine happiness
          </h2>
          <SearchBar />
        </header>
      </div>
      <main className="container">
        <h2 className="category-title">Browse By Category</h2>
        <div className="card-container">
          {categories.map((ct) => {
            return (
              <Card
                key={ct.idCategory}
                src={ct.strCategoryThumb}
                alt={ct.strCategory}
                title={ct.strCategory}
                onClicking={() => clickHandler(ct.strCategory)}
              />
            );
          })}
          {error && <h2>Unexpected error occured</h2>}
        </div>
      </main>
    </>
  );
};

export default Home;
