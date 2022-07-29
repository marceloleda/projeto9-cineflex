import styled from "styled-components";

export default function Top(){
    return(
        <> 
            <Topo>
                <h1>CINEFLEX</h1>
            </Topo>

        </>
    );
}

const Topo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 67px;
    background: #C3CFD9;

    h1{
        font-family: 'Roboto';
        font-size: 34px;
        color: #E8833A;
    }
`;