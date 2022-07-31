import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Section(){
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(response => {
            setFilmes(response.data)
            
            promise.catch(err => {console.log(err.message)})
        })
    }, [])

    return(
        <>
            <Conteiner>
                <Categoria>
                    <h1>Selecione o filme</h1>
                </Categoria>
                <Filme>
                    {filmes.map( (item, index) => 
                    <ImgFilme>
                        <Link to={`/sessoes/${item.id}`}>
                            <img key={index} src={item.posterURL} alt={item.title}/>
                        </Link>
                    </ImgFilme> )}                   
                </Filme>
            </Conteiner>
        </>
    );
}

const Categoria = styled.div`
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Conteiner = styled.div`

    h1{
        font-size: 24px;
        font-family: 'Roboto';
        letter-spacing: 0.04em;
        color: #293845;
    }
`;
const Filme = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content:space-around;

    
    img{
        width: 129px;
        height: 193px;
    }
`;
const ImgFilme = styled.div`
    margin-top: 50px;
    width: 145px;
    height: 209px;
    background-color: #FFFFFF;

    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;

`;