import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function Success({ request }) {

    return (
        <>
            <div className="success-title">Pedido feito
                com sucesso!</div>
            <div className="success-container">
                <div>
                    <p>Filme e sessão</p>
                    <p>{request.title}</p>
                    <p>{request.date} {request.hour}</p>
                </div>
                <div>
                    <p>Ingressos</p>
                    {request.ids.map((id, index) => <p key={index}>Assento {id}</p>)}

                </div>
                <div>
                    <p>Comprador</p>
                    <p>Nome: {request.name}</p>
                    <p>CPF: {request.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4")}</p>
                </div>
                <Link to='/' className="button">Voltar pra Home</Link>
            </div>
        </>
    )
}