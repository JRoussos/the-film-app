import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import na_poster from '../assets/svg/na_poster.svg';

const Poster = ({ id, poster, title, year }) => {
    const location = useLocation();

    return(
        <>
            <div className="movie sug">
                <div className="image_wrapper" >
                    <Link to={{pathname: `/movie/${id}`, state: {background: location}}}>
                        <img className="real_image" src={poster === "N/A" ? na_poster : poster} alt="movie poster"/>
                        <img className="image_shadow" src={poster === "N/A" ? na_poster : poster} alt="shadow poster"/>
                    </Link>
                </div>
                <div className="movie_title">
                    <p>{`${title} (${year})`}</p>
                </div>
            </div>
        </>
    )
}

export default Poster