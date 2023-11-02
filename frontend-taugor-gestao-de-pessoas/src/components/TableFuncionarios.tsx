import { IFuncionario } from '@/IFuncionario'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { withStyles } from '@mui/styles';
import { BiPencil, BiTrash } from 'react-icons/bi';
import MenuDrop from './Menu';


type Props = {
    funcionariosData: IFuncionario[];
}

const TableFuncionarios = ({ funcionariosData }: Props) => {
    // const [funcionarios, setFuncionarios] = useState<any>([])

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableContainer className='max-w-xl' component={Paper}>
            {open && <MenuDrop anchorEl={anchorEl} open={open} handleClose={handleClose} handleClick={handleClick} />}
            <Table aria-label="simple table">
                <TableHead className='bg-primaryColor'>
                    <TableRow className='text-white'>
                        <TableCell className="text-white"></TableCell>
                        <TableCell className="text-white"></TableCell>
                        <TableCell className="text-white">Nome</TableCell>
                        <TableCell className="text-white">Email</TableCell>
                        <TableCell className="text-white">Cargo</TableCell>
                        {/* <TableCell className='hidden md:block text-white'>Email</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {funcionariosData.map((funcionario) => (
                        <TableRow key={funcionario?.id} className='hover:bg-primaryColor/10 transition-colors'>
                            <TableCell className='text-lg '>
                                <BiPencil onClick={handleClick} className="cursor-pointer transition-all hover:text-primaryColor" />
                            </TableCell>
                            <TableCell className='text-xs'>
                                {typeof funcionario?.contatoInfo?.profilePicture === 'string' ? <img className={`w-12`} src={funcionario?.contatoInfo?.profilePicture} alt='profile picture' /> : ''}
                            </TableCell>
                            <TableCell className='text-xs w-2'>{funcionario?.contatoInfo?.email}</TableCell>
                            <TableCell>{funcionario?.contatoInfo?.name} {funcionario?.contatoInfo?.lastName}</TableCell>
                            <TableCell>{funcionario?.funcionarioInfo?.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableFuncionarios