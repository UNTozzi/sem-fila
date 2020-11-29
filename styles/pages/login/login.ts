import styled from 'styled-components'
import { Box } from 'grommet'

export const BoxLogin = styled(Box)`
    @media(max-width: 800px) {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 2fr;
        grid-template-areas: 'text' 'login';
        flex-direction: column-reverse;
        align-content: center;
        justify-items: center;
        width: 100vw;
        padding: 5px 5px;

        & > :first-child {
            display: flex;
            flex-direction: column;
            width:70vw;
            height: max-content;
            justify-content: center;
            align-items: center;

            & > :first-child {
                margin: 0;
                width:50vw;
                height: 10vh;
            }

            & > :nth-child(2) {
                margin: 2vh 0 0 0;
                font-size: 1.5rem;
                height: max-content;
                text-align: center;
            }
        }

        & > :nth-child(2) {
            width:90vw;
            height: 55vh;
        }
    }
}
`