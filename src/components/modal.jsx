import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom'
import { useFetch } from '../assets/utils/useFetch';
import '../assets/css/modal.css';

const Modal = props => {
    const {data, loading} = useFetch(`http://www.omdbapi.com/?i=${props.match.params.id}`);
    const underlay = document.getElementById('results');
    const tl = useRef(null)

    console.log(props)

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        tl.current = gsap.timeline({onReverseComplete: () => {
            if(underlay){
                document.getElementById('results').style.removeProperty('filter');
            }
            props.history.goBack();
        }})
        .to(underlay, {duration: .4, filter: "blur(2px)", ease: "power3.in"})
        .to(".background", {duration: .4, backgroundColor: "rgba(0, 0, 0, 0.3)", ease: "power3.inOut"}, "-=0.4")
        .to(".modal", {duration: .2, width: "70vw", padding: 20, ease: "power3.inOut"}, "-=0.1")
        .to(".fade_in", {duration: .2, y: -5, opacity: 1, ease: "power3.in", stagger: .05})
        .to(".poster_wrapper", {duration: .2, opacity: 1, scale: 1, ease: "power3.inOut"}, "-=0.2")
        .to(".closeBtn", {duration: .4, opacity: .6, ease: "power3.inOut"})

        return () => {
            document.body.style.overflow = 'scroll';
        }
    }, [data])

    const goBack = e => {
        if(e.target === e.currentTarget){
            tl.current.reverse()
        }
    }

    return(
        <>
            {data ? <div className="background" onClick={e => goBack(e)}>
                        <div className="modal">
                            <div className="containts">
                                <div className="poster_wrapper">
                                    <img src={data.Poster} alt="poster"/>
                                    <img className="image_shadow" style={{zIndex: "-1", top: "20px"}} src={data.Poster} alt="poster"/>
                                </div>
                                <div className="info_wrapper fade_in">
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <h3> {data.Title} </h3>
                                        <span> {`(${data.Year})`} </span>
                                        <div className="division"></div>
                                        <div className="star"></div>
                                        <span style={{paddingLeft: 10}}> {data.imdbRating} </span>
                                    </div>
                                    <p className="fade_in" style={{position: "relative", top: "-30px"}}> {`${data.Rated} | ${data.Runtime} | ${data.Genre} | ${data.Released}`} </p>
                                    <p className="fade_in"> {data.Plot} </p>
                                </div>
                            </div>
                            <Link to={`/movie/${props.match.params.id}`}>
                                <div className="moreBtn fade_in">show more</div>
                            </Link>
                            <div className="closeBtn" onClick={e => goBack(e)}></div>
                        </div>
                    </div>
            : null }
        </>
    )
}

export default Modal;