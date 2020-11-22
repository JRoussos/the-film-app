import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Poster from './poster';
import { gsap, Power3 } from 'gsap';
import '../assets/css/results.css';
import { Redirect } from 'react-router-dom';

const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;

const App = props => {
  const [hasMore, setHasMore] = useState(true)
  const [movies, setMovies] = useState(props.location.state.data.Search)

  const loadMoreFunc = page => {
    fetch(`http://www.omdbapi.com/?s=${props.match.params.movie}&page=${page}&apikey=${OMDB_KEY}`)
    .then(x => x.json())
    .then(y => {
        console.log(y);
        setMovies(movies => [...movies, ...y.Search])
        if(y.Response === "False"){
          setHasMore(false)
        }
    })
  }

  useEffect(() => {
    document.title = `Results for "${props.match.params.movie}" - film.`
    gsap.to(".movie", {duration: .6, delay: .1, y: -200, opacity: 1, ease: Power3.easeOut, stagger: {
      each: 0.2,
      from: "start",
      grid: "auto"
    }}) 
  }, [movies])

  return (
    <div id="results">
      <InfiniteScroll className="container" hasMore={hasMore} pageStart={1} loadMore={loadMoreFunc} threshold={window.innerHeight/2}>
        {movies ? movies.map(item => {
          return(
              <Poster key={item.imdbID} id={item.imdbID} year={item.Year} title={item.Title} poster={item.Poster}/>
          )}) : <Redirect to="/404"/>
        }
      </InfiniteScroll> 
    </div>
  )
}
export default App;
