import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./Home";
import Film from "./Film";
import Session from "./Session";
import Success from "./Final";

export default function App() {
    const [request, setRequest] = useState()

    return (
        <>
            <div className="header">CINEFLEX</div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path='/filme/:movieId'
                        element={<Film />}
                    />
                    <Route path="/sessao/:idSession" element={<Session setRequest={setRequest} />} />
                    <Route path="/sucesso" element={<Success request={request} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}