import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import ModalUpdateFuncionario from './Modals/ModalUpdateFuncionario';
import axios from 'axios';
import { BsTrash } from 'react-icons/bs';
import { useRouter } from 'next/router';


type Props = {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: Function;
    handleClick: Function;
    funcionarioID: string | undefined;
}

enum actions {
    atualizar = 'atualizar',
    promover = 'promover',

}

const MenuDrop = ({ anchorEl, open, handleClose, handleClick, funcionarioID }: Props) => {
    const [openModal, setOpenModal] = useState(false);
    const [action, setAction] = useState('');
    const handleOpen = (action: string) => {
        setOpenModal(true)
        setAction(action)
    };
    const handleCloseModal = () => {
        setOpenModal(false)
        handleClose()
    };

    const router = useRouter()

    const demitirFuncionario = async () => {
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_KEY}/fire/${funcionarioID}`)
            alert("Demitido com sucesso!")
            router.reload()
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const excluirFuncionário = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_KEY}/${funcionarioID}`)
            alert("Excluído com sucesso!")
            router.reload()
            return response
        } catch (error) {
            console.log(error)
        }
    }


    if (openModal) {
        return <ModalUpdateFuncionario funcionarioID={funcionarioID} action={action} handleCloseModal={handleCloseModal} handleOpen={handleOpen} openModal={openModal} />
    }
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose()}
        >
            <MenuItem onClick={() => handleOpen(actions.atualizar)}>Atualizar dados</MenuItem>
            <MenuItem onClick={() => handleOpen(actions.promover)}>Promover Funcinário</MenuItem>
            <MenuItem onClick={demitirFuncionario}>Terminar Contrato</MenuItem>
            <MenuItem onClick={excluirFuncionário}>Excluir Funcionário <BsTrash className="text-red-500 ml-3" /></MenuItem>
        </Menu>
    )
}

export default MenuDrop