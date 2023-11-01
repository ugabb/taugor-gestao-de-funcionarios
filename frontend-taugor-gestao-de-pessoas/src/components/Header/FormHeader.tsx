import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { IoMdHome } from 'react-icons/io'

const FormHeader = () => {
    return (
        <header className='flex flex-col lg:flex-row items-center justify-between '>
            <div className='flex items-center flex-col lg:flex-row '>
                <Image src={'/marca-taugor.png'} alt='logo Taugor' width={180} height={109} className='lg:border-r' />

                <div className='ml-10'>
                    <p className='text-gray-400 text-xs'>PASSO 2 DE 6</p>
                    <h3 className='text-lg font-semibold'>Informação de contato</h3>
                </div>
            </div>

            <Link href={"/"} className="hidden text-xl text-gray-400 p-5 border-l lg:block">
                <IoMdHome className="cursor-pointer transition-all hover:text-primaryColor" />
            </Link>

        </header>
    )
}

export default FormHeader