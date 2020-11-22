import { useEffect, useState} from 'react'
const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;

export const useFetch = url => {
    const [state, setState] = useState({data: null, loading: true});
    let url_with_key = url + `&apikey=${OMDB_KEY}`
    
    useEffect( () => {
        setState(state => ({data: state.data, loading: true}))
        fetch(url_with_key)
        .then(x => x.json())
        .then(y => {
            setState({data: y, loading: false});
        })
        .catch( error => {
            console.log("ERROR: ", error)
            setState({data: null, loading: false});
        })
    }, [url_with_key]);

    return state;
}