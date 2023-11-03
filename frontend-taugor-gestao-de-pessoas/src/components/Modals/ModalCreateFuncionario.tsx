import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IFuncionario } from '@/IFuncionario';
import { useState } from 'react';
import { useRouter } from 'next/router';

type Prop = {
    handleOpen: Function
    handleClose: Function
    open: boolean
    createFuncionario: Function
    funcionario: IFuncionario;
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const ModalCreateFuncionario = ({ funcionario, open, handleClose, createFuncionario }: Prop) => {
    const router = useRouter();
    const closeModal = () => {
        createFuncionario(funcionario)
        handleClose()
        alert("Funcionário criado com sucesso")
        router.push('/listar-funcionarios');
    }
    return (
        <Modal
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="flex flex-col gap-5">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Deseja realmente salvar funcionário?
                </Typography>
                <div className="flex justify-center">
                    <Button onClick={closeModal}>Sim</Button>
                    <Button onClick={() => handleClose()} color='error'>Não</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ModalCreateFuncionario