import { Box, Button, Form, FormField, TextInput } from 'grommet'
import Head from 'next/head'
import { FormEvent, useState } from 'react';

import firebase from '../../../lib/firebase'


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        firebase.ref('chat/').once('value').then((snapshot: FormEvent) => {
            console.log(snapshot, 'snap')
        })
    }

    return (
        <div className="container">
            <Head>
                <title>SemFila</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        
            <main className="main">
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
                            <Button type="submit" primary label="Entrar" color="#0070f3"/>
                            <Button type="reset" label="Limpar" style={{borderColor: "#0070f3"}}/>
                        </Box>
                    </Form>
                </div>
            </main>
        
            <footer className="footer">
                <a rel="noopener noreferrer">Powered by Fawkes</a>
            </footer>
        </div>
    )
    
}

export default Login