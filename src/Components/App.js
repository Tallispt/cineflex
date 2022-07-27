import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";

export default function App() {
    return (
        <>
            <div className="header">CINEFLEX</div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}