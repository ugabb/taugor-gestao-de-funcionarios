import { Button } from '@mui/material'
import React, { useEffect } from 'react'

const index = () => {

    const getFuncionarios = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/funcionario')
            const data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFuncionarios()
    }, [])

    return (
        <div>
            <h1>Listar funcionarios</h1>
        </div>
    )
}

export default index