import { Box, Button, Form,  FormField, Header,  Select, TextInput } from 'grommet'
import { Calendar, Clock, Close, FormPreviousLink, Logout } from 'grommet-icons';
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react';
import nookies, { destroyCookie } from 'nookies'

import firebase from '../../../lib/firebase'
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
    nomeEstabelecimento?: string,
    funcionario?: Boolean,
    key: string;
}

interface EstabelecimentoDTO {
    nomeEstabelecimento: string;
    endereco: string;
    key: string
}
interface AppointmentDTO {
    cliente: ClienteDTO,
    dataAgendamento: string,
    horarioInicio: string,
    horarioFim: string,
    funcionario: FuncionarioDTO,
    key: string;
    status: string;
    estabelecimento: object;
}

export default function Appointment ({ cookies }) {
    const [estabelecimento, setEstabelecimento] = useState<EstabelecimentoDTO>({key: '', endereco: '', nomeEstabelecimento: ''});
    const [funcionario, setFuncionario] = useState<FuncionarioDTO>({key: '', nome: ''});
    const [cliente, setCliente] = useState<ClienteDTO>({key: '', nome: ''});
    const [funcionarios, setFuncionarios] = useState<FuncionarioDTO[]>([]);
    const [clientes, setClientes] = useState<ClienteDTO[]>([]);
    const [dataAgendamento, setDataAgendamento] = useState('');
    const [horarioInicio, setHorarioInicio] = useState('');
    const [horarioFim, setHorarioFim] = useState('');
    const [status, setStatus] = useState('');
    const [key, setkey] = useState('');

    useEffect(() => {
        if(!cookies.contentEstabelecimento) window.location.href = '../'
        else {
            let estabelecimentoCookie: EstabelecimentoDTO = JSON.parse(cookies.contentEstabelecimento)
            setEstabelecimento({key: estabelecimentoCookie.key, endereco: estabelecimentoCookie.endereco, nomeEstabelecimento: estabelecimentoCookie.nomeEstabelecimento})
        }
        let reference = firebase.ref('usuario/')
        reference.on('value', (snapshot) => {
            let clientToShow = []
            let values: ClienteDTO = snapshot.val()
            for (let prop in values) {
                clientToShow.push(values[prop])
            }
            setClientes(clientToShow)
        })

        reference = firebase.ref('funcionario/')
        reference.on('value', (snapshot) => {
            let employeeToShow = []
            let values: FuncionarioDTO = snapshot.val()
            let estabelecimentoCookie = JSON.parse(cookies.contentEstabelecimento)
            for (let prop in values) {
                if (values[prop].estabelecimento.key === estabelecimentoCookie.key) employeeToShow.push(values[prop])
            }
            setFuncionarios(employeeToShow)
        })

        let cookie = cookies.appointmentToUpdate
        if (cookie) {
            destroyCookie(null, 'appointmentToUpdate')
            let appointmentToUpdate: AppointmentDTO = JSON.parse(cookie)
            setCliente(appointmentToUpdate.cliente)
            setFuncionario(appointmentToUpdate.funcionario)
            setDataAgendamento(appointmentToUpdate.dataAgendamento)
            setHorarioInicio(appointmentToUpdate.horarioInicio)
            setHorarioFim(appointmentToUpdate.horarioFim)
            setStatus(appointmentToUpdate.status)
            setkey(appointmentToUpdate.key)
        }
    }, [])

    function handleSchedule () {
        if (!key) {
            let firebaseKey = firebase.ref().child('agendamento').push().key
            console.log(funcionario)
            firebase.ref('agendamento/' + firebaseKey).set({ estabelecimento, funcionario, cliente , key: firebaseKey, dataAgendamento, horarioInicio, horarioFim, status }).then((response: Response) => {
                window.location.href = '../home'
            })
        }
        else {
            firebase.ref('agendamento/' + key).set({ estabelecimento, funcionario, cliente , key, dataAgendamento, horarioInicio, horarioFim, status }).then((response: Response) => {
                window.location.href = '../home'
            })
        }
    }

    const handleGoToHome = useCallback(() => {
        window.location.href = '../home'
    }, [])

    return (
        <div className="container">
            <Head>
                <title>SemFila</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box
                width="30vw"
                background="#202024" 
                style={{borderRadius: '5px'}}
                responsive
                gridArea="register"
            >
                <Box alignSelf="start"><Button icon={<FormPreviousLink />} hoverIndicator onClick={handleGoToHome}/></Box>
                <Box height="90%" direction="column" justify="evenly" pad={{horizontal: '3rem', bottom: '1rem'}}>
                    Funcionário
                    <Box margin={{vertical: '1vh'}}>
                        <Select
                            placeholder="Funcionário"
                            options={funcionarios}
                            emptySearchMessage="Nenhum funcionário cadastrado"
                            labelKey="nome"
                            valueKey="key"
                            value={funcionario}
                            onChange={({option}) => setFuncionario(option)}
                        />
                    </Box>
                    Cliente
                    <Box margin={{vertical: '1vh'}}>
                        <Select
                            placeholder="Cliente"
                            options={clientes}
                            emptySearchMessage="Nenhum cliente cadastrado"
                            labelKey="nome"
                            valueKey="key"
                            value={cliente}
                            onChange={({ option }) => setCliente(option)}
                        />
                    </Box>
                    Data do Agendamento
                    <Box margin={{vertical: '1vh'}}>
                        <TextInput
                            required
                            placeholder="Data do Agendamento"
                            type="date" plain="full"
                            value={dataAgendamento}
                            onChange={val => setDataAgendamento(val.target.value)}
                            className="input-default"
                            icon={<Calendar  size="medium" color="gray"/>}
                        />
                    </Box>
                    Começa
                    <Box margin={{vertical: '1vh'}}>
                        <TextInput 
                            required
                            placeholder="Começa"
                            type="time" plain="full"
                            value={horarioInicio}
                            onChange={val => setHorarioInicio(val.target.value)}
                            className="input-default"
                            icon={<Clock  size="medium" color="gray"/>}
                        />
                    </Box>
                    Termina
                    <Box margin={{vertical: '1vh'}}>
                        <TextInput 
                            required
                            placeholder="Termina"
                            type="time" plain="full"
                            value={horarioFim}
                            onChange={val => setHorarioFim(val.target.value)}
                            className="input-default"
                            icon={<Clock  size="medium" color="gray"/>}
                        />
                    </Box>
                    Status
                    <Select
                        options={cliente.nome ? ['Marcado', 'Cancelado'] : ['Livre']}
                        value={status}
                        onChange={({ option }) => setStatus(option)}
                    />
                    <Button type="submit" className="button-primary" label="Agendar" onClick={handleSchedule} style={{marginTop: '3vh'}}/>
                </Box>
            </Box>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx)
    return { props: { cookies } }
}