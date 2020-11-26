import { Box, Button, Form,  FormField, Header,  Select, TextInput } from 'grommet'
import { FormPreviousLink, Logout } from 'grommet-icons';
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
    nomeBarbearia?: string,
    funcionario?: Boolean,
    key: string;
}

interface BarbeariaDTO {
    nomeBarbearia: string;
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
    barbearia: object;
}

export default function Appointment ({ cookies }) {
    const [barbearia, setBarbearia] = useState<BarbeariaDTO>({key: '', endereco: '', nomeBarbearia: ''});
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
        if(!cookies.contentBarbearia) window.location.href = '../'
        else {
            let barbeariaCookie: BarbeariaDTO = JSON.parse(cookies.contentBarbearia)
            setBarbearia({key: barbeariaCookie.key, endereco: barbeariaCookie.endereco, nomeBarbearia: barbeariaCookie.nomeBarbearia})
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

        reference = firebase.ref('barbeiro/')
        reference.on('value', (snapshot) => {
            let barberToShow = []
            let values: FuncionarioDTO = snapshot.val()
            let barbeariaCookie = JSON.parse(cookies.contentBarbearia)
            for (let prop in values) {
                if (values[prop].barbearia.key === barbeariaCookie.key) barberToShow.push(values[prop])
            }
            setFuncionarios(barberToShow)
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
            firebase.ref('agendamento/' + firebaseKey).set({ barbearia, funcionario, cliente , key: firebaseKey, dataAgendamento, horarioInicio, horarioFim, status }).then((response: Response) => {
                window.location.href = '../home'
            })
        }
        else {
            firebase.ref('agendamento/' + key).set({ barbearia, funcionario, cliente , key, dataAgendamento, horarioInicio, horarioFim, status }).then((response: Response) => {
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
            <Header background="brand" width="100%" margin="none">
                <Button icon={<FormPreviousLink/>} hoverIndicator onClick={handleGoToHome}/>
            </Header>
            <Box className="main" pad="0">
                <Form
                    onSubmit={handleSchedule}
                    style={{maxWidth: '80vw', width: '80vw', margin: 0}}
                    messages={{required: 'Obrigatório'}}
                >
                    <FormField label="Funcionário">
                        <Select
                            options={funcionarios}
                            emptySearchMessage="Nenhum barbeiro cadastrado"
                            labelKey="nome"
                            valueKey="key"
                            value={funcionario}
                            onChange={({option}) => setFuncionario(option)}
                        />
                    </FormField>
                    <FormField label="Cliente">
                        <Select
                            options={clientes}
                            emptySearchMessage="Nenhum cliente cadastrado"
                            labelKey="nome"
                            valueKey="key"
                            value={cliente}
                            onChange={({ option }) => setCliente(option)}
                        />
                    </FormField>
                    <FormField label="Data do agendamento" >
                        <TextInput type="date" value={dataAgendamento} onChange={value => setDataAgendamento(value.target.value)}/>
                    </FormField>
                    <FormField label="Começa" >
                        <TextInput type="time" value={horarioInicio} onChange={value => setHorarioInicio(value.target.value)}/>
                    </FormField>
                    <FormField label="Termina" >
                        <TextInput type="time" value={horarioFim} onChange={value => setHorarioFim(value.target.value)}/>
                    </FormField>
                    <FormField label="Status" >
                        <Select
                            options={cliente.nome ? [, 'Marcado', 'Cancelado'] : ['Livre']}
                            value={status}
                            onChange={({ option }) => setStatus(option)}
                        />
                    </FormField>
                    <Box direction="row" justify="evenly">
                        <Button type="submit" primary label="Agendar" margin={{top: '3vh'}}/>
                    </Box>
                </Form>
            </Box>
            <footer className="footer" style={{maxHeight: '10vh', marginTop: '3vh'}}>
                <a rel="noopener noreferrer">Powered by Fawkes</a>
            </footer>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx)
    return { props: { cookies } }
}