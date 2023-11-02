import { IFuncionario } from '@/IFuncionario'
import Header from '@/components/Header/Header'
import TableFuncionarios from '@/components/TableFuncionarios'
import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const index = () => {
    const [funcionarios, setFuncionarios] = useState<IFuncionario[]>([])


    const getFuncionarios = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/funcionario')
            const data = await response.json()
            console.log(data)
            setFuncionarios(data.funcionarios)
            return data
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getFuncionarios()
    }, [])

    return (
        <div className='flex flex-col gap-5'>
            <Header />

            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold text-primaryColor'>Listar funcionarios</h1>
                <TableFuncionarios funcionariosData={funcionarios}></TableFuncionarios>
            </div>
        </div>
    )
}

export default index