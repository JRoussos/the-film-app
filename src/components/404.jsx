import React, { useEffect } from 'react';
import '../assets/css/404.css';
import man from '../assets/svg/man.svg'
import { gsap, Power3 } from 'gsap';
import { Link } from 'react-router-dom';


const Lost = props => {

    let message = "I looked everywhere but I couldn't found this page"
    if(props.message){
        message = props.message
    }

    useEffect(() => {
        document.title = "Ooops.."
        gsap.to(".lost_text", {duration: .5, opacity: 1, ease: Power3.easeInOut})
        gsap.to(".illustration", {duration: 1, opacity: 1, x: -40, ease: Power3.easeInOut})
    })

    return(
        <div className="lost_container">
            <div className="lost_text">
                <h2>Ooops..</h2>
                <p>{message}</p>
                <Link to="/">
                    <div className="returnBtn">Return home</div>
                </Link>
            </div>
            <img className="illustration" src={man} alt="illustration"/>
        </div>
    )
}

export default Lost;