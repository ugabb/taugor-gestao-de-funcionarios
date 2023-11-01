import { IFuncionario } from '@/IFuncionario'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { withStyles } from '@mui/styles';
import { BiPencil, BiTrash } from 'react-icons/bi';


type Props = {
    funcionariosData: IFuncionario[];
}

const TableFuncionarios = ({ funcionariosData }: Props) => {
    // const [funcionarios, setFuncionarios] = useState<any>([])
    return (
        <TableContainer className='max-w-xl' component={Paper}>
            <Table aria-label="simple table">
                <TableHead className='bg-primaryColor'>
                    <TableRow className='text-white'>
                        <TableCell className="text-white"></TableCell>
                        <TableCell className="text-white">ID</TableCell>
                        <TableCell className="text-white">Nome</TableCell>
                        {/* <TableCell className='hidden md:block text-white'>Email</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {funcionariosData.map((funcionario) => (
                        <TableRow key={funcionario?.id}>
                            <TableCell className='text-lg '><BiPencil className="cursor-pointer transition-all hover:text-primaryColor" /></TableCell>
                            <TableCell className='text-xs w-2'>{funcionario?.id}</TableCell>
                            <TableCell>{funcionario?.contatoInfo?.name} {funcionario?.contatoInfo?.lastName}</TableCell>
                            {/* <TableCell className='hidden md:block'>{funcionario?.contatoInfo?.email}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableFuncionarios