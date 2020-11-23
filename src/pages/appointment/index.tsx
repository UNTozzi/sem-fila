import { Box, Button, Form,  FormField, Header,  Select, TextInput } from 'grommet'
import { FormPreviousLink, Logout } from 'grommet-icons';
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react';
import cookieCutter from 'cookie-cutter'


import firebase from '../../../lib/firebase'
import { GetServerSideProps } from 'next';

interface ClienteDTO {
    email?: string,
    nome: string,
    senha?: string,
    key: string;
}

interface FuncionarioDTO {
    email?: string,
    nome: string,
    senha?: string,
    nomeBarbearia?: string,
    funcionario?: Boolean,
    key: string;
}

interface AppointmentDTO {
    cliente: ClienteDTO,
    dataAgendamento: string,
    horario: string,
    funcionario: FuncionarioDTO,
    key: string;
    status: string;
}

export default function Appointment () {
    const [funcionario, setFuncionario] = useState<FuncionarioDTO>({key: '', nome: ''});
    const [cliente, setCliente] = useState<ClienteDTO>({key: '', nome: ''});
    const [funcionarios, setFuncionarios] = useState<FuncionarioDTO[]>([]);
    const [clientes, setClientes] = useState<ClienteDTO[]>([]);
    const [dataAgendamento, setDataAgendamento] = useState('');
    const [horario, setHorario] = useState('');
    const [status, setStatus] = useState('');
    const [key, setkey] = useState('');

    useEffect(() => {
        let reference = firebase.ref('usuario/')
        reference.on('value', (snapshot) => {
            let clientToShow = []
            let values: ClienteDTO = snapshot.val()
            for (let prop in values) {
                clientToShow.push(values[prop])
            }
            setClientes(clientToShow)
        })

        reference = firebase.ref('barbeiro/')
        reference.on('value', (snapshot) => {
            let barberToShow = []
            let values: FuncionarioDTO = snapshot.val()
            for (let prop in values) {
                barberToShow.push(values[prop])
            }
            setFuncionarios(barberToShow)
        })

        let cookie = cookieCutter.get('appointmentToUpdate')
        if (cookie) {
            cookieCutter.set('appointmentToUpdate', '', { expires: new Date(0) })
            let appointmentToUpdate: AppointmentDTO = JSON.parse(cookie)
            setCliente(appointmentToUpdate.cliente)
            setFuncionario(appointmentToUpdate.funcionario)
            setDataAgendamento(appointmentToUpdate.dataAgendamento)
            setHorario(appointmentToUpdate.horario)
            setStatus(appointmentToUpdate.status)
            setkey(appointmentToUpdate.key)
        }
    }, [])

    // function listaFuncionarios () {
    //     let listaFuncionarios = []
    //     for (let func in funcionarios) {
    //         listaFuncionarios.push({lab: funcionarios[func].nome, val: funcionarios[func]});
    //     } 
    //     return listaFuncionarios
    // }

    // function listaClientes () {
    //     let listaClientes = []
    //     for (let client in clientes) {
    //         listaClientes.push(clientes[client].nome);
    //     } 
    //     return listaClientes
    // }

    // function handleUpdate () {
        
    // }

    function handleSchedule () {
        if (!key) {
            let firebaseKey = firebase.ref().child('agendamento').push().key
            console.log(funcionario)
            firebase.ref('agendamento/' + firebaseKey).set({ funcionario, cliente , key: firebaseKey, dataAgendamento, horario, status }).then((response: Response) => {
                window.location.href = '../home'
            })
        }
        else {
            firebase.ref('agendamento/' + key).set({ funcionario, cliente , key, dataAgendamento, horario, status }).then((response: Response) => {
                window.location.href = '../home'
            })
        }
    }

    const handleGoToHome = useCallback(() => {
        window.location.href = '../home'
    }, [])

    const handleLogout = useCallback(() => {
        window.location.href = '../'
    }, [])

    return (
        <div className="container">
            <Head>
                <title>SemFila</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header background="brand" width="100%" margin="none">
                <Button icon={<FormPreviousLink/>} hoverIndicator onClick={handleGoToHome}/>
                <Button icon={<Logout />} hoverIndicator onClick={handleLogout}/>
            </Header>
            <Box className="main" pad="0">
                <Form
                    onSubmit={handleSchedule}
                    style={{maxHeight: '80vh', maxWidth: '80vw', width: '80vw', margin: 0}}
                >
                    <FormField label="Funcionário">
                        <Select
                            options={funcionarios}
                            labelKey="nome"
                            valueKey="key"
                            value={funcionario}
                            onChange={({option}) => setFuncionario(option)}
                        />
                    </FormField>
                    <FormField label="Cliente">
                        <Select
                            options={clientes}
                            labelKey="nome"
                            valueKey="key"
                            value={cliente}
                            onChange={({ option }) => setCliente(option)}
                        />
                    </FormField>
                    <FormField label="Data do agendamento">
                        <TextInput type="date" value={dataAgendamento} onChange={value => setDataAgendamento(value.target.value)}/>
                    </FormField>
                    <FormField label="Horário">
                        <TextInput type="time" value={horario} onChange={value => setHorario(value.target.value)}/>
                    </FormField>
                    <FormField label="Status">
                        <Select
                            options={['Livre', 'Marcado', 'Cancelado']}
                            value={status}
                            onChange={({ option }) => setStatus(option)}
                        />
                    </FormField>
                    <Box direction="row" justify="evenly">
                        <Button type="submit" primary label="Agendar" margin={{top: '3vh'}}/>
                    </Box>
                </Form>
            </Box>
            <footer className="footer" style={{maxHeight: '10vh'}}>
                <a rel="noopener noreferrer">Powered by Fawkes</a>
            </footer>
        </div>
    )
}