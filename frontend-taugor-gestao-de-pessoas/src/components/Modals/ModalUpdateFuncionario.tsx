import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useForm, SubmitHandler } from 'react-hook-form'
import { IFuncionario } from '@/IFuncionario';
import { FaRegLightbulb } from 'react-icons/fa';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { BsToggle2Off } from 'react-icons/bs';
import { useState } from 'react';
import { BiSolidUser } from 'react-icons/bi';

type Props = {
    openModal: boolean;
    handleOpen: Function
    handleCloseModal: Function
    action: string;
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
        profilePicture: 'https://s2-techtudo.glbimg.com/O--gZc3kmXYYKUb5nXhEWtoU1E8=/0x0:3840x2160/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/c/O/OheNpSSWqaq6RXE6Sojg/marvels-spider-man-2-20231008205118.jpg',
        birthday: new Date()
    },
    funcionarioInfo: {
        role: '',
        admissioDate: new Date(),
        sector: '',
        salary: 0,
    },
};

const ModalUpdateFuncionario = ({ openModal, handleOpen, handleCloseModal, action }: Props) => {
    const [funcionario, setFuncionario] = useState<IFuncionario>(initialFuncionarioState)
    const { register, handleSubmit, formState: { errors } } = useForm<IFuncionario>()


    const onSubmit: SubmitHandler<IFuncionario> = (funcionarioData: IFuncionario) => {
        console.log("Funcionario DATA: ", funcionarioData)
        setFuncionario(funcionarioData)
        handleOpen()
    }
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
                                    <input {...register("contatoInfo.name", { required: false })} type='text' className='input' placeholder='Nome' />
                                    {errors.contatoInfo?.name && <span className='text-red-500 text-xs'>Nome é obrigatório</span>}
                                </div>
                                <p className='text-xs text-gray-500'>ex: Tiago</p>
                            </div>
                            <div className='w-full flex flex-col'>
                                <div className='flex flex-col w-full'>
                                    <input {...register("contatoInfo.lastName", { required: false })} type='text' className='input' placeholder='Sobrenome' />
                                    {errors.contatoInfo?.lastName && <span className='text-red-500 text-xs'>Sobrenome é obrigatório</span>}
                                </div>
                                <p className='text-xs text-gray-500'>ex: Souza</p>
                            </div>
                        </div>

                        {/* FOTO DE PERFIL */}
                        <div className='flex flex-col md:flex-row justify-center  lg:gap-3 lg:w-1/2'>
                            <div className='px-5 py-10 h-full flex justify-center items-center bg-gray-50 rounded-md'><BiSolidUser className="text-gray-300 text-6xl" /></div>
                            <div>
                                <div className='flex items-center gap-3 mb-3'>
                                    <p className="">Foto do Perfil</p>
                                    <div className='rounded-full p-1 bg-gray-200'>
                                        <FaRegLightbulb className="text-gray-400" />
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-full p-1 bg-blue-500'>
                                        <AiOutlineArrowUp className="text-white" />
                                    </div>
                                    <p className="text-sm">Adicionar Foto</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <BsToggle2Off className="text-3xl text-gray-400" />
                                    <p className="text-sm">Foto Redonda</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='flex flex-col gap-3 w-full'>

                        <div className="w-full flex flex-col gap-3">
                            <div className="flex flex-col md:flex-row gap-3 w-full">
                                <div className='flex flex-col w-full'>
                                    <input {...register("contatoInfo.address.cep", { required: false })} type='text' className='input w-full' placeholder='CEP' />
                                    {errors.contatoInfo?.address?.cep && <span className='text-red-500 text-xs'>CEP é obrigatório</span>}
                                </div>
                                <div className="flex gap-3">
                                    <div className='flex flex-col w-full'>
                                        <input {...register("contatoInfo.address.number", { required: false, valueAsNumber: true })} type='number' className='input w-full' placeholder='Número' />
                                        {errors.contatoInfo?.address?.number && <span className='text-red-500 text-xs'>Número é obrigatório</span>}
                                    </div>

                                    <div className='flex flex-col w-full'>
                                        <input {...register("contatoInfo.address.uf", { required: false })} type='text' className='input w-full' placeholder='UF' />
                                        {errors.contatoInfo?.address?.uf && <span className='text-red-500 text-xs'>UF é obrigatório</span>}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full'>
                                <input {...register("contatoInfo.address.logradouro", { required: false })} type='text' className='input' placeholder='Logradouro' />
                                {errors.contatoInfo?.address?.logradouro && <span className='text-red-500 text-xs'>Logadouro é obrigatório</span>}
                            </div>
                            <p className='text-xs text-gray-500'>ex: Rua 5 de Gotham City</p>
                        </div>


                        <div className='flex flex-col justify-center w-full gap-3'>
                            <div className='flex flex-col gap-3'>
                                <div className='w-full flex flex-col'>
                                    <div className="flex gap-3">
                                        <div className='flex flex-col w-full'>
                                            <input {...register("contatoInfo.phone", { required: false })} type='text' className='input w-full' placeholder='Telefone' />
                                            {errors.contatoInfo?.phone && <span className='text-red-500 text-xs'>Telefone é obrigatório</span>}
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <input {...register("contatoInfo.email", { required: false })} type='email' className='input w-full' placeholder='Email' />
                                            {errors.contatoInfo?.email && <span className='text-red-500 text-xs'>Email é obrigatório</span>}
                                        </div>

                                        <div className='flex flex-col w-full'>
                                            <select {...register("contatoInfo.gender", { required: false })} type='text' className='input w-full' placeholder='Gênero'  >
                                                <option value="">-- Selecione</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="feminino">Feminino</option>
                                            </select>
                                            {errors.contatoInfo?.gender && <span className='text-red-500 text-xs'>Gênero é obrigatório</span>}
                                        </div>
                                    </div>
                                    <p className='text-xs text-gray-500'>ex: Souza</p>
                                </div>
                                <div className='w-full flex flex-col'>
                                    <div className="flex gap-3">
                                        <div className='flex flex-col w-full'>
                                            <input {...register("funcionarioInfo.admissioDate", { required: false })} type='date' className='input w-full' placeholder='Data de Admissão' />
                                            {errors.funcionarioInfo?.admissioDate && <span className='text-red-500 text-xs'>Data de Admissão é obrigatório</span>}
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <input {...register("contatoInfo.birthday", { required: false })} type='date' className='input w-full' placeholder='Data de Nascimento' />
                                            {errors.contatoInfo?.birthday && <span className='text-red-500 text-xs'>Data de Nascimento é obrigatório</span>}
                                        </div>
                                    </div>
                                    <p className='text-xs text-gray-500'>ex: Souza</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button type='submit' variant='outlined'>Salvar</Button>
                </form>}

                {/* PROMOVER */}
                {action == 'promover' && <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center w-full gap-5'>
                    <div className='flex flex-col gap-3 w-full'>
                        <div className='flex flex-col justify-center w-full gap-3'>
                            <div className="w-full flex flex-col">
                                <div className="flex flex-col md:flex-row gap-3">
                                    <div className='flex flex-col w-full'>
                                        <input {...register("funcionarioInfo.role", { required: true })} type='text' className={`input  `} placeholder='Cargo' />
                                        {errors.funcionarioInfo?.role && <span className='text-red-500 text-xs'>Cargo é obrigatório</span>}
                                    </div>

                                    <div className='flex flex-col w-full'>
                                        <input {...register("funcionarioInfo.sector", { required: true })} type='text' className='input w-full' placeholder='Setor' />
                                        {errors.funcionarioInfo?.sector && <span className='text-red-500 text-xs'>Setor é obrigatório</span>}
                                    </div>

                                    <div className='flex flex-col w-full'>
                                        <input {...register("funcionarioInfo.salary", { required: true, valueAsNumber: true })} type='number' className='input w-full' placeholder='Salário' />
                                        {errors.funcionarioInfo?.salary && <span className='text-red-500 text-xs'>Salário é obrigatório</span>}
                                    </div>
                                </div>
                                <p className='text-xs text-gray-500'>ex: Coordenador</p>
                            </div>
                        </div>
                    </div>

                    <Button type='submit' variant='outlined'>Salvar</Button>
                </form>}
            </Box>
        </Modal>
    )
}

export default ModalUpdateFuncionario