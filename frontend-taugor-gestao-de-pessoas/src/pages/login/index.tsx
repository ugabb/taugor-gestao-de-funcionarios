import { Button, TextField } from '@mui/material'
import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-5 h-screen'>
      <h1 className='text-3xl font-semibold text-primaryColor'>Log In</h1>
      <form className='flex flex-col gap-3 w-2/3 lg:w-1/4'>
        <TextField
          inputProps={{
            className: 'bg-gray-50 rounded w-full',
          }}
          required
          label="Email"
          variant="filled"
          size='small'
        />
        <TextField
          inputProps={{
            className: 'bg-gray-50 rounded w-full',
          }}
          required
          label="password"
          variant="filled"
          size='small'
        />

        <Button variant="outlined" type='submit'>Log In</Button>
      </form>
    </div>
  )
}

export default Login