import { Box, Button, Form, FormField, Header, TextInput } from 'grommet'
import { FormPreviousLink } from 'grommet-icons';
import { NextApiResponse } from 'next';
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react';
import nookies, { destroyCookie } from 'nookies'



import firebase from '../../../../lib/firebase'

interface BarbeiroDTO {
    email: string,
    nome: string,
    key: string;
}

function OperatorRegister({cookies}) {

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [key, setKey] = useState('');
    const [barbearia, setBarbearia] = useState({});

    function handleSubmit() {
        if (!key) {
            let firebaseKey = firebase.ref().child('barbeiro').push().key
            firebase.ref('barbeiro/' + firebaseKey).set({ nome, barbearia, email, key: firebaseKey}).then((response: NextApiResponse) => {
                handleReturn()
            })
        }
        else {
            firebase.ref('barbeiro/' + key).set({ nome, barbearia, email, key}).then((response: NextApiResponse) => {
                handleReturn()
            })
        }
    }

    const handleReturn = useCallback(() => {
        window.location.href = '../barber'
    }, [])

    useEffect(() => {
        let cookie = cookies.barberToUpdate
        destroyCookie(null, 'barberToUpdate')
        if (cookie) {
            let barberToUpdate: BarbeiroDTO = JSON.parse(cookie)
            setNome(barberToUpdate.nome)
            setEmail(barberToUpdate.email)
            setKey(barberToUpdate.key)
        }
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
                <Box className="grid" margin="0">
                    <Form
                        onReset={() => (setEmail(''), setNome(''))}
                        onSubmit={handleSubmit}
                        className="card"
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

export async function getServerSideProps(ctx) {
    // Parse
    const cookies = nookies.get(ctx)

    // Set
      // nookies.set(ctx, 'barberToUpdate', 'value', {
      //     maxAge: 30 * 24 * 60 * 60,
      //     path: '/',
      // })

    // Destroy
    nookies.destroy(ctx, 'barberToUpdate')

    console.log(nookies)

    return { props: { cookies } }
}