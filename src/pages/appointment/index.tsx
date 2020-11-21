import { Box, Button, DateInput, Form,  FormField, MaskedInput, Select, TextInput } from 'grommet'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react';

import firebase from '../../../lib/firebase'

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
    const [funcionario, setFuncionario]: FuncionarioDTO = useState({});
    const [cliente, setCliente]: ClienteDTO = useState({});
    const [funcionarios, setFuncionarios]: FuncionarioDTO = useState([]);
    const [clientes, setClientes]: ClienteDTO = useState([]);
    const [dataAgendamento, setDataAgendamento] = useState('');
    const [horario, setHorario] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        let reference = firebase.ref('user/')
        reference.on('value', (snapshot) => {
            let operatorsToShow = []
            let clientToShow = []
            let values: FuncionarioDTO | ClienteDTO = snapshot.val()
            for (let prop in values) {
                if (values[prop].funcionario === true) operatorsToShow.push(values[prop])
                else clientToShow.push(values[prop])
            }
            setFuncionarios(operatorsToShow)
            setClientes(clientToShow)
        })
    }, [])

    function listaFuncionarios () {
        let listaFuncionarios = []
        for (let func in funcionarios) {
            listaFuncionarios.push(funcionarios[func].nome);
        } 
        return listaFuncionarios
    }

    function listaClientes () {
        let listaClientes = []
        for (let client in clientes) {
            listaClientes.push(funcionarios[client].nome);
        } 
        return listaClientes
    }

    function handleSchedule () {
        let firebaseKey = firebase.ref().child('appointment').push().key
        if (cliente === {}) setCliente('NENHUM')
        firebase.ref('appointment/' + firebaseKey).set({ funcionario, cliente , key: firebaseKey, dataAgendamento, horario, status }).then((response: Response) => {
            window.location.href = '../home'
        })
    }

    return (
        <div className="container">
            <Head>
                <title>SemFila</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Form
                onSubmit={handleSchedule}
                className="card"
                style={{maxHeight: '80vh', maxWidth: '80vw', width: '80vw', margin: 0}}
            >
                <FormField label="Funcionário">
                    <Select
                        options={listaFuncionarios()}
                        value={funcionario}
                        valueKey={funcionario.key}
                        valueLabel={funcionario.nome}
                        onChange={({ option }) => {setFuncionario(option); console.log(option)}}
                    />
                </FormField>
                <FormField label="Cliente">
                    <Select
                        options={listaClientes()}
                        value={cliente}
                        valueKey={cliente.key}
                        valueLabel={cliente.nome}
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
                    <Button type="submit" primary label="Agendar" color="#0070f3"/>
                </Box>
            </Form>
            <footer className="footer" style={{maxHeight: '10vh'}}>
                <a rel="noopener noreferrer">Powered by Fawkes</a>
            </footer>
        </div>
    )
    
}

export default Appointment
