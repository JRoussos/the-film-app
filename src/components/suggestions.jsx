import React, { useEffect } from 'react';
import { gsap, Back } from 'gsap';
import Poster from './poster';

const Suggestions = ({ suggestions, timetogo }) => {

    useEffect(() => {
        gsap.to(".sug", {duration: .3, opacity: 1, y: -40, ease:Back.easeInOut, stagger: .05})
        if (timetogo){
            gsap.to(".sug", {duration: .3, opacity: 0, ease:Back.easeInOut, stagger: .05})
        }
    })

    return(
        <div className="suggestions" >
            {!suggestions ? null : suggestions.Response === "True" ?  
                    suggestions.Search.slice(0, 3).map(item => (
                        <Poster key={item.imdbID} id={item.imdbID} year={item.Year} title={item.Title} poster={item.Poster}/>
                    )) : <p className="sug">{suggestions.Error}</p>
            }
        </div>
    )
}

export default Suggestions;