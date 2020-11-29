import styled from 'styled-components'
import { Box } from 'grommet'

export const BoxRegister = styled(Box)`
    @media(max-width: 1170px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 30% 70%;
        grid-template-areas: 'text' 'register';
        flex-direction: column-reverse;
        align-content: center;
        justify-items: center;
        width: 100vw;
        padding: 5px 5px;

        & > :first-child {
            width:90vw;
            height: 65vh;
        }

        & > :nth-child(2) {
            display: flex;
            flex-direction: column;
            width:70vw;
            height: 35vh;
            justify-content: center;
            align-items: center;

            & > :first-child {
                margin: 0;
                width:40vw;
                height: 7vh;
            }

            & > :nth-child(2) {
                margin: 2vh 0;
                font-size: 1.0rem;
                height: max-content;
            }

            & > :nth-child(3) {
                margin: 0;
                font-size: 0.9rem;
                height: max-content;
            }
        }
    }
}
`