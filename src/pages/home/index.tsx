import { Box, Button, DataTable, Header } from 'grommet'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react';

import firebase from '../../../lib/firebase'

import { Logout, User } from 'grommet-icons'

interface AppointmentDTO {
    cliente: ClienteDTO,
    dataAgendamento: string,
    horario: string,
    funcionario: FuncionarioDTO,
    key: string;
    status: string;
}

interface ClienteDTO {
    email: string,
    nome: string,
    senha: string,
    key: string;
}

interface FuncionarioDTO {
    email: string,
    nome: string,
    senha: string,
    nomeBarbearia: string,
    funcionario: Boolean,
    key: string;
}

function Appointment () {
    const [appointments, setAppointments] = useState([]);
    
    const handleGoToAppointment = useCallback(() => {
        window.location.href = '../appointment'
    }, [])

    const handleLogout = useCallback(() => {
        window.location.href = '../'
    }, [])
    
    const handleGoToBarber = useCallback(() => {
        window.location.href = '../barber'
    }, [])

    useEffect(() => {
        let reference = firebase.ref('agendamento/')
        reference.on('value', (snapshot) => {
            let appointmentToShow = []
            let values = snapshot.val()
            for (let prop in values) {
                appointmentToShow.push(values[prop])
            }
            setAppointments(appointmentToShow)
        })
    }, [])

    return (
        <div className="container">
            <Head>
                <title>SemFila</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header background="brand" width="100%" margin="none">
                <Button icon={<User />} hoverIndicator label="Barbeiros" onClick={handleGoToBarber} style={{border: '0'}}/>
                <Button icon={<Logout />} hoverIndicator onClick={handleLogout}/>
            </Header>
            <Box className="main" pad="0" height="90vh" width="90vw" justify="start" margin={{top: '3vh'}}>
                <Button alignSelf="end" style={{color: "white"}} onClick={handleGoToAppointment} label="Agendar novo horário"/>
                <Box className="grid" direction="column">
                    <DataTable
                        style={{width: '70vw'}}
                        primaryKey={false}
                        onClickRow={(data) => console.log(data.datum)}
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
                            },
                            {
                                property: 'cliente',
                                header: 'Cliente',
                                align: 'center'
                            },
                            {
                                property: 'dataAgendamento',
                                header: 'Data de Agendamento',
                                align: 'center'
                            },
                            {
                                property: 'horario',
                                header: 'Horário',
                                align: 'end'
                            },
                            {
                                property: 'status',
                                header: 'Status',
                                align: 'end'
                            }
                        ]}
                        data={appointments}
                    />
                </Box>
            </Box>
            <footer className="footer">
                <a rel="noopener noreferrer">Powered by Fawkes</a>
            </footer>
        </div>
    )
    
}

export default Appointment
