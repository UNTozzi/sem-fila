import { Anchor, Box, Button, Heading, Text, TextInput } from 'grommet'
import { FormPreviousLink, Lock, Mail } from 'grommet-icons';
import Head from 'next/head'
import { FormEvent, useCallback, useState } from 'react';
import nookies, { setCookie } from 'nookies'

import firebase from '../../../lib/firebase'
import Image from 'next/image';


function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        let reference = firebase.ref('estabelecimento/')
        reference.on('value', (snapshot) => {
            let values = snapshot.val()
            for (let prop in values) {
                if (email === values[prop].email && password === values[prop].senha) {
                    setCookie(null, 'contentEstabelecimento', JSON.stringify(values[prop]), {})
                    window.location.href = '../home'
                }
            }
        })
    }
    
    const handleGoToIndex = useCallback(() => {
        window.location.href = '../'
    }, [])
    
    return (
        <Box width="100vw" height="100vh">
            <Head>
                <title>Login | SemFila</title>
                <link rel="icon" href="/sf_icon_zoom.png" />
            </Head>
            <Box direction="row" justify="evenly" align="center" fill pad="4rem">
                <Box height="50vh" width="30vw">
                    <Image src="/semfila7.png" layout="responsive" width="50%" height="20%" />
                    <Heading level="1" style={{fontWeight: "bold"}}>Faça seu login na plataforma</Heading>
                </Box>
                <Box
                height="70vh" 
                width="30vw"
                background="#202024" 
                style={{borderRadius: '5px'}}
                responsive
                >
                    <Box alignSelf="start"><Button icon={<FormPreviousLink />} hoverIndicator onClick={handleGoToIndex}/></Box>
                    <Box height="90%" direction="column" justify="evenly" pad={{horizontal: '3rem', bottom: '1rem'}}>
                        <TextInput 
                            required
                            placeholder="E-mail"
                            type="text" plain="full"
                            value={email}
                            onChange={val => setEmail(val.target.value)}
                            className="input-default"
                            icon={<Mail  size="medium" color="gray"/>}
                        />
                        <TextInput 
                            required
                            placeholder="Senha"
                            type="password" plain="full"
                            value={password}
                            onChange={val => setPassword(val.target.value)}
                            className="input-default"
                            icon={<Lock  size="medium" color="gray"/>}
                        />
                        <Button type="submit" label="Entrar" className="button-primary" onClick={handleSubmit}/>
                        <Text alignSelf="center">Não tem uma conta? faça o <Anchor href="../register" color="#7D4CDB" style={{textDecoration: 'none'}}>cadastro</Anchor></Text>
                    </Box>
                </Box>
            </Box>
        </Box>
        )
    }
    
    export default Login
    
    export async function getServerSideProps(ctx) {
        const cookies = nookies.get(ctx)
        
        return { props: { cookies } }
    }