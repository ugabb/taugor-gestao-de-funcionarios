import FormHeader from '@/components/Header/FormHeader'
import React from 'react'

//react icons
import { RiPencilFill } from 'react-icons/ri'
import { BiSolidUser } from 'react-icons/bi'
import { FaRegLightbulb } from 'react-icons/fa'
import { BsFillArrowUpCircleFill, BsToggle2Off } from 'react-icons/bs'


//material ui
import { TextField } from '@mui/material'

const index = () => {
  return (
    <div>
      <FormHeader />
      <div className="w-full h-2 bg-gray-200"></div>

      <main className='p-3 w-full'>
        <h1 className='text-xl font-bold'>Fale-nos um pouco sobre você</h1>
        <p className='text-sm'>Diga quem você é, como os empregadores podem entrar em contato com você e qual a sua profissão.</p>

        <div className="flex items-center gap-3 mt-5">
          <h2 className='text-xl font-bold'>Informação de contato</h2>
          <RiPencilFill className="text-gray-400 text-lg" />
        </div>

        <form className='flex w-full'>
          <div className='flex flex-col justify-center w-full gap-5'>
            <div className='flex flex-col gap-3'>
              <TextField
                inputProps={{
                  className: 'bg-gray-50',
                }}
                required
                label="Nome"
                variant="filled"
                size='small'
              />
              <p className='text-sm text-gray-500'>ex: Tiago</p>
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

            {/* FOTO DE PERFIL */}
            <div className='flex flex-col justify-center items-center'>
              <div className='px-5 py-10 bg-gray-50'><BiSolidUser className="text-gray-500 text-6xl" /></div>
              <div>
                <div className='flex items-center gap-3 mb-3'>
                  <p className="text-lg">Foto do Perfil</p>
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
      </main>
    </div>
  )
}

export default index