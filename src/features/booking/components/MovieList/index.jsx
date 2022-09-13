import React from "react";
import MovieItem from "../MovieItem";

function MovieList(props) {
  //Other function
  const renderMovieItem = () => {
    const movieList = props.movieList;
    const tag = movieList?.map((movie, index) => {
      return <MovieItem key={index} movie={movie} />;
    });

    return tag;
  };
  //Other function
  return (
    <div className="container">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 px-5">
        {renderMovieItem()}
      </div>
    </div>
  );
}

export default MovieList;
