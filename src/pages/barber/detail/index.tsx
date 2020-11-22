import { Box, Button, Form, FormField, Header, Select, TextInput } from 'grommet'
import { FormPreviousLink } from 'grommet-icons';
import { NextApiResponse } from 'next';
import Head from 'next/head'
import { useCallback, useState } from 'react';

import firebase from '../../../../lib/firebase'

function OperatorRegister() {

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [barbearia, setBarbearia] = useState({});

    function handleSubmit() {
        let firebaseKey = firebase.ref().child('barbeiro').push().key
        firebase.ref('barbeiro/' + firebaseKey).set({ nome, barbearia, email, key: firebaseKey}).then((response: NextApiResponse) => {
            handleReturn()
        })
    }

    const handleReturn = useCallback(() => {
        window.location.href = '../barber'
    }, [])

    return (
        <div className="container">
            <Head>
                <title>SemFila</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header background="brand" width="100%" margin="none">
                <Button icon={<FormPreviousLink />} hoverIndicator onClick={handleReturn}/>
            </Header>
            <Box className="main" height="90vh" pad="0">
                <h1 className="title">SEM<a>FILA</a></h1>
                <Box className="grid" width="70vw" margin="0">
                    <Form
                        onReset={() => (setEmail(''), setNome(''))}
                        onSubmit={handleSubmit}
                        className="card"
                        style={{width: '40vw'}}
                    >
                        <FormField label="Nome">
                            <TextInput required type="text" value={nome} onChange={val => setNome(val.target.value)}/>
                        </FormField>
                        <FormField label="Email">
                            <TextInput  required type="email" value={email} onChange={val => setEmail(val.target.value)}/>
                        </FormField>
                        <Box direction="row" justify="evenly">
                            <Button type="submit" primary label="Salvar"/>
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

export default OperatorRegister