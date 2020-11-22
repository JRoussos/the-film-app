import React, { useState, useEffect } from 'react';
import { gsap, Power3 } from 'gsap';
import '../assets/css/menu.css';

import github from '../assets/icons/github.png';
import instagram from '../assets/icons/instagram.png';
import twitter from '../assets/icons/twitter.png';

const Menu = props => {
    const [dark, setDark] = useState(false)
    const {openMenu} = props

    useEffect(() => {
        if(openMenu){
            document.body.style.overflow = 'hidden';
            gsap.fromTo(".menu", {skewY: 3}, {duration: .8, top: "0%", skewY: 0, ease: Power3.easeInOut, stagger: .07})
            gsap.to("h1", {duration: .4, top: 0, delay: .6, ease: Power3.easeInOut, stagger: .05})
            gsap.to(".fade-in", {duration: .4, y: -30, opacity: 1, delay: .8, ease: Power3.easeInOut, stagger: .01})
        }else{
            document.body.style.overflow = 'scroll';
            gsap.to(".menu", {duration: 1.2, top: "-105%", ease: Power3.easeInOut, stagger: .07, onComplete: () => {
                gsap.to("h1", {top: 100})
                gsap.to(".fade-in", {y: 30, opacity: 0})
            }})
        }
    }, [openMenu])

    const handleHover = e => {
        gsap.to(e.target, {duration: .4, x:-15, ease: Power3.easeInOut})
    }

    const handleUnhover = e => {
        gsap.to(e.target, {duration: .4, x: 0, ease: Power3.easeInOut})
    }
    
    const handleDarkClick = () => {
        gsap.to(".toggle", {duration: .3, opacity: 0, ease: Power3.easeInOut, onComplete: () => {
            setDark(!dark)
            document.getElementById("root").className = dark ? "light" : "dark";
            gsap.to(".toggle", {duration: .3, opacity: 1, ease: Power3.easeInOut})
        }})
        if(dark){
            gsap.to(".page", {duration: .5, backgroundColor: "#4C5C68", ease:Power3.easeInOut})
        }else{
            gsap.to(".page", {duration: .5, backgroundColor: "#46494C", ease:Power3.easeInOut})
        }
    }


    return(
        <div className="menu underlay">
            <div className="menu page">
                <div className="menu_container">
                    <div className="info">
                        <p className="fade-in">find me on:</p>
                        <div className="icons fade-in">
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/jroussos/">
                                <img src={github} alt="github icon"/>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/giannhs41">
                                <img src={twitter} alt="twitter icon"/>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/giannhs_r">
                                <img src={instagram} alt="instagram icon"/>
                            </a>
                        </div>
                    </div>
                    <div className="interacting">
                        <div className="heading_container toggle" onClick={e => handleDarkClick(e)} onMouseOver={e => handleHover(e)} onMouseLeave={e => handleUnhover(e)}>
                            <h1>Make it {dark ? "bright" : "dark"} </h1>
                        </div>
                        <div className="heading_container" onMouseOver={e => handleHover(e)} onMouseLeave={e => handleUnhover(e)} onClick={() => alert("Feature not yet available!\n\nThis feature will enable you to save the current theme mode (dark/bright) as well as your recents searches on local storage for when you visit the site again.")}>
                            <h1>Enable local save</h1>
                        </div>
                        <div className="heading_container" onMouseOver={e => handleHover(e)} onMouseLeave={e => handleUnhover(e)}>
                            <a href="mailto:jroussosdev@gmail.com?subject=Hey John :)">
                                <h1>Send me an email</h1>
                            </a>
                        </div>
                    </div>
                </div>
                {/* <p className="copyright">© {new Date().getFullYear()} made with ❤ by <a target="_blank" href="https://github.com/jroussos/">J.R.</a></p> */}
            </div>
        </div>
    )
}

export default Menu;