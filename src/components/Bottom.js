import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function Bottom({dia, hora}){
    const [filmBottom, setFilmBottom] = useState([]);

    const {idFilm} = useParams();


    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilm}/showtimes`);
        promise.then(response => {
            setFilmBottom(response.data)
        });

        promise.catch(err => {console.log(err.message)})

    },[])
    

   
    return(
        <Rodape>
            <ImgRodape>
                <img src={filmBottom.posterURL} alt={filmBottom.title}/>
            </ImgRodape>
            <TituloRodape>
                <h1>{filmBottom.title}</h1>
                {dia != "" ? <h2>{dia} - {hora}</h2> : ""}
                
            </TituloRodape>


        </Rodape>
    );
}

const Rodape = styled.div`
    position: fixed;
    width: 375px;
    height: 117px;
    bottom: 0px;
    display: flex;
    align-items: center;

    background: #DFE6ED;
    border: 1px solid #9EADBA;

`;
const ImgRodape = styled.div`
    width: 64px;
    height: 89px;
    margin-left:10px;
    display:flex;
    justify-content: center;
    align-items: center;

    background: #FFFFFF;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
    border-radius: 2px;

    img{
        width: 48px;
        height: 72px;
    }
`;
const TituloRodape = styled.div`
    margin-left: 14px;
    font-size: 26px;
    line-height: 30px;
    color: #293845;
`;