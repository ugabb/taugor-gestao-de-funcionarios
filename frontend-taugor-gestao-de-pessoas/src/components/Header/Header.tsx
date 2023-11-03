
import { Box, Button, CircularProgress } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';

import { IoMdHome } from 'react-icons/io'
import { useRouter } from 'next/router';

const Header = () => {
    const [authUser, setAuthUser] = useState<User | null>(null); // Inicializando com tipo 'User | null'

    const router = useRouter()


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

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            router.push('/')
            // Sign-out successful.
        } catch (error) {
            // An error happened.
            console.error('Error signing out:', error);
        }
    };

    return (
        <header className='flex flex-col md:flex-row items-center justify-between shadow-sm'>
            <div className='flex items-center flex-col lg:flex-row '>
                <Link href={'/'} className='hover:scale-105 transition-all'>
                    <Image src={'/marca-taugor.png'} alt='logo Taugor' width={180} height={109} />
                </Link>
            </div>

            <div className='flex justify-center items-center gap-5'>
                {authUser &&
                    <>
                        <Button className='hover:scale-105 transition-all'>
                            <Link href={"/cadastrar-funcionario"}>Cadastrar Funcinário</Link>
                        </Button>
                        <Button className='hover:scale-105 transition-all'>
                            <Link href={"/listar-funcionarios"}>Listar Funcinário</Link>
                        </Button>
                        <Button className='hover:scale-105 transition-all' onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </>
                }
            </div>

            <Link href={"/"} className="hidden text-xl text-gray-400 p-5 md:block">
                <IoMdHome className="cursor-pointer transition-all hover:text-primaryColor hover:scale-105" />
            </Link>

        </header>
    )
}

export default Header