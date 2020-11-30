import { Box, Button, DataTable, Header } from 'grommet'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react';
import nookies, { destroyCookie } from 'nookies'


import firebase from '../../../lib/firebase'

import { Close, FormPreviousLink, Logout, Update, UserAdd } from 'grommet-icons'

function Barber ({cookies}) {
    const [employees, setBarbers] = useState([]);
    
    const handleGoToDetail = useCallback(() => {
        window.location.href = '../employee/detail'
    }, [])

    const handleLogout = useCallback(() => {
        destroyCookie(null, 'contentEstabelecimento')
        window.location.href = '../'
    }, [])
    
    const handleGoToHome = useCallback(() => {
        window.location.href = '../home'
    }, [])

    const handleUpdate = useCallback((employee) => {
        nookies.set(null, 'employeeToUpdate', JSON.stringify(employee), {})
        window.location.href = '../employee/detail'
    }, [])

    const handleDelete = useCallback((key) => {
        firebase.ref('funcionario/' + key).remove()
    }, [])

    useEffect(() => {
        if(!cookies.contentEstabelecimento) window.location.href = '../'
        let reference = firebase.ref('funcionario/')
        reference.on('value', (snapshot) => {
            let employeesToShow = []
            let values = snapshot.val()
            let estabelecimentoCookie = JSON.parse(cookies.contentEstabelecimento)
            for (let prop in values) {
                if (values[prop].estabelecimento.key === estabelecimentoCookie.key) employeesToShow.push(values[prop])
            }
            setBarbers(employeesToShow)
        })
    }, [])

    return (
        <div className="container">
            <Head>
                <title>SemFila</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header background="brand" width="100%" margin="none">
                <Button icon={<FormPreviousLink />} hoverIndicator onClick={handleGoToHome}/>
                <Button icon={<Logout />} hoverIndicator onClick={handleLogout}/>
            </Header>
            <Box className="main" pad="0" height="90vh" justify="start" margin={{top: '3vh'}}>
                <Button icon={<UserAdd color="white" />} alignSelf="end" style={{color: "white"}} onClick={handleGoToDetail} label="Novo Funcionario"/>
                <Box className="grid" direction="column">
                    <DataTable
                        style={{width: '70vw'}}
                        primaryKey={false}
                        border={{
                            header: {
                                side: "bottom",
                                color: "#7D4CDB"
                            },
                        }}
                        columns={[
                            {
                                property: 'nome',
                                header: 'Nome',
                            },
                            {
                                property: 'email',
                                header: 'Email',
                                align: 'center'
                            },
                            {
                                property: '',
                                header: '',
                                align: 'end',
                                render: datum => (
                                    <Box direction="row">
                                        <Button icon={<Update color="#7D4CDB" />} onClick={ () => handleUpdate(datum) } />
                                        <Button icon={<Close color="#7D4CDB" />} onClick={() => handleDelete(datum.key)} />
                                    </Box>
                                )
                            }
                        ]}
                        data={employees}
                    />
                </Box>
            </Box>
            <footer className="footer">
                <a rel="noopener noreferrer">Powered by Fawkes</a>
            </footer>
        </div>
    )
    
}

export default Barber


export async function getServerSideProps(ctx) {
    nookies.destroy(ctx, 'employeeToUpdate')
    const cookies = nookies.get(ctx)

    return { props: { cookies } }
}