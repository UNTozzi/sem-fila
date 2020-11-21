import { Box, Button, Form, FormExtendedEvent, FormField, TextInput } from 'grommet'
import Head from 'next/head'
import { FormEvent, useState } from 'react';

import firebase from '../../../lib/firebase'


interface RegisterDTO {
    email: String,
    nome: String,
    senha: String,
    nomeBarbearia: String,
    funcionario?: Boolean,
    key?: String;
}

function Register() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [nomeBarbearia, setNomeBarbearia] = useState('');

    function handleSubmit() {
        let firebaseKey = firebase.ref().child('user').push().key
        firebase.ref('user/' + firebaseKey).set({ nome, nomeBarbearia, email, senha, key: firebaseKey, funcionario: true }).then((response: Response) => {
            window.location.href = '../login/'
        })
    }

    return (
        <div className="container">
            <Head>
                <title>SemFila</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        
            <main className="main" style={{maxHeight: '90vh'}}>
                <h1 className="title">SEM<a>FILA</a></h1>
                <div className="grid">
                    <Form
                        onReset={() => (setSenha(''), setEmail(''), setNome(''), setNomeBarbearia(''))}
                        onSubmit={handleSubmit}
                        className="card"
                        style={{width: "70vw"}}
                    >
                        <FormField label="Nome">
                            <TextInput required type="text" value={nome} onChange={val => setNome(val.target.value)}/>
                        </FormField>
                        <FormField label="Nome do estabelecimento">
                            <TextInput required type="text" value={nomeBarbearia} onChange={val => setNomeBarbearia(val.target.value)}/>
                        </FormField>
                        <FormField label="Email">
                            <TextInput  required type="email" value={email} onChange={val => setEmail(val.target.value)}/>
                        </FormField>
                        <FormField label="Senha">
                            <TextInput required type="password" value={senha} onChange={val => setSenha(val.target.value)}/>
                        </FormField>
                        <Box direction="row" justify="evenly">
                            <Button type="submit" primary label="Registrar" color="#0070f3"/>
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

export default Register