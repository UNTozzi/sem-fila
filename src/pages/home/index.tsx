import { Box, Button, DataTable, Header, Text } from 'grommet'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react';
import nookies, { destroyCookie, setCookie } from 'nookies'

import { BoxHome, Card } from '../../../styles/pages/home/home'
import firebase from '../../../lib/firebase'

import { Add, Close, Logout, Update, User } from 'grommet-icons'

function Appointment ({ cookies }) {
    const [appointments, setAppointments] = useState([]);
    
    const handleGoToAppointment = useCallback(() => {
        window.location.href = '../appointment'
    }, [])

    const handleLogout = useCallback(() => {
        destroyCookie(null, 'contentEstabelecimento')
        window.location.href = '../'
    }, [])
    
    const handleGoToBarber = useCallback(() => {
        window.location.href = '../employee'
    }, [])

    const handleUpdate = useCallback((appointment) => {
        setCookie(null, 'appointmentToUpdate', JSON.stringify(appointment), {})
        window.location.href = '../appointment'
    }, [])

    const handleDelete = useCallback((key) => {
        firebase.ref('agendamento/' + key).remove()
    }, [])

    useEffect(() => {
        if(!cookies.contentEstabelecimento) window.location.href = '../'
        let reference = firebase.ref('agendamento/')
        reference.on('value', (snapshot) => {
            let appointmentToShow = []
            let values = snapshot.val()
            let estabelecimentoCookie = JSON.parse(cookies.contentEstabelecimento)
            for (let prop in values) {
                if (values[prop].estabelecimento.key === estabelecimentoCookie.key) appointmentToShow.push(values[prop])
            }
            setAppointments(appointmentToShow)
        })
    }, [])

    return (
        <div>
            <Head>
                <title>Home | SemFila</title>
                <link rel="icon" href="./sf_icon_zoom.png" />
            </Head>
            <Header background="#202024" width="100vw" margin="none">
                <Button icon={<User />} hoverIndicator label="Funcionários" onClick={handleGoToBarber} style={{border: '0'}}/>
                <Button icon={<Logout />} hoverIndicator onClick={handleLogout}/>
            </Header>
            <BoxHome height="90vh" margin={{top: '3vh'}} direction="column">
                <Box style={{alignItems: 'flex-end'}} alignSelf="center" width="90vw"><Button className="button-primary" onClick={handleGoToAppointment} label="Novo Agendamento"/></Box>
                <Card>
                    <DataTable
                        style={{ overflowX: 'scroll' }}
                        primaryKey={false}
                        border={{
                            header: {
                                side: "bottom",
                                color: "#7D4CDB"
                            },
                        }}
                        columns={[
                            {
                                property: 'funcionario',
                                header: 'Funcionário',
                                align: 'start',
                                render: datum => datum.funcionario.nome 
                            },
                            {
                                property: 'cliente',
                                header: 'Cliente',
                                align: 'center',
                                render: datum => datum.cliente.nome || <Text color="#7D4CDB">Nenhum</Text>
                            },
                            {
                                property: 'endereco',
                                header: 'Endereço',
                                align: 'center',
                                render: datum => datum.estabelecimento.endereco || <Text color="#7D4CDB">Sem registro</Text>
                            },
                            {
                                property: 'dataAgendamento',
                                header: 'Data de Agendamento',
                                align: 'center'
                            },
                            {
                                property: 'horarioInicio',
                                header: 'Começa',
                                align: 'center'
                            },
                            {
                                property: 'horarioFim',
                                header: 'Termina',
                                align: 'center'
                            },
                            {
                                property: 'status',
                                header: 'Status',
                                align: 'end'
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
                        data={appointments}
                    />
                </Card>
            </BoxHome>
        </div>
    )
    
}

export default Appointment

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx)
    return { props: { cookies } }
}