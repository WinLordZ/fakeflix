import React, {useEffect, useState} from 'react';

import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=590664c0e2f9717ee46eb664fb43f89f&language=en-US&sort_by=popularity.desc";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=590664c0e2f9717ee46eb664fb43f89f&language=en-US&query=";


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState ('');

  const getMovies = (API) => {
    fetch(API).then((res) => res.json())
    .then((data) => {
      console.log(data);
      setMovies(data.results);
    });
  }

  useEffect( () => {
    getMovies (FEATURED_API);
  }, [] )

  const handleOnSubmit = (e) =>{
    e.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API+searchTerm)
    }else {
      getMovies (FEATURED_API);
    }
  };

  const handleOnChange =  (e) =>{
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input 
            className="search" 
            type="search" 
            placeholder='Search....' 
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className='movie-container'>      
        {movies.length > 0 && 
          movies.map(movie => (<Movie key={movie.id} {...movie} />) )}
      </div>
    </>
  );
}

export default App;
