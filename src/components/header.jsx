import React, { useEffect } from 'react';
import '../assets/css/header.css'
import { gsap, Power3 } from 'gsap';
import { Link } from 'react-router-dom';

const Header = ({openMenu, setOpenMenu}) => {

    useEffect(() => {
        gsap.from(".item", {duration: 1, opacity: 0, delay: .2, ease: Power3.easeOut, stagger: .25})
    }, [])

    const handleEnter = () => {
        gsap.to(".hamburger:nth-child(1)", {duration: .4, width: 20, marginLeft: 10, ease: Power3.easeInOut})
        gsap.to(".hamburger:nth-child(2)", {duration: .4, width: 30, marginLeft: 0, ease: Power3.easeInOut})
        gsap.to(".hamburger:nth-child(3)", {duration: .4, width: 20, marginLeft: 10, ease: Power3.easeInOut})
    }

    const handleExit = () => {
        gsap.to(".hamburger:nth-child(1)", {duration: .4, width: 30, marginLeft: 0, ease: Power3.easeInOut})
        gsap.to(".hamburger:nth-child(2)", {duration: .4, width: 20, marginLeft: 10, ease: Power3.easeInOut})
        gsap.to(".hamburger:nth-child(3)", {duration: .4, width: 30, marginLeft: 0, ease: Power3.easeInOut})
    }

    const handleLogoHover = () => {
        gsap.to(".logo", {duration: .4, x: 3, skewY: 4, ease: Power3.easeInOut})
    }

    const handleLogoUnhover = () => {
        gsap.to(".logo", {duration: .4, x: -3, skewY: 0, ease: Power3.easeInOut})
    }

    const handleMenuClick = () => {
        setOpenMenu(!openMenu)
        if(openMenu){
            if(document.getElementById("root").className === "dark"){
                gsap.to(".logo", {duration: .4, delay: .2, color: "#e4e6eb", ease: Power3.easeOut})
                gsap.to(".hamburger", {duration: .4, delay: .5, borderColor: "#e4e6eb",  ease: Power3.easeInOut})       
            }else{
                gsap.to(".logo", {duration: .4, delay: .5, color: "#191919", ease: Power3.easeInOut})
                gsap.to(".hamburger", {duration: .4, delay: .5, borderColor: "#191919",  ease: Power3.easeInOut}) //e4e6eb
            }
        }else{
            window.scrollTo(0, 0)
            gsap.to(".logo", {duration: .4, delay: .2, color: "#e4e6eb", ease: Power3.easeOut})
            gsap.to(".hamburger", {duration: .4, delay: .2, borderColor: "#e4e6eb",  ease: Power3.easeOut})
        }
    }

    const handleLogoClick = () => {
        if(openMenu){
            setOpenMenu(false)
            gsap.to(".logo", {duration: .4, delay: .5, color: "#191919", ease: Power3.easeInOut})
            gsap.to(".hamburger", {duration: .4, delay: .5, borderColor: "#191919",  ease: Power3.easeInOut})
        }
    }

    return(
        <header>
            <Link to="/">
                <div id="logo" className="logo item" onClick={() => handleLogoClick()} onMouseEnter={() => handleLogoHover()} onMouseOut={() => handleLogoUnhover()}>film.</div>
            </Link>
            <div className="options">
                <div className="btn item" onClick={() => handleMenuClick()} onMouseOver={() => handleEnter()} onMouseLeave={() => handleExit()}>
                    <div className="hamburger"></div>
                    <div className="hamburger"></div>
                    <div className="hamburger"></div>
                </div>
            </div>
        </header>
    )
}

export default Header;