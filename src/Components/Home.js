import axios from "axios";
import { useState, useEffect } from "react";

function Movies({ data }) {
    return (
        <div className="movie-cover">
            <img src={data.posterURL} alt={data.title} />
        </div>
    )
}

export default function Home() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const promise = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies')

        promise
            .then(value => setMovies(value.data))
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <div className="select-movie-title">Selecione o filme</div>
            <div className="select-movie-container">
                {movies.map(movie => <Movies key={movie.id} data={movie} />)}
            </div>
        </>
    )

}