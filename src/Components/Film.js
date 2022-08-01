import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'

function Sessions({ session }) {
    return (
        <>
            <div className="session-date">{session.weekday} - {session.date}</div>
            <div className="session-hours">
                {session.showtimes.map(showtime => <Link className="session-hour-individual" key={showtime.id} to={`/sessao/${showtime.id}`}>{showtime.name}</Link>)}
            </div>
        </>
    )
}

export default function Film() {
    const [sessions, setSessions] = useState({})
    const [sessionDays, setSessionsDays] = useState([])
    const { movieId } = useParams()

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/movies/${movieId}/showtimes`)

        promise
            .then(value => {
                setSessions(value.data)
                setSessionsDays([...value.data.days])
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <div className="select-session-title">Selecione o horário</div>
            <div className="select-session-container">
                {sessionDays.map(session => <Sessions key={session.id} session={session} />)}
            </div>
            <div className="footer">
                <div className="movie">
                    <img src={sessions.posterURL} alt={sessions.title} />
                </div>
                <p>{sessions.title}</p>
            </div>
        </>
    )
}