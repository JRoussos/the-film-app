import React, { useEffect } from 'react';
import { gsap, Power3 } from 'gsap';
import { useFetch } from '../assets/utils/useFetch';
import '../assets/css/details.css';

const Details = props => {

    const {data, loading} = useFetch(`http://www.omdbapi.com/?i=${props.match.params.id}&plot=full`)

    useEffect(() => {
        if(data){ document.title = `${data.Title} (${data.Year}) - film.` }
        let tl = gsap.timeline()

        tl.to(".fade_in", {duration: .2, y: -5, opacity: 1, ease: Power3.easeIn, stagger: .05})
        tl.to(".details_poster_wrapper", {duration: .2, opacity: 1, scale: 1, ease: Power3.easeInOut}, "-=0.2")
        tl.to(".appear", {duration: 1.2, opacity: 1, ease: Power3.easeOut, stagger: .1}, "+=0.2")
    }, [data])

    return(
        <>
            {data ? 
                    <div className="details_main">
                        <div className="details_container">
                            <div className="banner">
                                <div className="details_poster_wrapper">
                                    <img src={data.Poster} alt="poster"/>
                                    <img className="image_shadow" style={{zIndex: "-1", top: "20px"}} src={data.Poster} alt="poster"/>
                                </div>
                                <div className="details_info_wrapper">
                                    <div className="fade_in" style={{display: "flex", alignItems: "center"}}>
                                        <h3> {data.Title} </h3>
                                        <span> {`(${data.Year})`} </span>
                                    </div>
                                    <p className="fade_in" style={{position: "relative", top: "-30px"}}> {`${data.Rated} | ${data.Runtime} | ${data.Genre} | ${data.Released}`} </p>
                                    <div className="fame fade_in">
                                        <div className="rating">
                                            {data.Ratings.map(item => (
                                                <div style={{margin: "0 8px"}} key={item.Source}>
                                                    <div>
                                                        <div className="star" style={{float: "left", top: 0}}></div>
                                                        <span className="score">{item.Value}</span>
                                                    </div>
                                                    <span className="source">on {item.Source}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p> {data.Awards} </p>
                                    </div>
                                </div>
                            </div>
                            <div className="plot_wrapper fade_in">
                                <span>PLOT</span>
                                <p> {data.Plot} </p>
                            </div>
                            <div className="plot_wrapper">
                                <div className="appear">
                                    <span>DIRECTORS</span>
                                    <p> {data.Director} </p>
                                </div>
                                <div className="appear">
                                    <span>WRITERS</span>
                                    <p> {data.Writer} </p>
                                </div>
                                <div className="appear">
                                    <span>ACTORS</span>
                                    <p> {data.Actors} </p>
                                </div>
                            </div>
                        </div>
                    </div>
            : null }
        </>
    )
}

export default Details;