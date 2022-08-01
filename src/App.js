import Top from "./components/Top";
import Section from "./components/Section";
import Reserve from "./components/Reserve";
import Seats from "./components/Seats";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from 'styled-components'
import Finalizar from "./components/Finalizar";
import { useState } from "react";


export default function App(){
    const [reserva, setReserva] = useState(null);

    return(
        <BrowserRouter>
            <GlobalStyle/>
            <Conteiner>
                <Top/>
                <Routes>
                    <Route path="/" element={<Section/>}/> 
                    <Route path="/sessoes/:idFilm" element={<Reserve/>}></Route>
                    <Route path="/sessoes/:idFilm/assentos/:idSessao" element={<Seats finalizar={reserva => setReserva(reserva)}/>}></Route>
                    <Route path="/sucesso" element={<Finalizar reserva={reserva}/>} />

                </Routes>

            </Conteiner>
        </BrowserRouter>
    );
}

const Conteiner =styled.div`
    width: 375px;
    height: 100%;
    margin-bottom:155px;
    font-family: 'Roboto';

`;
const GlobalStyle = createGlobalStyle`
  body {
    background: #E5E5E5;
  }
`