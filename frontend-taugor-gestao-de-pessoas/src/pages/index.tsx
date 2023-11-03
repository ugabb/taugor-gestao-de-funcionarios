import { useContext, useEffect, useState } from 'react'

import Link from 'next/link';

// Material UI
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import Header from '@/components/Header/Header';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

export default function Home() {
  const [authUser, setAuthUser] = useState<User | null>(null); // Inicializando com tipo 'User | null'
  const [isLoading, setIsLoading] = useState(true);


  const profile = {
    linkedinURL: 'https://www.linkedin.com/in/ugab/',
    githubURL: 'https://github.com/ugabb'
  }

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
        setIsLoading(false)
      } else {
        setAuthUser(null);
        setIsLoading(false)
      }
    })
    return () => {
      listen()
    }
  }, [])

  return (
    <div className='flex flex-col justify-center'>
      {isLoading && <Box className="flex justify-center items-center">
        <CircularProgress />
      </Box>}
      <Header />

      <main className='flex flex-col gap-3 justify-center items-center my-10'>
        <h1 className='text-5xl font-semibold text-primaryColor'>Taugor</h1>
        <h2 className='text-lg font-semibold text-gray-700'>Gerenciamento de funcionários</h2>

        {authUser ? (
          <div className="flex justify-around items-center w-full mt-10 gap-5">
            <div className='flex flex-col text-center gap-3'>
              <h3 className='font-bold text-2xl'>Bem Vindo!</h3>
              <span className='text-primaryColor'>{authUser.email}</span>
              <p className='text-sm'>Criado por <span className='text-primaryColor'>Gabriel Barros</span></p>
              <div className="flex justify-center text-3xl gap-5">
                <Link href={profile.githubURL} target='_blank'>
                  <BsGithub className="text-gray-800 hover:text-gray-600 hover:scale-105" />
                </Link>
                <Link href={profile.linkedinURL} target='_blank'>
                  <BsLinkedin className="text-primaryColor hover:text-primaryColor/80 hover:scale-105" />
                </Link>
              </div>
            </div>
            <div className='flex flex-col text-center gap-3'>
              <img className='w-[400px] h-[400px] object-cover rounded-full' src="https://images.unsplash.com/photo-1560250056-07ba64664864?auto=format&fit=crop&q=80&w=1451&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-3'>
            <Link href={'/login'}>
              <Button variant="outlined" type='submit' size="large">
                Log In
              </Button>
            </Link>
            <div>
              <p>
                Ou faça
                <Link href={'/sign-up'}>
                  <Button variant="text" type='submit' size='small'>
                    Sign Up
                  </Button>
                </Link>
              </p>
            </div>
          </div>
        )}

      </main>

    </div>
  )
}
