import styled from 'styled-components'
import { Box } from 'grommet'


export const Card = styled(Box)`
    height: 70vh; 
    width: 45vw;
    background: #202024;
    border: 2px solid #202024;
    border-radius: 8px;
    transition: all 0.2s ease 0s;
    justify-content: center;
    align-items: center;

    &:hover {
        transform: translateY(-7px);
        border-color: rgb(130, 87, 229);
    }
`

export const BoxIndex = styled(Box)`
    justify-content: space-evenly;
    align-items: center;

    @media(max-width: 800px) {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-items: center;
        padding: 3vh 5px;

        & > ${Card} {
            width: 90vw;
            height: 40vh;

            & > :first-child {
                height: 10vh;
            }    
        }
    }
`