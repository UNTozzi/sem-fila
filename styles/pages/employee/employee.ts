import styled from 'styled-components'
import { Box } from 'grommet'


export const Card = styled(Box)`
    margin-top: 3vh;
    width: 90vw;
    background: #202024;
    border: 2px solid #202024;
    border-radius: 8px;
    transition: all 0.2s ease 0s;
    scrollbar-color: #7D4CDB;

    &:hover {
        transform: translateY(-7px);
        border-color: rgb(130, 87, 229);
    }

    @media(max-width: 950px) {
        overflow-x: scroll;
    }

`

export const BoxEmployee = styled(Box)`
    align-items: center;
    height: max-content;

    @media(max-width: 800px) {
        padding: 3vh 5px;
    }
`