import FormHeader from '@/components/Header/FormHeader'
import React from 'react'

//react icons
import { RiPencilFill } from 'react-icons/ri'
import { BiSolidUser } from 'react-icons/bi'
import { FaRegLightbulb } from 'react-icons/fa'
import { BsToggle2Off } from 'react-icons/bs'
import { AiOutlineArrowUp } from 'react-icons/ai'


//material ui
import { Button, TextField } from '@mui/material'

import { useForm } from 'react-hook-form'



const index = () => {
  const { register } = useForm()



  return (
    <div >
      <FormHeader />
      <div className="w-full h-2 bg-gray-200"></div>

      <main className='p-3 md:p-10 w-full flex flex-col lg:flex-row lg:gap-5 lg:p-10 lg:max-w-7xl lg:mx-auto'>
        <div className='lg:w-1/2 my-3 md:my-0'>
          <h1 className='text-xl font-bold'>Fale-nos um pouco sobre você</h1>
          <p className='text-sm text-gray-500'>Diga quem você é, como os empregadores podem entrar em contato com você e qual a sua profissão.</p>

          <div className="flex items-center gap-3 my-5">
            <h2 className='text-xl font-bold'>Informação de contato</h2>
            <RiPencilFill className="text-gray-400 text-lg" />
          </div>
          <form className='flex flex-col justify-center w-full gap-5'>

            <div className="flex flex-col md:flex-row md:gap-5 w-full">
              <div className='flex flex-col lg:gap-5 lg:w-1/2'>
                <div className='w-full flex flex-col'>
                  <input type='text' className='input' placeholder='Nome' />
                  <p className='text-xs text-gray-500'>ex: Tiago</p>
                </div>
                <div className='w-full flex flex-col'>
                  <input type='text' className='input' placeholder='Sobrenome' />
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
              <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row gap-3">
                  <input type='text' className='input w-full' placeholder='Cargo' />
                  <input type='text' className='input w-full' placeholder='Setor' />
                  <input type='text' className='input w-full' placeholder='Salário' />
                </div>
                <p className='text-xs text-gray-500'>ex: Coordenador</p>
              </div>

              <div className="w-full flex flex-col gap-3">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                  <input type='text' className='input w-full' placeholder='CEP' />
                  <div className="flex gap-3">
                    <input type='text' className='input w-full' placeholder='Número' />
                    <input type='text' className='input w-full' placeholder='UF' />
                  </div>
                </div>
                <input type='text' className='input' placeholder='Logradouro' />
                <p className='text-xs text-gray-500'>ex: Rua 5 de Gotham City</p>
              </div>


              <div className='flex flex-col justify-center w-full gap-3'>
                <div className='flex flex-col gap-3'>
                  <div className='w-full flex flex-col'>
                    <div className="flex gap-3">
                      <input type='text' className='input w-full' placeholder='Telefone' />
                      <input type='email' className='input w-full' placeholder='Email' />
                    </div>
                    <p className='text-xs text-gray-500'>ex: Souza</p>
                  </div>
                  <div className='w-full flex flex-col'>
                    <div className="flex gap-3">
                      <input type='text' className='input w-full' placeholder='Nacionalidade' />
                      <input type='date' className='input w-full' placeholder='Data de Nascimento' />
                    </div>
                    <p className='text-xs text-gray-500'>ex: Souza</p>
                  </div>
                </div>
              </div>
            </div>

            <Button className='' variant='outlined'>Salvar</Button>
          </form>
        </div>


        <div className=' bg-gray-100 flex justify-center items-center lg:w-1/2 h-screen'>
          <div className='bg-white a4 shadow-lg rounded-sm p-10 flex flex-col gap-3'>
            <div className='without-border-top px-3 '>
              <h1 className='text-primaryColor text-xl'>Gabriel Barros</h1>
              <p className='text-xs text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id nobis enim ratione quisquam neque temporibus, quia impedit dignissimos quos facilis eligendi error quo ipsum amet illum repellat ad, possimus explicabo!</p>
            </div>
            <div className='border border-primaryColor px-3 '>
              <h1 className='text-primaryColor text-xl'>Gabriel Barros</h1>
              <p className='text-xs text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id nobis enim ratione quisquam neque temporibus, quia impedit dignissimos quos facilis eligendi error quo ipsum amet illum repellat ad, possimus explicabo!</p>
            </div>
            <div className='border border-primaryColor px-3 '>
              <h1 className='text-primaryColor text-xl'>Gabriel Barros</h1>
              <p className='text-xs text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id nobis enim ratione quisquam neque temporibus, quia impedit dignissimos quos facilis eligendi error quo ipsum amet illum repellat ad, possimus explicabo!</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default index