import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "./Results.css";

import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Results = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [meals, setMeals] = useState([]);
  const [searchInfo, setSearchInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  const categoryQuery = searchParams.get("c");
  const searchQuery = searchParams.get("s");
  console.log(categoryQuery, searchQuery, meals);
  useEffect(() => {
    if (categoryQuery) {
      setSearchInfo(`Category : ${categoryQuery}`);
      getMealsUsingCategory(categoryQuery);
    }

    if (searchQuery) {
      setSearchInfo(`Results for : ${searchQuery.toLocaleLowerCase()}`);
      getMealsUsingSearch(searchQuery);
    }
    setLoading(false);
  }, []);

  const getMealsUsingCategory = async (query) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`
      );
      setMeals(response.data.meals);
    } catch (error) {
      setError(true);
    }
  };

  const getMealsUsingSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      setMeals(response.data.meals);
    } catch (error) {
      setError(true);
    }
  };

  let content;
  if (loading) {
    content = <h2>Loading...</h2>;
  }
  if (meals === null || meals.length === 0) {
    content = <h2>No results found</h2>;
  } else {
    content = meals.map((meal) => {
      return (
        <Card
          key={meal.idMeal}
          src={meal.strMealThumb}
          alt={meal.strMeal}
          title={meal.strMeal}
        />
      );
    });
  }
  const onClickHandler = () => {
    navigate("/");
  };

  return (
    <>
      <div className="logo" onClick={onClickHandler}>
        Food Planet
      </div>
      <div className="result-hero">
        <h2 className="result-title">{searchInfo}</h2>
      </div>
      <div className="container">
        <div className="card-container">
          {content}
          {error && <h2>Unexpected error occured</h2>}
        </div>
      </div>
    </>
  );
};

export default Results;
