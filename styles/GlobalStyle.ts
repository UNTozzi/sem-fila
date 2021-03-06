import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

    html,
    body {
        padding: 0;
        margin: 0;
        background-color: #121214;
        font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        color: white;
    }

    a {
        color: white;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }

    .input-default {
        width: 100% !important;
        height: 50px !important;
        font-size: 16px !important;
        background: rgb(18, 18, 20) !important;
        border-color: rgb(18, 18, 20) !important;
        color: rgb(255, 255, 255) !important;
        padding: 0px 1em 0px 2.80em !important;
        border-radius: 5px !important;
    }

    .input-default:active {
        border: 2px #7D4CDB !important;
    }

    .button-primary {
        background: #7D4CDB !important;
        border-radius: 5px !important;
        border: 0 !important;
        text-align: center !important;
        color: white !important;
        font-weight: bold !important;
        padding: 0.6rem 2rem !important;
    }

    .button-primary:hover {
        border: 2px #7D4CDB !important;
        outline: none !important;
    }

    .container {
        min-height: 100vh;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .footer {
        width: 100%;
        height: 10vh;
        border-top: 1px solid #7D4CDB;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .footer img {
        margin-left: 0.5rem;
    }

    .footer a {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title a {
        color: #7D4CDB;
        text-decoration: none;
    }

    .title a:hover,
    .title a:focus,
    .title a:active {
        text-decoration: underline;
    }

    .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
    }

    .title,
    .description {
        text-align: center;
    }

    .description {
        line-height: 1.5;
        font-size: 1.5rem;
    }

    .code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
        Bitstream Vera Sans Mono, Courier New, monospace;
    }

    .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        max-width: 800px;
        margin-top: 3rem;
    }

    .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
    }

    .card:hover,
    .card:focus,
    .card:active {
        color: #7D4CDB;
        border-color: #7D4CDB;
    }

    .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
    }

    .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
    }

    .logo {
        height: 1em;
    }

    @media (max-width: 600px) {
        .grid {
            width: 100%;
            flex-direction: column;
        }
    }

`