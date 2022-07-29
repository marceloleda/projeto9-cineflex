import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";


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
                <div>
                    <h1>Selecione o filme</h1>
                </div>
                <Filme>
                    {filmes.map( (item, index) => <ImgFilme><img key={index} src={item.posterURL} alt={item.title}/></ImgFilme> )}                   
                </Filme>
            </Conteiner>
        </>
    );
}

const Conteiner = styled.div`
    h1{
        font-size: 24px;
        font-family: 'Roboto';
        letter-spacing: 0.04em;
        color: #293845;
    }
    div{
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
const Filme = styled.div`
    display:flex;
    flex-wrap: wrap;

    
    img{
        width: 129px;
        height: 193px;
    }
`;
const ImgFilme = styled.div`
    margim-bottom: 50px;
    display:flex;
    justify-content:space-between;

`;