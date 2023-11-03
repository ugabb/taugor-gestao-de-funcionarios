import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { useForm, SubmitHandler } from 'react-hook-form'
import { IFuncionario } from '@/IFuncionario';
import { BsToggle2Off } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { BiSolidUser } from 'react-icons/bi';
import axios from 'axios';

import { storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import ModalConfirmUpdate from './ModalConfirmUpdate';
import Image from 'next/image';

type Props = {
    openModal: boolean;
    handleOpen: Function
    handleCloseModal: Function
    action: string;
    funcionarioID: string | undefined;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const initialFuncionarioState: IFuncionario = {
    id: '',
    contatoInfo: {
        name: '',
        lastName: '',
        email: '',
        gender: '',
        address: {
            cep: '',
            logradouro: '',
            number: 0,
            uf: '',
        },
        phone: '',
        profilePicture: '',
        birthday: new Date()
    },
    funcionarioInfo: {
        role: '',
        admissioDate: new Date(),
        sector: '',
        salary: 0,
    },
    funcionarioPDF: '',
    histories: { user: '' }
};

const ModalUpdateFuncionario = ({ openModal, handleOpen, handleCloseModal, action, funcionarioID }: Props) => {
    const [funcionario, setFuncionario] = useState<IFuncionario>(initialFuncionarioState)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFuncionario>()

    const handleGetFuncionarioById = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/${funcionarioID}`)
            const data = response.data
            setFuncionario(data.funcionarios)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetFuncionarioById()
    }, [])
    useEffect(() => {
        if (funcionario) {
            setValue("contatoInfo.name", funcionario.contatoInfo.name);
            setValue("contatoInfo.lastName", funcionario.contatoInfo.lastName);
            setValue("contatoInfo.address.cep", funcionario.contatoInfo.address.cep);
            setValue("contatoInfo.address.number", funcionario.contatoInfo.address.number);
            setValue("contatoInfo.address.uf", funcionario.contatoInfo.address.uf);
            setValue("contatoInfo.address.logradouro", funcionario.contatoInfo.address.logradouro);
            setValue("contatoInfo.phone", funcionario.contatoInfo.phone);
            setValue("contatoInfo.email", funcionario.contatoInfo.email);
            setValue("contatoInfo.gender", funcionario.contatoInfo.gender);
            setValue("contatoInfo.birthday", funcionario.contatoInfo.birthday);
            setValue("funcionarioInfo.role", funcionario.funcionarioInfo.role);
            setValue("funcionarioInfo.sector", funcionario.funcionarioInfo.sector);
            setValue("funcionarioInfo.salary", funcionario.funcionarioInfo.salary);
        }
    }, [funcionario]);

    const onSubmit: SubmitHandler<IFuncionario> = (funcionarioData: IFuncionario) => {
        setFuncionario(funcionarioData)
        // uploadImage()
        handleOpenConfirm()
    }

    const updateFuncionario = async (funcionarioData: IFuncionario, id: string) => {
        try {
            const response = await axios.patch<IFuncionario>(`${process.env.NEXT_PUBLIC_API_KEY}/${id}`, funcionarioData);
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    //  imagem
    const [isRounded, setIsRounded] = useState<boolean>(false);
    const handleRounded = () => {
        setIsRounded(prev => !prev)
    }


    // modal
    const [open, setOpen] = React.useState(false);
    const handleOpenConfirm = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={openModal}
            onClose={() => handleCloseModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {/* ATUALIZAR */}
                {action == 'atualizar' && <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center w-full gap-5'>

                    <div className="flex flex-col md:flex-row md:gap-5 w-full">
                        <div className='flex flex-col lg:gap-5 lg:w-1/2'>
                            <div className='w-full flex flex-col'>
                                <div className='flex flex-col w-full'>
                                    <label>Nome:</label>
                                    <input defaultValue={funcionario?.contatoInfo?.name} {...register("contatoInfo.name", { required: true })} type='text' className='input' placeholder='Nome' />
                                    {errors.contatoInfo?.name && <span className='text-red-500 text-xs'>Nome é obrigatório</span>}
                                </div>
                                <p className='text-xs text-gray-500'>ex: Tiago</p>
                            </div>
                            <div className='w-full flex flex-col'>
                                <div className='flex flex-col w-full'>
                                    <label>Sobrenome:</label>
                                    <input defaultValue={funcionario?.contatoInfo?.lastName} {...register("contatoInfo.lastName", { required: true })} type='text' className='input' placeholder='Sobrenome' />
                                    {errors.contatoInfo?.lastName && <span className='text-red-500 text-xs'>Sobrenome é obrigatório</span>}
                                </div>
                                <p className='text-xs text-gray-500'>ex: Souza</p>
                            </div>
                        </div>

                        {/* FOTO DE PERFIL */}
                        <div className='flex flex-col md:flex-row justify-center  lg:gap-3 lg:w-1/2'>
                            <div className={`h-full flex justify-center items-center  rounded-md`}>
                                {funcionario?.contatoInfo?.profilePicture ? (
                                    <div className='flex flex-col gap-3'>
                                        {typeof funcionario?.contatoInfo?.profilePicture == 'string' && <Image width={1000} height={1000} src={funcionario?.contatoInfo?.profilePicture} alt="Selected" className={`h-40 w-40 object-cover ${isRounded ? 'rounded-full' : ''}`} />}
                                        <div className='flex items-center gap-3'>
                                            {isRounded ? <BsToggle2Off onClick={handleRounded} className="text-3xl text-primaryColor cursor-pointer rotate-180" /> : <BsToggle2Off onClick={handleRounded} className="text-3xl text-gray-400 cursor-pointer" />}
                                            <p className="text-sm">Foto Redonda</p>
                                        </div>
                                    </div>
                                ) : (
                                    <BiSolidUser className="text-gray-300 text-6xl" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 w-full'>
                        <div className="w-full flex flex-col gap-3">
                            <div className="flex flex-col md:flex-row gap-3 w-full">
                                <div className='flex flex-col w-full'>
                                    <label>CEP:</label>
                                    <input defaultValue={funcionario?.contatoInfo?.address?.cep} {...register("contatoInfo.address.cep", { required: true })} type='text' className='input w-full' placeholder='CEP' />
                                    {errors.contatoInfo?.address?.cep && <span className='text-red-500 text-xs'>CEP é obrigatório</span>}
                                </div>
                                <div className="flex gap-3">
                                    <div className='flex flex-col w-full'>
                                        <label>Número:</label>
                                        <input defaultValue={funcionario?.contatoInfo?.address?.number} {...register("contatoInfo.address.number", { required: true, valueAsNumber: true })} type='text' className='input w-full' placeholder='Número' />
                                        {errors.contatoInfo?.address?.number && <span className='text-red-500 text-xs'>Número é obrigatório</span>}
                                    </div>

                                    <div className='flex flex-col w-full'>
                                        <label>UF:</label>
                                        <input defaultValue={funcionario?.contatoInfo?.address?.uf} {...register("contatoInfo.address.uf", { required: true })} type='text' className='input w-full' placeholder='UF' />
                                        {errors.contatoInfo?.address?.uf && <span className='text-red-500 text-xs'>UF é obrigatório</span>}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label>Logradouro:</label>
                                <input defaultValue={funcionario?.contatoInfo?.address?.logradouro} {...register("contatoInfo.address.logradouro", { required: true })} type='text' className='input' placeholder='Logradouro' />
                                {errors.contatoInfo?.address?.logradouro && <span className='text-red-500 text-xs'>Logadouro é obrigatório</span>}
                            </div>
                            <p className='text-xs text-gray-500'>ex: Rua 5 de Gotham City</p>
                        </div>


                        <div className='flex flex-col justify-center w-full gap-3'>
                            <div className='flex flex-col gap-3'>
                                <div className='w-full flex flex-col'>
                                    <div className="flex gap-3">
                                        <div className='flex flex-col w-full'>
                                            <label>Telefone:</label>
                                            <input defaultValue={funcionario?.contatoInfo?.phone} {...register("contatoInfo.phone", { required: true })} type='text' className='input w-full' placeholder='Telefone' />
                                            {errors.contatoInfo?.phone && <span className='text-red-500 text-xs'>Telefone é obrigatório</span>}
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label>Email:</label>
                                            <input defaultValue={funcionario?.contatoInfo?.email} {...register("contatoInfo.email", { required: true })} type='email' className='input w-full' placeholder='Email' />
                                            {errors.contatoInfo?.email && <span className='text-red-500 text-xs'>Email é obrigatório</span>}
                                        </div>

                                        <div className='flex flex-col w-full'>
                                            <label>Gênero:</label>
                                            <select value={funcionario?.contatoInfo?.gender}  {...register("contatoInfo.gender", { required: true })} type='text' className='input w-full' placeholder='Gênero'  >
                                                <option value="">-- Selecione</option>
                                                <option value="masculino">Masculino</option>
                                                <option defaultValue="feminino">Feminino</option>
                                            </select>
                                            {errors.contatoInfo?.gender && <span className='text-red-500 text-xs'>Gênero é obrigatório</span>}
                                        </div>
                                    </div>
                                    <p className='text-xs text-gray-500'>ex: Souza</p>
                                </div>
                                <div className='w-full flex flex-col'>
                                    <div className="flex gap-3">
                                        <div className='flex flex-col w-full'>
                                            <label>Data de Nascimento:</label>
                                            <input defaultValue={funcionario?.contatoInfo?.birthday} {...register("contatoInfo.birthday", { required: true })} type='date' className='input w-full' placeholder='Data de Nascimento' />
                                            {errors.contatoInfo?.birthday && <span className='text-red-500 text-xs'>Data de Nascimento é obrigatório</span>}
                                        </div>
                                    </div>
                                    <p className='text-xs text-gray-500'>ex: Souza</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button type='submit' variant='outlined' onClick={handleOpenConfirm}>Salvar</Button>
                </form>}

                {/* PROMOVER */}
                {action == 'promover' && <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center w-full gap-5'>
                    <div className='flex flex-col gap-3 w-full'>
                        <div className='flex flex-col justify-center w-full gap-3'>
                            <div className="w-full flex flex-col">
                                <div className="flex flex-col md:flex-row gap-3">
                                    <div className='flex flex-col w-full'>
                                        <label>Cargo:</label>
                                        <input defaultValue={funcionario?.funcionarioInfo?.role} {...register("funcionarioInfo.role", { required: true })} type='text' className={`input value={funcionario.contatoInfo}  `} placeholder='Cargo' />
                                        {errors.funcionarioInfo?.role && <span className='text-red-500 text-xs'>Cargo é obrigatório</span>}
                                    </div>

                                    <div className='flex flex-col w-full'>
                                        <label>Setor:</label>
                                        <input defaultValue={funcionario?.funcionarioInfo?.sector} {...register("funcionarioInfo.sector", { required: true })} type='text' className='input value={funcionario.contatoInfo} w-full' placeholder='Setor' />
                                        {errors.funcionarioInfo?.sector && <span className='text-red-500 text-xs'>Setor é obrigatório</span>}
                                    </div>

                                    <div className='flex flex-col w-full'>
                                        <label>Salário:</label>
                                        <input defaultValue={funcionario?.funcionarioInfo?.salary} {...register("funcionarioInfo.salary", { required: true, valueAsNumber: true })} type='text' className='input w-full' placeholder='Salário' />
                                        {errors.funcionarioInfo?.salary && <span className='text-red-500 text-xs'>Salário é obrigatório</span>}
                                    </div>
                                </div>
                                <p className='text-xs text-gray-500'>ex: Coordenador</p>
                            </div>
                        </div>
                    </div>

                    <Button type='submit' variant='outlined'>Salvar</Button>
                </form>}
                {!Object.keys(errors).length && (open) && <ModalConfirmUpdate funcionarioID={funcionarioID} funcionario={funcionario} updateFuncionario={updateFuncionario} handleClose={handleClose} handleOpen={handleOpenConfirm} open={open} />}
            </Box>


        </Modal>
    )
}

export default ModalUpdateFuncionario