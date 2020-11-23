import { Box, Button, DataTable, Header } from 'grommet'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react';
import cookieCutter from 'cookie-cutter'

import firebase from '../../../lib/firebase'

import { Close, Logout, Update, User } from 'grommet-icons'

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

    const handleUpdate = useCallback((appointment) => {
        cookieCutter.set('appointmentToUpdate', JSON.stringify(appointment))
        window.location.href = '../appointment'
    }, [])

    const handleDelete = useCallback((key) => {
        firebase.ref('agendamento/' + key).remove()
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
        <div className="container" style={{maxWidth: '100vw'}}>
            <Head>
                <title>SemFila</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header background="brand" width="100%" margin="none">
                <Button icon={<User />} hoverIndicator label="Barbeiros" onClick={handleGoToBarber} style={{border: '0'}}/>
                <Button icon={<Logout />} hoverIndicator onClick={handleLogout}/>
            </Header>
            <Box className="main" pad="0" height="90vh" justify="start" margin={{top: '3vh'}}>
                <Button alignSelf="end" style={{color: "white"}} onClick={handleGoToAppointment} label="Agendar novo horário"/>
                <Box className="grid" direction="column" style={{maxWidth: '100vw', overflowX: 'auto'}}>
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
                </Box>
            </Box>
            <footer className="footer">
                <a rel="noopener noreferrer">Powered by Fawkes</a>
            </footer>
        </div>
    )
    
}

export default Appointment
