import FormHeader from '@/components/Header/FormHeader'
import React from 'react'
import { RiPencilFill } from 'react-icons/ri'
import { BiSolidUser } from 'react-icons/bi'

//material ui
import { TextField } from '@mui/material'

const index = () => {
  return (
    <div>
      <FormHeader />
      <div className="w-full h-2 bg-gray-200"></div>

      <main className='p-3'>
        <h1 className='text-xl font-bold'>Fale-nos um pouco sobre você</h1>
        <p className='text-sm'>Diga quem você é, como os empregadores podem entrar em contato com você e qual a sua profissão.</p>

        <form >
          <div className="flex items-center gap-3 mt-5">
            <h2 className='text-xl font-bold'>Informação de contato</h2>
            <RiPencilFill className="text-gray-400 text-lg" />
          </div>

          <div className='flex flex-col  justify-center items-center'>

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

            <div>
              <div className='p-10 bg-gray-50'><BiSolidUser className="text-gray-500" /></div>
              <div>
                <p>Foto do Perfil</p>
              </div>
            </div>

          </div>
        </form>
      </main>
    </div>
  )
}

export default index