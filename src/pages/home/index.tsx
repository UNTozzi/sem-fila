import { Box, Button, DataTable, Form,  FormField, MaskedInput, Select, Text } from 'grommet'
import Head from 'next/head'
import { useCallback, useEffect, useRef, useState } from 'react';

import firebase from '../../../lib/firebase'

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
    
    useEffect(() => {
        let reference = firebase.ref('appointment/')
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
        
            <main className="main" style={{maxHeight: '90vh'}}>
                <Box className="grid" direction="column">
                    <DataTable
                        margin={{bottom:'3vh'}}
                        columns={[
                            {
                                property: 'funcionario',
                                header: 'Funcionário',
                                primary: true,
                            },
                            {
                                property: 'cliente',
                                header: 'Cliente',
                                primary: true,
                            },
                            {
                                property: 'dataAgendamento',
                                header: 'Data de Agendamento',
                                primary: true,
                            },
                            {
                                property: 'horario',
                                header: 'Horário',
                                primary: true,
                            },
                            {
                                property: 'status',
                                header: 'Status',
                                primary: true,
                            }
                        ]}
                        data={appointments}
                    />
                    {/* <ul style={{listStyle: 'none', width: '80vw'}} className="card list-style-none">
                        {appointments.map((appointment: AppointmentDTO, index) => {
                            return(
                                <>
                                    <li key={index} className="text-decoration-none">
                                        <Box direction="column">
                                            <Text>
                                                Cliente: {appointment.cliente}
                                            </Text>
                                            <Text>
                                                Funcionário: {appointment.funcionario}
                                            </Text>
                                            <Text>
                                                Data Marcada: {appointment.dataAgendamento}
                                            </Text>
                                            <Text>
                                                Horario: {appointment.horario}
                                            </Text>
                                            <Text>
                                                Status: {appointment.status}
                                            </Text>
                                        </Box>
                                    </li>
                                    <br/>
                                </>
                            )
                        })}
                    </ul> */}
                    <Button style={{color: "white"}} onClick={handleGoToAppointment} label="Agendar novo horário"/>
                </Box>
            </main>
            <footer className="footer">
                <a rel="noopener noreferrer">Powered by Fawkes</a>
            </footer>
        </div>
    )
    
}

export default Appointment
