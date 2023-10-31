import FormHeader from '@/components/Header/FormHeader'
import React from 'react'

//react icons
import { RiPencilFill } from 'react-icons/ri'
import { BiSolidUser } from 'react-icons/bi'
import { FaRegLightbulb } from 'react-icons/fa'
import { BsFillArrowUpCircleFill, BsToggle2Off } from 'react-icons/bs'


//material ui
import { TextField } from '@mui/material'
import { getServerSideProps } from 'next/dist/build/templates/pages'

const index = () => {
  return (
    <div>
      <FormHeader />
      <div className="w-full h-2 bg-gray-200"></div>

      <main className='p-3 w-full lg:flex lg:gap-5 lg:p-10'>
        <div className='w-1/2'>
          <h1 className='text-xl font-bold'>Fale-nos um pouco sobre você</h1>
          <p className='text-sm'>Diga quem você é, como os empregadores podem entrar em contato com você e qual a sua profissão.</p>

          <div className="flex items-center gap-3 my-5">
            <h2 className='text-xl font-bold'>Informação de contato</h2>
            <RiPencilFill className="text-gray-400 text-lg" />
          </div>
          <form className='flex w-4/5'>
            <div className='flex flex-col justify-center w-full gap-5'>
              <div className="flex w-full">
                <div className='flex flex-col lg:gap-5 lg:w-1/2'>
                  <div className='w-full flex flex-col'>
                    <TextField
                      style={{ border: 'none' }}
                      inputProps={{
                        className: 'bg-gray-50 border-none underline-none',
                      }}
                      required
                      label="Nome"
                      variant="filled"
                      size='small'
                    />
                    <p className='text-sm text-gray-500'>ex: Tiago</p>
                  </div>
                  <div className='w-full flex flex-col'>
                    <TextField
                      className='bg-gray-50'
                      required
                      label="Sobrenome"
                      variant="filled"
                      size='small'
                      inputProps={{
                        className: 'bg-gray-50'
                      }}
                    />
                    <p className='text-sm text-gray-500'>ex: Souza</p>
                  </div>
                </div>

                {/* FOTO DE PERFIL */}
                <div className='flex flex-col lg:flex-row justify-center  lg:gap-3 lg:w-1/2'>
                  <div className='px-5 py-10 h-full flex justify-center items-center bg-gray-50 rounded-md'><BiSolidUser className="text-gray-300 text-6xl" /></div>
                  <div>
                    <div className='flex items-center gap-3 mb-3'>
                      <p className="">Foto do Perfil</p>
                      <div className='rounded-full bg-gray-200'>
                        <FaRegLightbulb className="text-gray-400 p-3" />
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='rounded-full bg-blue-400'>
                        <BsFillArrowUpCircleFill className="text-white p-3" />
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
                <TextField
                  inputProps={{
                    className: 'bg-gray-50',
                  }}
                  required
                  label="Emprego"
                  variant="filled"
                  size='small'
                />
                <TextField
                  inputProps={{
                    className: 'bg-gray-50',
                  }}
                  required
                  label="Endereço"
                  variant="filled"
                  size='small'
                />

                <div className='flex flex-col justify-center w-full gap-3'>
                  <div className='flex flex-col gap-3'>
                    <TextField
                      inputProps={{
                        className: 'bg-gray-50',
                      }}
                      required
                      label="telefone"
                      variant="filled"
                      size='small'
                    />
                    <TextField
                      inputProps={{
                        className: 'bg-gray-50',
                      }}
                      required
                      label="E-mail"
                      variant="filled"
                      size='small'
                    />
                  </div>
                  <div className='flex flex-col gap-3'>
                    <TextField
                      inputProps={{
                        className: 'bg-gray-50',
                      }}
                      required
                      label="Nacionalidade"
                      variant="filled"
                      size='small'
                    />
                    <TextField
                      inputProps={{
                        className: 'bg-gray-50',
                      }}
                      required
                      label="Data de Nascimento"
                      variant="filled"
                      size='small'
                    />
                  </div>
                </div>
              </div>

            </div>
          </form>
        </div>


        <div className=' bg-gray-100 flex justify-center items-center w-1/2 h-screen'>
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