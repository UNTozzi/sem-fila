import { Box, Button, Form, FormField, Header, TextInput } from 'grommet'
import { FormPreviousLink, Mail, User } from 'grommet-icons';
import { NextApiResponse } from 'next';
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react';
import nookies, { destroyCookie } from 'nookies'

import { BoxDetail } from '../../../../styles/pages/employee/detail/detail'
import firebase from '../../../../lib/firebase'
import Image from 'next/image';

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
                <title>Funcionário | SemFila</title>
                <link rel="icon" href="/sf_icon_zoom.png" />
            </Head>
            <BoxDetail direction="row" justify="evenly" align="center" fill pad="4rem" className="container-register">
                <Box
                    height="70vh" 
                    width="30vw"
                    background="#202024" 
                    style={{borderRadius: '5px'}}
                    responsive
                    gridArea="register"
                >
                    <Box alignSelf="start"><Button icon={<FormPreviousLink />} hoverIndicator onClick={handleReturn}/></Box>
                    <Box height="90%" direction="column" justify="evenly" pad={{horizontal: '3rem', bottom: '1rem'}}>
                        <Image src="/semfila7.png" layout="responsive" width="30%" height="10%" />
                        <TextInput 
                            required
                            placeholder="Nome"
                            type="text" plain="full"
                            value={nome}
                            onChange={val => setNome(val.target.value)}
                            className="input-default"
                            icon={<User  size="medium" color="gray"/>}
                        />
                        <TextInput 
                            required
                            placeholder="E-mail"
                            type="email" plain="full"
                            value={email}
                            onChange={val => setEmail(val.target.value)}
                            className="input-default"
                            icon={<Mail size="medium" color="gray"/>}
                        />
                        <Button type="submit" className="button-primary" label="Salvar" onClick={handleSubmit}/>
                    </Box>
                </Box>
            </BoxDetail>
        </div>
    )
    
}

export default OperatorRegister

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx)
    nookies.destroy(ctx, 'employeeToUpdate')

    return { props: { cookies } }
}