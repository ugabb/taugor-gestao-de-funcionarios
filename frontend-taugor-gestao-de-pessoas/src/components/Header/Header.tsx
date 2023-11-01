import { auth } from '@/firebase'
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { IoMdHome } from 'react-icons/io'

const Header = () => {
    const handleSignOut = async () => {
        try {
            await auth.signOut();
            // Sign-out successful.
        } catch (error) {
            // An error happened.
            console.error('Error signing out:', error);
        }
    };

    return (
        <header className='flex flex-col lg:flex-row items-center justify-between shadow-sm'>
            <div className='flex items-center flex-col lg:flex-row '>
                <Image src={'/marca-taugor.png'} alt='logo Taugor' width={180} height={109} />
            </div>

            <div className='flex justify-center items-center gap-5'>
                <Button>
                    <Link href={"/cadastrar-funcionario"}>Cadastrar Funcinário</Link>
                </Button>
                <Button>
                    <Link href={"/listar-funcionarios"}>Listar Funcinário</Link>
                </Button>
                <Button>
                    <Link href={"/login"}>Sign In</Link>
                </Button>
                <Button onClick={handleSignOut}>
                    <Link href={"/"} >Sign Out</Link>
                </Button>
            </div>

            <Link href={"/"} className="hidden text-xl text-gray-400 p-5 lg:block">
                <IoMdHome className="cursor-pointer transition-all hover:text-primaryColor" />
            </Link>

        </header>
    )
}

export default Header