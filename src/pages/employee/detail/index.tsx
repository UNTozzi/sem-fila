import { Box, Button, Form, FormField, Header, TextInput } from 'grommet'
import { FormPreviousLink } from 'grommet-icons';
import { NextApiResponse } from 'next';
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react';
import nookies, { destroyCookie } from 'nookies'



import firebase from '../../../../lib/firebase'

interface FuncionarioDTO {
    email: string,
    nome: string,
    key: string;
}
interface EstabelecimentoDTO {
    endereco: string;
    key: string
}

function OperatorRegister({cookies}) {

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [key, setKey] = useState('');
    const [estabelecimento, setEstabelecimento] = useState<EstabelecimentoDTO>({key: '', endereco: ''});

    function handleSubmit() {
        if (!key) {
            let firebaseKey = firebase.ref().child('funcionario').push().key
            firebase.ref('funcionario/' + firebaseKey).set({ nome, estabelecimento, email, key: firebaseKey}).then((response: NextApiResponse) => {
                handleReturn()
            })
        }
        else {
            firebase.ref('funcionario/' + key).set({ nome, estabelecimento, email, key}).then((response: NextApiResponse) => {
                handleReturn()
            })
        }
    }

    const handleReturn = useCallback(() => {
        window.location.href = '../employee'
    }, [])

    useEffect(() => {
        if(!cookies.contentEstabelecimento) window.location.href = '../'
        else {
            let estabelecimentoCookie: EstabelecimentoDTO = JSON.parse(cookies.contentEstabelecimento)
            setEstabelecimento({key: estabelecimentoCookie.key, endereco: estabelecimentoCookie.endereco})
        }
        let cookie = cookies.employeeToUpdate
        destroyCookie(null, 'employeeToUpdate')
        if (cookie) {
            let employeeToUpdate: FuncionarioDTO = JSON.parse(cookie)
            setNome(employeeToUpdate.nome)
            setEmail(employeeToUpdate.email)
            setKey(employeeToUpdate.key)
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
    const cookies = nookies.get(ctx)
    nookies.destroy(ctx, 'employeeToUpdate')

    return { props: { cookies } }
}