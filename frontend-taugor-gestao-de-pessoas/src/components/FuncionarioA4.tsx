import { IFuncionario } from '@/IFuncionario'
import React, { useEffect, useState } from 'react'

type Props = {
    funcionario: IFuncionario
    profilePicture: string;
    isRounded: boolean
}

const FuncionarioA4 = ({ funcionario, profilePicture, isRounded }: Props) => {
    const [funcionarioToRender, setfuncionarioToRender] = useState<IFuncionario>(funcionario)

    useEffect(() => {
        setfuncionarioToRender(funcionario)
    }, [funcionario])
    return (
        <section className=' bg-gray-100 flex justify-center items-center lg:w-1/2 h-screen' id='document'>
            <div className='bg-white a4 shadow-lg rounded-sm p-10 flex flex-col gap-3'>
                <div className={`without-border-top px-3 flex flex-col gap-5`}>
                    {profilePicture &&
                        <div className='flex justify-center items-center'>
                            <img className={`w-40 h-40 object-cover ${isRounded ? 'rounded-full' : ''}`} src={profilePicture} alt='profile picture' />
                        </div>
                    }
                    <div>
                        <h1 className='text-blue-600 text-xl font-bold'>{funcionarioToRender?.contatoInfo?.name} {funcionarioToRender?.contatoInfo?.lastName}</h1>
                        <p className='text-xs text-gray-500'>Telefone: {funcionarioToRender?.contatoInfo?.phone}</p>
                        <p className='text-xs text-gray-500'>email: {funcionarioToRender?.contatoInfo?.email}</p>
                        <p className='text-xs text-gray-500'>birthday: 25/12/2001</p>
                    </div>
                </div>
                <div className='border border-primaryColor px-3 '>
                    <h1 className='text-blue-600 text-xl font-bold'>Profissional:</h1>
                    <p className='text-xs text-gray-500'>Cargo: {funcionarioToRender?.funcionarioInfo?.role}</p>
                    <p className='text-xs text-gray-500'>Setor: {funcionarioToRender?.funcionarioInfo?.sector}</p>
                    <p className='text-xs text-gray-500'>Salário: {funcionarioToRender?.funcionarioInfo?.salary}</p>
                    {/* <p className='text-xs text-gray-500'>data admissao: {funcionarioToRender.funcionarioInfo.admissioDate}</p> */}
                </div>
                <div className='border border-primaryColor px-3 '>
                    <h1 className='text-blue-600 text-xl font-bold'>Endereço:</h1>
                    <p className='text-xs text-gray-500'>CEP: {funcionarioToRender?.contatoInfo?.address?.cep}</p>
                    <p className='text-xs text-gray-500'>Número: {funcionarioToRender?.contatoInfo?.address?.number}</p>
                    <p className='text-xs text-gray-500'>UF: {funcionarioToRender?.contatoInfo?.address?.uf}</p>
                </div>
            </div>
        </section>
    )
}

export default FuncionarioA4