import React, { useState, useEffect } from 'react';
import { gsap, Back } from 'gsap';
import { useFetch } from "../assets/utils/useFetch";
import '../assets/css/loading.css'
import { Redirect } from 'react-router-dom';

const Loading = props => {
    const {data, loading} = useFetch(`http://www.omdbapi.com/?s=${props.query}`)
    const [done, setDone] = useState(false)

    useEffect(() => {
        gsap.from(".bubble", {y:200, duration: .7, opacity: 0, ease: Back.easeOut, stagger: .2, onComplete: () => {
            let timeline = gsap.timeline({repeat: -1, onRepeat: () => {
                if(loading){
                    console.log("repeat")
                    timeline.pause(0)
                    gsap.to(".bubble", {y:-200, duration: .7, opacity: 0, ease: Back.easeInOut, stagger: .2, onComplete: () => {
                        setDone(d => !d)
                    }})
                }
            }})

            timeline
                .fromTo(".bubble", 
                    {y: 0, ease: Back.easeInOut, stagger: 0.15}, 
                    {y: -15, duration: .7, ease: Back.easeInOutut, stagger: 0.15})
                .to(".bubble", {y: 0, duration: .7, ease:Back.easeInOut, stagger: 0.15}, "-=0.7")


                
            // timeline
            //     .fromTo(".bubble", 
            //         {y: 0, ease: Back.easeInOut, stagger: 0.25}, 
            //         {y: -15, duration: .7, ease: Back.easeInOutut, stagger: 0.25})
            //     .to(".bubble", {y: 0, duration: 1, ease:Back.easeInOut, stagger: 0.25}, "-=0.7")
        }})
    }, [])

    return(
        <>
        {done ? <Redirect push to={{pathname: `/search/${props.query}`, state: {data}}}/> :
            <div className="loader_container">
                <div className="loading">
                    <div className = "bubble"></div>
                    <div className = "bubble"></div>
                    <div className = "bubble"></div>
                </div>
            </div> 
        }
        </>
    )
}

export default Loading;