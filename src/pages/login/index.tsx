import { Box, Button, Form, FormField, Header, TextInput } from 'grommet'
import { FormPreviousLink } from 'grommet-icons';
import Head from 'next/head'
import { FormEvent, useCallback, useState } from 'react';
import nookies, { setCookie } from 'nookies'

import firebase from '../../../lib/firebase'


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        let reference = firebase.ref('barbearia/')
        reference.on('value', (snapshot) => {
            let values = snapshot.val()
            for (let prop in values) {
                if (email === values[prop].email && password === values[prop].senha) {
                    setCookie(null, 'contentBarbearia', JSON.stringify(values[prop]), {})
                    window.location.href = '../home'
                }
            }
        })
    }

    const handleGoToIndex = useCallback(() => {
        window.location.href = '../'
    }, [])

    return (
        <div className="container">
            <Head>
                <title>SemFila</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header background="brand" width="100%" margin="none">
                <Button icon={<FormPreviousLink />} hoverIndicator onClick={handleGoToIndex}/>
            </Header>
            <Box className="main" pad="0">
                <h1 className="title">SEM<a>FILA</a></h1>
                <div className="grid">
                    <Form
                        onReset={() => (setPassword(''), setEmail(''))}
                        onSubmit={handleSubmit}
                        className="card"
                        style={{width: "70vw"}}
                    >
                        <FormField label="Email">
                            <TextInput placeholder="Email" required type="email" value={email} onChange={val => setEmail(val.target.value)}/>
                        </FormField>
                        <FormField label="Senha">
                            <TextInput placeholder="Senha" required type="password" value={password} onChange={val => setPassword(val.target.value)}/>
                        </FormField>
                        <Box direction="row" justify="evenly">
                            <Button type="submit" primary label="Entrar"/>
                            <Button type="reset" label="Limpar" />
                        </Box>
                    </Form>
                </div>
            </Box>
        
            <footer className="footer">
                <a rel="noopener noreferrer">Powered by Fawkes</a>
            </footer>
        </div>
    )
    
}

export default Login

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx)

    return { props: { cookies } }
}