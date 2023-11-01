import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import ModalUpdateFuncionario from './Header/ModalUpdateFuncionario';

type Props = {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: Function;
    handleClick: Function;
}

const MenuDrop = ({ anchorEl, open, handleClose, handleClick }: Props) => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false)
        handleClose()
    };

    if (openModal) {
        return <ModalUpdateFuncionario handleCloseModal={handleCloseModal} handleOpen={handleOpen} openModal={openModal} />
    }
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose()}
        >
            <MenuItem onClick={() => handleOpen()}>Atualizar dados</MenuItem>
            <MenuItem onClick={() => handleClose()}>Terminar Contrato</MenuItem>
        </Menu>
    )
}

export default MenuDrop