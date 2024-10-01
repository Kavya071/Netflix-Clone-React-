import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODViZmY5ZWIzZDkyZjkwZDIyYzczMzA0NDczMmI1OCIsIm5iZiI6MTcyNTQ3Mjg2My4yNTEwNzQsInN1YiI6IjY2ZDg5ZTk3MTczYmI0MzNkNzRmNGZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UJc2Jy1kN96PCwo0NAm9wC9gtCoIIEfMULpWjpC6h3M'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaX; // Using deltaY to handle horizontal scrolling
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));

    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]); // Added `category` to dependency array to refetch data when category changes

  return ( 
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return<Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  );
};

export default TitleCards;
