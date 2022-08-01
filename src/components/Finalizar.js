import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Finalizar(props){
    const navigate = useNavigate();

    const { reserva } = props;
    const { filme, dia, horario, assentos, nome, cpf } = reserva;

    function Home() {
        navigate('/');
      }
    return (
    <Container>
      <DadosConfirmacao>
        <h1>Pedido feito com sucesso!</h1>
        <Infos>
          <h1>Filme e sessão</h1>
          <p>{filme}</p>
          <p>
            {dia} {horario}
          </p>
        </Infos>
        <Infos>
          <h1>Ingressos</h1>
          {assentos.map(({ numero }) => {
            return <p key={numero}>Assento {numero}</p>;
          })}
        </Infos>
        <Infos>
          <h1>Comprador</h1>
          <p>Nome: {nome}</p>
          <p>CPF: {cpf}</p>
        </Infos>
      </DadosConfirmacao>
      <BotaoVoltar onClick={Home}>Voltar para home</BotaoVoltar>
    </Container>
  );
}


const DadosConfirmacao = styled.div`
  font-size: 22px;
  h1 {
    width: 370px;
    height: 30px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #247a6b;
    font-weight: 700;
  }
`;

const Container = styled.div`
  margin: 70px 30px;
  margin-left: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    height: 100px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BotaoVoltar = styled.button`
    width: 225px;
    height: 42px;

    background: #E8833A;
    border-radius: 3px;
    margin-top: 60px;
    cursor: pointer;
    border: none;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: black;
  }
  p {
    line-height: 25px;
  }
`;