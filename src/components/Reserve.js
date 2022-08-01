import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Bottom from "./Bottom";

export default function Reserve(){
    const {idFilm} = useParams();
    const [sections, setSections] = useState([]);
    
    useEffect(() =>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilm}/showtimes`);
        promise.then(response => {
            setSections(response.data.days)
        });
        
        promise.catch(err => {console.log(err.message)})

    },[])
    return(
        <>
            <Categoria><h1>Selecione o horário</h1></Categoria>
            {sections.map((section, index) => 
                <Sessao key={index}>
                    <Dia >
                        <h1>{section.weekday} - {section.date}</h1>
                    </Dia>
                        <Hora>
                            {section.showtimes.map((hour, index) =>
                                <Link key={index} to={`./assentos/${hour.id}`} style={{ textDecoration: 'none' }}>
                                    <Botao >{hour.name}</Botao> 
                                </Link>
                            )}
                        </Hora>
                </Sessao>
            )}
            <Bottom hora={""} dia={""} />
        </>
    );
}
const Categoria = styled.div`
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    h1{
        font-size: 24px;
        letter-spacing: 0.04em;
        color: #293845;
    }
`;
const Sessao = styled.div`
    margin-left: 25px;
`;
const Dia = styled.div`
    margin-bottom: 22px;
    h1{
        font-size: 20px;
        line-height: 23px;
        letter-spacing: 0.02em;
        color: #293845;
    }
`;
const Botao = styled.div`
    width: 82px;
    height: 43px;
    margin-right: 8px;

    font-size: 18px;
    line-height: 21px;

    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.02em;

    color: #FFFFFF;
    background: #E8833A;
    border-radius: 3px;
`;
const Hora = styled.div`
    display: flex;
    margin-bottom: 23px;


`;