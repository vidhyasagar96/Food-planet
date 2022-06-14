import React, { useState } from "react";
import "../components/SearchBar.css";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [name, setName] = useState("");
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    navigate(`/results?s=${name}`);
  };

  return (
    <div className="search__bar">
      <form onSubmit={submitHandler}>
        <input
          className="search__bar--input"
          type="search"
          placeholder="Search foods here"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="search__bar--icon" type="submit">
          <SearchIcon sx={{ fontSize: 40 }} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
