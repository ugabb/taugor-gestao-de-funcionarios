'use client'

import { auth } from '../../firebase'
import { Button, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
// next
import { useRouter } from 'next/navigation'

import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {

  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const onSubmit = (logInData: any) => {
    const { email, password } = logInData
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        router.push('/')
      }).catch((error) => {
        alert("Usuário não existe!")
        console.log(error)
      })
  }

  return (
    <div className='flex flex-col justify-center items-center gap-5 h-screen'>
      <h1 className='text-3xl font-semibold text-primaryColor'>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 w-4/5 md:w-1/3 lg:w-1/4'>
        <TextField
          inputProps={{
            className: 'bg-gray-50 rounded w-full',
          }}
          required
          label="Email"
          variant="filled"
          size='small'
          type='email'
          {...register("email")}
        />
        <TextField
          inputProps={{
            className: 'bg-gray-50 rounded w-full',
          }}
          required
          label="password"
          variant="filled"
          size='small'
          type='password'
          {...register("password")}
        />

        <Button variant="outlined" type='submit'>Log In</Button>
      </form>
      <div className='text-gray-400 '>
        ou
        <Link href={'/sign-up'}><Button>Sign Up</Button></Link>
      </div>
    </div>
  )
}

export default Login