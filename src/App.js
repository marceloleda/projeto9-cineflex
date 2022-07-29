import Top from "./components/Top";
import Section from "./components/Section";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App(){
    return(
        <BrowserRouter>
            <Conteiner>
                <Top/>
                <Routes>
                    <Route path="/" element={<Section/>}/> 
                </Routes>

            </Conteiner>
        </BrowserRouter>
    );
}

const Conteiner =styled.div`
    width: 375px;
`;