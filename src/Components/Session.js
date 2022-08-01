import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Seats(props) {
    const [isSelected, setIsSelected] = useState(false)

    return (
        !props.isAvaible ?
            <div className='circle unavailable'>{props.name}</div> :
            <div className={!isSelected ? 'circle available' : 'circle selected'}
                onClick={() => {
                    props.setSelectedSeats([...props.selectedSeats, props.name])
                    setIsSelected(!isSelected)
                }}>{props.name}</div>
    )

}

export default function Session({ setRequest }) {
    const [data, setData] = useState({})
    const [movie, setMovie] = useState({})
    const [day, setDay] = useState({})
    const [seats, setSeats] = useState([])

    const [name, setName] = useState("")
    const [CPF, setCPF] = useState("")
    const [selectedSeats, setSelectedSeats] = useState([])

    const { idSession } = useParams()
    const navigate = useNavigate();

    function post() {
        if (name && selectedSeats && CPF.length === 11) {
            const request = axios.post("https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many", {
                ids: selectedSeats,
                name: name,
                cpf: CPF
            });

            request
                .then(() => {
                    setRequest({
                        ...movie,
                        ...day,
                        ids: selectedSeats,
                        name: name,
                        cpf: CPF,
                        hour: data.name
                    })
                    navigate('/sucesso')
                })
                .catch(e => { console.log(e) })
        }

    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSession}/seats`)

        promise
            .then(value => {
                setData(value.data)
                setMovie(value.data.movie)
                setSeats([...value.data.seats])
                setDay(value.data.day)
            })
            .catch(e => console.log(e))

    }, [])

    return (
        <>
            <div className="select-seat-title">Selecione o(s) assento(s)</div>
            <div className="select-seat-container">
                <div className="seats">
                    {seats.map(seat => <Seats
                        key={seat.id}
                        isAvaible={seat.isAvaible}
                        name={seat.name}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                    />)}
                </div>
                <div className="seat-exemple">
                    <div>
                        <div className="circle selected"></div>
                        <p>Selecionado</p>
                    </div>
                    <div>
                        <div className="circle available"></div>
                        <p>Disponível</p>
                    </div>
                    <div>
                        <div className="circle unavailable"></div>
                        <p>Indisponível</p>
                    </div>
                </div>
                <form className="form">
                    <p>Nome do comprador:</p>
                    <input placeholder="Digite seu nome..." value={name} onChange={e => { setName(e.target.value) }} />
                    <p>CPF do comprador:</p>
                    <input placeholder="Digite seu CPF..." value={CPF} onChange={e => { setCPF(e.target.value) }} />
                </form>
                <div className="button" onClick={post}>Reservar assento(s)</div>
            </div>
            <div className="footer">
                <div className="movie">
                    <img src={movie.posterURL} alt={movie.title} />
                </div>
                <div>
                    <p>{movie.title}</p>
                    <p>{day.weekday} - {data.name}</p>
                </div>
            </div>
        </>
    )
}