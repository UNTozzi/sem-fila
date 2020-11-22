import { Box, Button, Form, FormField, Header, TextInput } from 'grommet'
import { FormPreviousLink } from 'grommet-icons';
import Head from 'next/head'
import { useCallback, useState } from 'react';

import firebase from '../../../lib/firebase'

function Register() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [endereco, setEndereco] = useState('');
    const [nomeBarbearia, setNomeBarbearia] = useState('');

    function handleSubmit() {
        let firebaseKey = firebase.ref().child('barbearia').push().key
        firebase.ref('barbearia/' + firebaseKey).set({ endereco, nomeBarbearia, email, senha, key: firebaseKey }).then((response: Response) => {
            window.location.href = '../login/'
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
            <Box className="main" height="90vh" pad="0">
                <h1 className="title">SEM<a>FILA</a></h1>
                <Box className="grid" width="70vw" margin="0">
                    <Form
                        onReset={() => (setSenha(''), setEmail(''), setEndereco(''), setNomeBarbearia(''))}
                        onSubmit={handleSubmit}
                        className="card"
                        style={{width: '40vw'}}
                    >
                        <FormField label="Nome do estabelecimento">
                            <TextInput required type="text" value={nomeBarbearia} onChange={val => setNomeBarbearia(val.target.value)}/>
                        </FormField>
                        <FormField label="Endereço">
                            <TextInput required type="text" value={endereco} onChange={val => setEndereco(val.target.value)}/>
                        </FormField>
                        <FormField label="Email">
                            <TextInput  required type="email" value={email} onChange={val => setEmail(val.target.value)}/>
                        </FormField>
                        <FormField label="Senha">
                            <TextInput required type="password" value={senha} onChange={val => setSenha(val.target.value)}/>
                        </FormField>
                        <Box direction="row" justify="evenly">
                            <Button type="submit" primary label="Registrar"/>
                            <Button type="reset" label="Limpar"/>
                        </Box>
                    </Form>
                </Box>
            </Box>
        
            <footer className="footer">
                <a rel="noopener noreferrer">Powered by Fawkes</a>
            </footer>
        </div>
    )
    
}

export default Register