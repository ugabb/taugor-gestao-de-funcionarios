import { useEffect, useState } from 'react'

import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';

// Material UI
import { Button, TextField } from '@mui/material'

export default function Home() {

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null);
      }
    })
    return () => {
      listen()
    }
  }, [])

  return (
    <div className='flex flex-col justify-center items-center gap-5 h-screen'>
      <h1 className='text-3xl font-semibold text-primaryColor'>Taugor</h1>
      <h2 className='text-xl font-semibold text-primaryColor'>Gerenciamento de funcionários</h2>

      {
        authUser ?
          <div>
            <h3>Bem Vindo</h3>
            <p>Gerenciar Funcionários</p>
          </div>
          :
          <>
            <Link href={'/login'}>
              <Button variant="outlined" type='submit' size="large">Log In</Button>
            </Link>
            <div>
              <p>Ou faça <Link href={'/sign-up'}>
                <Button variant="text" type='submit' size='small'>Sign Up</Button>
              </Link></p>
            </div>
          </>
      }



    </div>
  )
}
