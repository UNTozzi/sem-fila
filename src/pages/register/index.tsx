import { Anchor, Box, Button, Heading, Text, TextInput } from 'grommet'
import { FormPreviousLink, Lock, Mail, Map, Organization } from 'grommet-icons';
import Head from 'next/head'
import { useCallback, useState } from 'react';
import Image from 'next/image'

import { BoxRegister } from '../../../styles/pages/register/register'
import firebase from '../../../lib/firebase'

function Register() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [endereco, setEndereco] = useState('');
    const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');

    function handleSubmit() {
        let firebaseKey = firebase.ref().child('estabelecimento').push().key
        firebase.ref('estabelecimento/' + firebaseKey).set({ endereco, nomeEstabelecimento, email, senha, key: firebaseKey }).then((response: Response) => {
            window.location.href = '../login/'
        })
    }

    const handleGoToIndex = useCallback(() => {
        window.location.href = '../'
    }, [])

    return (
        <Box width="100vw" height="100vh">
            <Head>
                <title>Registro | SemFila</title>
                <link rel="icon" href="/sf_icon_zoom.png" />
            </Head>
            <BoxRegister direction="row" justify="evenly" align="center" fill pad="4rem" className="container-register">
                <Box
                    height="70vh" 
                    width="30vw"
                    background="#202024" 
                    style={{borderRadius: '5px'}}
                    responsive
                    gridArea="register"
                >
                    <Box alignSelf="start"><Button icon={<FormPreviousLink />} hoverIndicator onClick={handleGoToIndex}/></Box>
                    <Box height="90%" direction="column" justify="evenly" pad={{horizontal: '3rem', bottom: '1rem'}}>
                        <Text size="medium" weight="bold" margin={{bottom: '1vh'}}>Crie sua conta</Text>
                        <TextInput 
                            required
                            placeholder="Nome do estabelecimento"
                            type="text" plain="full"
                            value={nomeEstabelecimento}
                            onChange={val => setNomeEstabelecimento(val.target.value)}
                            className="input-default"
                            icon={<Organization  size="medium" color="gray"/>}
                        />
                        <TextInput 
                            required
                            placeholder="Endereço"
                            type="text" plain="full"
                            value={endereco}
                            onChange={val => setEndereco(val.target.value)}
                            className="input-default"
                            icon={<Map size="medium" color="gray"/>}
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
                        <TextInput 
                            required
                            placeholder="Senha"
                            type="password" plain="full"
                            value={senha}
                            onChange={val => setSenha(val.target.value)}
                            className="input-default"
                            icon={<Lock  size="medium" color="gray"/>}
                        />
                        <Button type="submit" label="Registrar" className="button-primary" onClick={handleSubmit}/>
                        <Text alignSelf="center">Já tem uma conta? faça o <Anchor href="../login" color="#7D4CDB" style={{textDecoration: 'none'}}>login</Anchor></Text>
                    </Box>
                </Box>
                <Box height="50vh" width="30vw" gridArea="text">
                    <Image src="/semfila7.png" layout="responsive" width="50%" height="100%" />
                    <Heading level="3">Ta cansado de ter o filas de cliente cobrando para serem atendidos?</Heading>
                    <Heading level="5" color="grey">Junte-se a nós e começe a ganhar tempo com agendamentos prévios!</Heading>
                </Box>
            </BoxRegister>
        </Box>
    )
    
}

export default Register