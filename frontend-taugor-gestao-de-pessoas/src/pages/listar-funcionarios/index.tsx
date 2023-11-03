import { IFuncionario } from '@/IFuncionario'
import Header from '@/components/Header/Header'
import TableFuncionarios from '@/components/TableFuncionarios'
import { FuncionarioContext } from '@/context/FuncionarioContext'
import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

// Material UI
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ListarFuncionarios = () => {
    const [funcionariosData, setFuncionarios] = useState<IFuncionario[]>([])
    const [loading, setloading] = useState(false)


    const getFuncionarios = async () => {
        try {
            setloading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}`)
            const data = await response.json()
            setFuncionarios(data.funcionarios)
            setloading(false)
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

            {loading ?
                <Box className="flex justify-center items-center mt-20">
                    <CircularProgress />
                </Box> :
                <FuncionarioContext.Provider value={{ funcionariosData }}>
                    <div className='flex flex-col justify-center items-center p-5'>
                        <h1 className='text-3xl font-bold text-primaryColor flex items-center gap-3'>Listar funcionarios <span className='text-lg text-gray-500'>({funcionariosData?.length})</span></h1>
                        <TableFuncionarios />
                    </div>
                </FuncionarioContext.Provider>
            }

        </div>
    )
}

export default ListarFuncionarios