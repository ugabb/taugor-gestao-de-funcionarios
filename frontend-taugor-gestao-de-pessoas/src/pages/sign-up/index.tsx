import React from 'react'
import { Button, TextField } from '@mui/material'

// hook forms

const index = () => {
    

    return (
        <div className='flex flex-col justify-center items-center gap-5 h-screen'>
            <h1 className='text-3xl font-semibold text-primaryColor'>Sign Up</h1>
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

                <Button variant="outlined" type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default index