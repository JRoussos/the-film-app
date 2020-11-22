import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useForm } from "react-hook-form";
import { gsap, Power3 } from 'gsap';
import _ from "lodash";

import Loading from './loading';
import Suggestions from './suggestions';

import { useFetch } from "../assets/utils/useFetch";
import '../assets/css/home.css';

const Home = () => {
    let search_box = useRef(null);
    const [submited, setSubmited] = useState(false);
    const [beforeSubmit, setBeforeSubmit] = useState(false);
    const [query, setQuery] = useState(null);
    const [partial, setPartial ] = useState();
    const [url, setUrl ] = useState(null);
    const {register, handleSubmit } = useForm();

    const onSubmit = (terms) => {
        console.log(terms)
        gsap.to(".input_wrapper", {y: -200, duration: .6, delay: .2, opacity: 0, ease: Power3.easeInOut, onStart: () => {
            setBeforeSubmit(true)
        }, onComplete: () => {
            setQuery(terms.search)
            setSubmited(true)
        }})
    }

    const delayedQuery = useCallback(_.debounce(q => sendQuery(q), 250), []);
    const handleChange = e => {
        setPartial(e.target.value)
        delayedQuery(e.target.value)
    }
    const sendQuery = query => {
        if(query.trim().length === 0){
            setUrl(null)
        }else{
            setUrl(`http://www.omdbapi.com/?s=${query}`)
        }
    }

    const {data, loading} = useFetch(url)

    useEffect(() => {
        document.title = "film."
        gsap.from(search_box, {y: 20, duration: .6, delay: .1, opacity: 0, ease: Power3.easeInOut})
    }, [])

    return(
        <div>
            { submited ? <Loading query={query}/> : 
                <div className="search-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="inside_form">
                            <div className="input_wrapper" ref={element => {search_box = element}}>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <input type="text" ref={register} onChange={handleChange} name="search" placeholder="Search for a movie.."/>
                                    <button type="submit" className="filter_icon">
                                        <svg width="40" height="25" style={{margin: 10}} viewBox="0 0 363 363">
                                            <path opacity="0.5" id="icon_id" fillRule="evenodd" clipRule="evenodd" d="M246.347 268.095C220.349 289.291 187.159 302 151 302C67.605 302 0 234.395 0 151C0 67.6055 67.605 0 151 0C234.395 0 302 67.6055 302 151C302 187.158 289.291 220.349 268.096 246.347C268.254 246.493 268.41 246.642 268.563 246.796L357.657 335.889C363.668 341.9 363.668 351.645 357.657 357.656C351.646 363.667 341.9 363.667 335.889 357.656L246.796 268.563C246.642 268.409 246.493 268.254 246.347 268.095ZM271 151C271 217.274 217.274 271 151 271C84.7256 271 31 217.274 31 151C31 84.7256 84.7256 31 151 31C217.274 31 271 84.7256 271 151Z" fill="black"/>
                                        </svg>                     
                                    </button>
                                </div>
                            </div>
                            <Suggestions timetogo={beforeSubmit} suggestions={data} loading={loading} partial={partial}/>
                        </div>
                    </form>
                    <div className="welcome"> 
                        <p>This app was created purely for educational purposes, so don't expect much out of it.</p>
                    </div>
                </div> 
            }
            {/* <p className="copyright">© {new Date().getFullYear()} made with ❤ by <a target="_blank" href="https://github.com/jroussos/">JR</a></p> */}
        </div>
    )
}

export default Home;