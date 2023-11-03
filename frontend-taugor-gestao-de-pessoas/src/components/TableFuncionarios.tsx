import { IFuncionario } from '@/IFuncionario'
import React, { useContext, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BiPencil, BiTrash } from 'react-icons/bi';
import MenuDrop from './MenuDrop';
import { BsFilePdf } from 'react-icons/bs';
import Link from 'next/link';
import { FuncionarioContext } from '@/context/FuncionarioContext';
import Image from 'next/image';


const TableFuncionarios = () => {
    const [funcionarioID, setFuncionarioID] = useState<string | undefined>('')

    const { funcionariosData } = useContext(FuncionarioContext)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: string | undefined) => {
        setAnchorEl(event.currentTarget);
        setFuncionarioID(id)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableContainer className='max-w-3xl' component={Paper}>
            {open && <MenuDrop funcionarioID={funcionarioID} anchorEl={anchorEl} open={open} handleClose={handleClose} handleClick={handleClick} />}
            <Table aria-label="simple table">
                <TableHead className='bg-primaryColor'>
                    <TableRow className='text-white'>
                        <TableCell className="text-white"></TableCell>
                        <TableCell className="text-white w-40 min-w-full"></TableCell>
                        <TableCell className="text-white">Nome</TableCell>
                        <TableCell className="text-white">Email</TableCell>
                        <TableCell className="text-white">Cargo</TableCell>
                        <TableCell className="text-white">Status</TableCell>
                        <TableCell className="text-white">PDF</TableCell>
                        {/* <TableCell className='hidden md:block text-white'>Email</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {funcionariosData.map((funcionario: IFuncionario) => (
                        <TableRow key={funcionario?.id} className='hover:bg-primaryColor/10 transition-colors'>
                            <TableCell className='text-xl'>
                                <BiPencil onClick={(e: any) => handleClick(e, funcionario?.id)} className="cursor-pointer transition-all hover:text-primaryColor" />
                            </TableCell>
                            <TableCell>
                                {typeof funcionario?.contatoInfo?.profilePicture === 'string' ? <Image width={1000} height={1000}  className={`w-12 h-12 object-cover rounded-full`} src={funcionario?.contatoInfo?.profilePicture} alt='profile picture' /> : ''}
                            </TableCell>
                            <TableCell>{funcionario?.contatoInfo?.name} {funcionario?.contatoInfo?.lastName}</TableCell>
                            <TableCell className='text-xs w-2'>{funcionario?.contatoInfo?.email}</TableCell>
                            <TableCell>{funcionario?.funcionarioInfo?.role}</TableCell>
                            <TableCell>{funcionario?.funcionarioInfo?.isFired ? "Demitido" : "Ativo"}</TableCell>
                            <TableCell className='text-lg'>
                                {funcionario?.funcionarioPDF &&
                                    <Link href={funcionario?.funcionarioPDF} target='_blank'>
                                        <BsFilePdf className={`hover:text-primaryColor cursor-pointer`} />
                                    </Link>
                                }

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableFuncionarios