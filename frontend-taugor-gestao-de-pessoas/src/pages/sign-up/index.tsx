import React, { useState } from 'react'

// firebase auth
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase.js'

// Material UI
import { Button, TextField } from '@mui/material'

// hook forms
import { useForm } from 'react-hook-form'


interface ISignUp {
    email: string;
    password: string;
    confirmPassword: string;
}

const index = () => {
    // criar loading...

    const { register, handleSubmit } = useForm()

    const onSubmit = (signUpData: any) => {
        if (signUpData.password !== signUpData.confirmPassword) {
            alert("Senhas não são iguais")

        } else {
            const { email, password } = signUpData
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    alert("Usuário cadastrado com Sucesso")
                    return (
                        <div>
                            <h1>Cadastrado com Sucesso</h1>
                        </div>
                    )
                    console.log(userCredentials)
                }).catch((error) => {
                    console.log(error)
                    alert("Email já em uso")
                    return (
                        <div>
                            <h1>Cadastrado com Sucesso</h1>
                        </div>
                    )
                })


            console.log(signUpData)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center gap-5 h-screen'>
            <h1 className='text-3xl font-semibold text-primaryColor'>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 w-2/3 lg:w-1/4'>
                <TextField
                    inputProps={{
                        className: 'bg-gray-50 rounded w-full',
                    }}
                    required
                    label="Email"
                    variant="filled"
                    size='small'
                    {...register("email")}
                />
                <TextField
                    inputProps={{
                        className: 'bg-gray-50 rounded w-full',
                    }}
                    required
                    label="Senha"
                    variant="filled"
                    size='small'
                    type='password'
                    {...register("password")}
                />
                <TextField
                    inputProps={{
                        className: 'bg-gray-50 rounded w-full',
                    }}
                    required
                    label="Digite novamente"
                    variant="filled"
                    size='small'
                    type='password'
                    {...register("confirmPassword")}
                />

                <Button variant="outlined" type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default index