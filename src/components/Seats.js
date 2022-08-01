import Bottom from "./Bottom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export default function Seats({finalizar}){
    const {idSessao} = useParams();
    const [data, setData] = useState([]);
    const [places, setPlaces] = useState([]);
    const [hora, setHora] = useState([]);
    const [dia, setDia] = useState([]);
    const [nome, setNome] = useState("");
	const [cpf, setCpf] = useState("");
    const navigate = useNavigate();

    const [assentosSelecionados, setAssentosSelecionados] = useState([]);

    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        promise.then(response =>{
            setPlaces(response.data.seats);
            setData(response.data);
            setDia(response.data.day.weekday)
            setHora(response.data.name)

        })
        promise.catch(err => {console.log(err.message)});
    },[])
    
    function toggle(id, numero) {
        const jaSelecionado = assentosSelecionados.some(assento => assento.id === id);
        if (!jaSelecionado) {
          setAssentosSelecionados([...assentosSelecionados, { id, numero }]);
        } else {
          const novosAssentos = assentosSelecionados.filter(assento => assento.id !== id);
          setAssentosSelecionados(novosAssentos);
        }
    }
    function sucesso(event) {
        event.preventDefault();
        if(assentosSelecionados.length > 0) {
        const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', {
          ids: assentosSelecionados.map(assento => assento.id),
          name: nome,
          cpf: cpf
        });
        promise.then(response => {
            finalizar({
              filme: data.movie.title,
              dia: dia,
              horario: hora,
              assentos: assentosSelecionados,
              nome: nome, 
              cpf: cpf
            });
            navigate('/sucesso');
          });
    
          promise.catch(err => alert(err.response.statusText));
        } else {
          alert('Selecione pelo menos um assento!');
        }
      
    }

    return(
        <>
            <Categoria><h1>Selecione o(s) assento(s)</h1></Categoria>
            <Conteiner>
                <Assentos>
                    {places.map((seat, index)=>{
                        const { id, name, isAvailable } = seat;

                        const disponivel = isAvailable;
                        const selecionado = assentosSelecionados.some(assento => assento.id === id);

                        return(
                            <Assento 
                                key={index} 

                                selecionado={selecionado} 
                                
                                disponivel={disponivel}
                                onClick={()=>{
                                    if (!disponivel) alert('Esse assento não pode ser escolhido');
                                    else{
                                        toggle(id, name)
                                    }
                                }}
                            >
                                <h1>{seat.name}</h1>
                            </Assento>                        
                        );
                    })}
                    <Exemplo>
                        <Verde></Verde>
                        <Cinza></Cinza>
                        <Amarelo></Amarelo>
                    </Exemplo>
                    <Texto>
                        <h1>Selecionado</h1>
                        <h1>Disponível</h1>
                        <h1>Indisponível</h1>
                    </Texto>
                </Assentos>
                <Input>
                        <h1>Nome do comprador:</h1>
                    <form onSubmit={sucesso}>
                        <Inserir type="text" value={nome} onChange={e => setNome(e.target.value)} required/>
                        <h1>CPF do comprador:</h1>

                        <Inserir type="text" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" title="Digite um CPF no formato: xxx.xxx.xxx-xx" 
                        value={cpf} onChange={e => setCpf(e.target.value)} required/>

                        <Enviar type="submit">Reservar assento(s)</Enviar>
                    </form>
                </Input>
            </Conteiner>
            <Bottom hora={hora} dia={dia}/>
        </>
    );
}

function corAssento(selecionado, disponivel) {
    if (selecionado) return '#8DD7CF';
    else if (disponivel) return '#C3CFD9';
    else return '#FBE192';
}

const Enviar = styled.button`
    width: 225px;
    height: 42px;

    background: #E8833A;
    border-radius: 3px;

    font-size: 18px;
    line-height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.04em;

    border: none;

    color: #FFFFFF;

    cursor: pointer;
    &:hover{
        background-color: #12ed3a;
    }
`;

const Input = styled.div`
    width: 327px;
    margin-top: 42px;
    h1{
        font-size: 18px;
        line-height: 21px;
        color: #293845;
    }
`; 
const Inserir = styled.input`

    box-sizing: border-box;

    width: 327px;
    height: 51px;
    margin-bottom: 20px;

    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 3px;
`;

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
const Assentos = styled.div`
    width: 335px;
    display:flex;
    flex-wrap: wrap;

`;

const Assento = styled.div`
    box-sizing: border-box;

    width: 26px;
    height: 26px;
    margin-right: 7px;
    margin-bottom: 18px;

    background: ${({ selecionado, disponivel }) =>
    corAssento(selecionado, disponivel)};
    border: 1px solid #808f9d;
    border-radius: 12px;
    cursor: pointer;
    &:hover{
        background-color: #a0a3a5;
    }


    display: flex;
    justify-content: center;
    align-items:center;
    h1{
        font-size: 11px;
        line-height: 13px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.04em;

        color: #000000;
    }

`;
const Conteiner = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const Exemplo = styled.div`
    width:100%;
    margin-bottom:10px;
    display:flex;
    justify-content: center;
    justify-content: space-around;
`;
const Cinza = styled.div`
    box-sizing: border-box;

    width: 25px;
    height: 25px;

    background:#C3CFD9;
    border: 1px solid #7B8B99;
    border-radius: 17px;
`;
const Verde = styled(Cinza)`
    background: #8DD7CF;
    border: 1px solid #1AAE9E;
    border-radius: 17px;
`;

const Amarelo = styled(Cinza)`
    background: #FBE192;
    border: 1px solid #F7C52B;
    border-radius: 17px;
`;
const Texto = styled.div`
    width:100%;
    display: flex;
    justify-content: center;
    justify-content: space-around;
`;