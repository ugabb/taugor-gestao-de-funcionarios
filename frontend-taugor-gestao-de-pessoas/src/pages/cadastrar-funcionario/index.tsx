import FormHeader from '@/components/Header/FormHeader'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

//react icons
import { RiPencilFill } from 'react-icons/ri'
import { BiSolidUser } from 'react-icons/bi'
import { FaRegLightbulb } from 'react-icons/fa'
import { BsToggle2Off } from 'react-icons/bs'
import { AiOutlineArrowUp } from 'react-icons/ai'


//material ui
import { Button } from '@mui/material'

import { useForm, SubmitHandler } from 'react-hook-form'

import { IFuncionario } from '@/IFuncionario'
import axios from 'axios'
import ModalCreateFuncionario from '@/components/ModalCreateFuncionario'


import { storage } from '@/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

//uuid
import { v4 } from 'uuid'
import { useRouter } from 'next/router'

const initialFuncionarioState: IFuncionario = {
  contatoInfo: {
    name: '',
    lastName: '',
    email: '',
    gender: '',
    address: {
      cep: '',
      logradouro: '',
      number: 0,
      uf: '',
    },
    phone: '',
    profilePicture: null,
    birthday: new Date()
  },
  funcionarioInfo: {
    role: '',
    admissioDate: new Date(),
    sector: '',
    salary: 0,
  },
};


const index = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFuncionario>()


  // criar funcionario
  const [funcionario, setFuncionario] = useState<IFuncionario>(initialFuncionarioState)
  console.log("Funcionario CRU", funcionario)
  const [pictureURL, setPictureURL] = useState<string>("");
  const createFuncionario = async (funcionarioData: IFuncionario) => {
    try {
      console.log("Funcionario POST: ", funcionarioData)
      console.log(pictureURL)
      const response = await axios.post<IFuncionario>('http://localhost:8080/api/funcionario', {
        contatoInfo: {
          name: funcionarioData.contatoInfo.name,
          lastName: funcionarioData.contatoInfo.lastName,
          email: funcionarioData.contatoInfo.email,
          gender: funcionarioData.contatoInfo.gender,
          address: {
            cep: funcionarioData.contatoInfo.address.cep,
            logradouro: funcionarioData.contatoInfo.address.logradouro,
            number: Number(funcionarioData.contatoInfo.address.number),
            uf: funcionarioData.contatoInfo.address.uf,
          },
          phone: funcionarioData.contatoInfo.phone,
          profilePicture: pictureURL,
          birthday: funcionarioData.contatoInfo.birthday,
        },
        funcionarioInfo: {
          role: funcionarioData.funcionarioInfo.role,
          admissioDate: funcionarioData.funcionarioInfo.admissioDate,
          sector: funcionarioData.funcionarioInfo.sector,
          salary: Number(funcionarioData.funcionarioInfo.salary),
        },
      });
      console.log(response);

      // if(response.status == 201){
      //   const router = useRouter()
      //   router.push('/listar-funcionarios')
      // }
      return response;
    } catch (error) {
      console.log(error);
    }
  };


  const uploadImage = async () => {
    if (funcionario.contatoInfo.profilePicture && typeof funcionario.contatoInfo.profilePicture !== 'string') {
      const picture: File = funcionario.contatoInfo.profilePicture;
      const imageRef = ref(storage, `profile-pictures/${picture + v4()}`);
      await uploadBytes(imageRef, picture);
      const pictureURL = await getDownloadURL(imageRef);
      setPictureURL(pictureURL);
    }
  };





  const onSubmit: SubmitHandler<IFuncionario> = (funcionarioData: IFuncionario) => {
    console.log("Funcionario DATA: ", funcionarioData)
    setFuncionario(funcionarioData)
    uploadImage();
    handleOpen()
  }


  const syncronizeWithDocument = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nameKeys = name.split('.');
    if (nameKeys.length === 1) {
      setFuncionario((prevState) => ({
        ...prevState,
        contatoInfo: {
          ...prevState.contatoInfo,
          [name]: value,
        },
      }));
    } else if (nameKeys.length === 2) {
      const [parent, child] = nameKeys;
      setFuncionario((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent as keyof typeof prevState],
          [child]: value,
        },
      }));
    } else if (nameKeys.length === 3) {
      const [parent, child, subChild] = nameKeys;
      setFuncionario((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent as keyof typeof prevState],
          [child]: {
            ...prevState[parent as keyof typeof prevState][child],
            [subChild]: value,
          },
        },
      }));
    }
    console.log(Number(funcionario.contatoInfo.address.number), Number(funcionario.funcionarioInfo.salary))
  };


  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // selecionar imagem
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRounded, setIsRounded] = useState<boolean>(false);
  function handleUploadImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const picture = e.target.files[0];
      setFuncionario((prev) => ({
        ...prev,
        contatoInfo: {
          ...prev.contatoInfo,
          profilePicture: picture
        }
      }));

      console.log(picture);
      if (picture) {
        const imageUrl = URL.createObjectURL(picture);
        setSelectedImage(imageUrl);
      }
    }
  }

  const handleRounded = () => {
    setIsRounded(prev => !prev)
  }


  return (
    <div >
      <FormHeader />
      <div className="w-full h-2 bg-gray-200"></div>

      <main className='p-3 md:p-10 w-full flex flex-col lg:flex-row lg:gap-5 lg:p-10 lg:max-w-7xl lg:mx-auto'>
        <section className='lg:w-1/2 my-3 md:my-0'>
          <h1 className='text-xl font-bold'>Fale-nos um pouco sobre você</h1>
          <p className='text-sm text-gray-500'>Diga quem você é, como os empregadores podem entrar em contato com você e qual a sua profissão.</p>

          <div className="flex items-center gap-3 my-5">
            <h2 className='text-xl font-bold'>Informação de contato</h2>
            <RiPencilFill className="text-gray-400 text-lg" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center w-full gap-5'>

            <div className="flex flex-col md:flex-row md:gap-5 w-full">
              <div className='flex flex-col lg:gap-5 lg:w-1/2'>
                <div className='w-full flex flex-col'>
                  <div className='flex flex-col w-full'>
                    <input {...register("contatoInfo.name", { required: false })} type='text' className='input' placeholder='Nome' onChange={syncronizeWithDocument} />
                    {errors.contatoInfo?.name && <span className='text-red-500 text-xs'>Nome é obrigatório</span>}
                  </div>
                  <p className='text-xs text-gray-500'>ex: Tiago</p>
                </div>
                <div className='w-full flex flex-col'>
                  <div className='flex flex-col w-full'>
                    <input {...register("contatoInfo.lastName", { required: false })} type='text' className='input' placeholder='Sobrenome' onChange={syncronizeWithDocument} />
                    {errors.contatoInfo?.lastName && <span className='text-red-500 text-xs'>Sobrenome é obrigatório</span>}
                  </div>
                  <p className='text-xs text-gray-500'>ex: Souza</p>
                </div>
              </div>

              {/* FOTO DE PERFIL */}
              <div className='flex flex-col md:flex-row justify-center  lg:gap-3 lg:w-1/2'>
                <div className={`${selectedImage ? '' : 'px-5 py-10 bg-gray-50'} h-full flex justify-center items-center  rounded-md`}>
                  {selectedImage ? (
                    <div className='flex flex-col gap-3'>
                      <img src={selectedImage} alt="Selected" className={`h-40 w-40 object-cover ${isRounded ? 'rounded-full' : ''}`} />
                      <div className='flex items-center gap-3'>
                        {isRounded ? <BsToggle2Off onClick={handleRounded} className="text-3xl text-primaryColor cursor-pointer rotate-180" /> : <BsToggle2Off onClick={handleRounded} className="text-3xl text-gray-400 cursor-pointer" />}
                        <p className="text-sm">Foto Redonda</p>
                      </div>
                    </div>
                  ) : (
                    <BiSolidUser className="text-gray-300 text-6xl" />
                  )}
                </div>
                <div>
                  {selectedImage ? (<></>) :
                    (
                      <>
                        <div className='flex items-center gap-3 mb-3'>
                          <p className="">Foto do Perfil</p>
                          <div className='rounded-full p-1 bg-gray-200'>
                            <FaRegLightbulb className="text-gray-400" />
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <label htmlFor='upload-photo' className='flex items-center gap-3'>
                            <div className='rounded-full p-1 bg-blue-500 cursor-pointer hover:bg-blue-300 transition-colors'>
                              <AiOutlineArrowUp className='text-white ' />
                            </div>
                          </label>
                          <p className='text-sm'>Adicionar Foto</p>
                          <input
                            type='file'
                            id='upload-photo'
                            onChangeCapture={(e) => handleUploadImage(e)}
                            style={{ display: 'none' }}
                            {...register("contatoInfo.profilePicture")}
                          />
                        </div>
                      </>
                    )}


                </div>
              </div>

            </div>

            <div className='flex flex-col gap-3 w-full'>
              <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className='flex flex-col w-full'>
                    <input {...register("funcionarioInfo.role", { required: false })} type='text' className={`input  `} placeholder='Cargo' onChange={syncronizeWithDocument} />
                    {errors.funcionarioInfo?.role && <span className='text-red-500 text-xs'>Cargo é obrigatório</span>}
                  </div>

                  <div className='flex flex-col w-full'>
                    <input {...register("funcionarioInfo.sector", { required: false })} type='text' className='input w-full' placeholder='Setor' onChange={syncronizeWithDocument} />
                    {errors.funcionarioInfo?.sector && <span className='text-red-500 text-xs'>Setor é obrigatório</span>}
                  </div>

                  <div className='flex flex-col w-full'>
                    <input {...register("funcionarioInfo.salary", { required: false, valueAsNumber: true })} type='number' className='input w-full' placeholder='Salário' onChange={syncronizeWithDocument} />
                    {errors.funcionarioInfo?.salary && <span className='text-red-500 text-xs'>Salário é obrigatório</span>}
                  </div>
                </div>
                <p className='text-xs text-gray-500'>ex: Coordenador</p>
              </div>

              <div className="w-full flex flex-col gap-3">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                  <div className='flex flex-col w-full'>
                    <input {...register("contatoInfo.address.cep", { required: false })} type='text' className='input w-full' placeholder='CEP' onChange={syncronizeWithDocument} />
                    {errors.contatoInfo?.address?.cep && <span className='text-red-500 text-xs'>CEP é obrigatório</span>}
                  </div>
                  <div className="flex gap-3">
                    <div className='flex flex-col w-full'>
                      <input {...register("contatoInfo.address.number", { required: false, valueAsNumber: true })} type='number' className='input w-full' placeholder='Número' onChange={syncronizeWithDocument} />
                      {errors.contatoInfo?.address?.number && <span className='text-red-500 text-xs'>Número é obrigatório</span>}
                    </div>

                    <div className='flex flex-col w-full'>
                      <input {...register("contatoInfo.address.uf", { required: false })} type='text' className='input w-full' placeholder='UF' onChange={syncronizeWithDocument} />
                      {errors.contatoInfo?.address?.uf && <span className='text-red-500 text-xs'>UF é obrigatório</span>}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <input {...register("contatoInfo.address.logradouro", { required: false })} type='text' className='input' placeholder='Logradouro' onChange={syncronizeWithDocument} />
                  {errors.contatoInfo?.address?.logradouro && <span className='text-red-500 text-xs'>Logadouro é obrigatório</span>}
                </div>
                <p className='text-xs text-gray-500'>ex: Rua 5 de Gotham City</p>
              </div>


              <div className='flex flex-col justify-center w-full gap-3'>
                <div className='flex flex-col gap-3'>
                  <div className='w-full flex flex-col'>
                    <div className="flex gap-3">
                      <div className='flex flex-col w-full'>
                        <input {...register("contatoInfo.phone", { required: false })} type='text' className='input w-full' placeholder='Telefone' onChange={syncronizeWithDocument} />
                        {errors.contatoInfo?.phone && <span className='text-red-500 text-xs'>Telefone é obrigatório</span>}
                      </div>
                      <div className='flex flex-col w-full'>
                        <input {...register("contatoInfo.email", { required: false })} type='email' className='input w-full' placeholder='Email' onChange={syncronizeWithDocument} />
                        {errors.contatoInfo?.email && <span className='text-red-500 text-xs'>Email é obrigatório</span>}
                      </div>

                      <div className='flex flex-col w-full'>
                        <select {...register("contatoInfo.gender", { required: false })} type='text' className='input w-full' placeholder='Gênero' onChange={syncronizeWithDocument} >
                          <option value="">-- Selecione</option>
                          <option value="masculino">Masculino</option>
                          <option value="feminino">Feminino</option>
                        </select>
                        {errors.contatoInfo?.gender && <span className='text-red-500 text-xs'>Gênero é obrigatório</span>}
                      </div>
                    </div>
                    <p className='text-xs text-gray-500'>ex: Souza</p>
                  </div>
                  <div className='w-full flex flex-col'>
                    <div className="flex gap-3">
                      <div className='flex flex-col w-full'>
                        <input {...register("funcionarioInfo.admissioDate", { required: false })} type='date' className='input w-full' placeholder='Data de Admissão' onChange={syncronizeWithDocument} />
                        {errors.funcionarioInfo?.admissioDate && <span className='text-red-500 text-xs'>Data de Admissão é obrigatório</span>}
                      </div>
                      <div className='flex flex-col w-full'>
                        <input {...register("contatoInfo.birthday", { required: false })} type='date' className='input w-full' placeholder='Data de Nascimento' onChange={syncronizeWithDocument} />
                        {errors.contatoInfo?.birthday && <span className='text-red-500 text-xs'>Data de Nascimento é obrigatório</span>}
                      </div>
                    </div>
                    <p className='text-xs text-gray-500'>ex: Souza</p>
                  </div>
                </div>
              </div>
            </div>

            <Button type='submit' variant='outlined'>Salvar</Button>
          </form>
        </section>


        <section className=' bg-gray-100 flex justify-center items-center lg:w-1/2 h-screen' id='document'>
          <div className='bg-white a4 shadow-lg rounded-sm p-10 flex flex-col gap-3'>
            <div className={`without-border-top px-3 `} >
              <h1 className='text-primaryColor text-xl'>{funcionario?.contatoInfo?.name} {funcionario?.contatoInfo?.lastName}</h1>
              <p className='text-xs text-gray-500'>Cargo: {funcionario?.funcionarioInfo?.role}</p>
              <p className='text-xs text-gray-500'>Setor: {funcionario?.funcionarioInfo?.sector}</p>
              <p className='text-xs text-gray-500'>Salário: {funcionario?.funcionarioInfo?.salary}</p>
              <p className='text-xs text-gray-500'>CEP: {funcionario?.contatoInfo?.address?.cep}</p>
              <p className='text-xs text-gray-500'>Número: {funcionario?.contatoInfo?.address?.number}</p>
              <p className='text-xs text-gray-500'>UF: {funcionario?.contatoInfo?.address?.uf}</p>
              <p className='text-xs text-gray-500'>Telefone: {funcionario?.contatoInfo?.phone}</p>
              {/* <p className='text-xs text-gray-500'>email: {funcionario.contatoInfo.}</p> */}
              {/* <p className='text-xs text-gray-500'>birthday: {funcionario.contatoInfo.birthday}</p> */}
              {/* <p className='text-xs text-gray-500'>data admissao: {funcionario.funcionarioInfo.admissioDate}</p> */}
            </div>
            <div className='border border-primaryColor px-3 '>
              <h1 className='text-primaryColor text-xl'>Gabriel Barros</h1>
              <p className='text-xs text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id nobis enim ratione quisquam neque temporibus, quia impedit dignissimos quos facilis eligendi error quo ipsum amet illum repellat ad, possimus explicabo!</p>
            </div>
            <div className='border border-primaryColor px-3 '>
              <h1 className='text-primaryColor text-xl'>Gabriel Barros</h1>
              <p className='text-xs text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id nobis enim ratione quisquam neque temporibus, quia impedit dignissimos quos facilis eligendi error quo ipsum amet illum repellat ad, possimus explicabo!</p>
            </div>
          </div>
        </section>

      </main>
      {open && <ModalCreateFuncionario funcionario={funcionario} createFuncionario={createFuncionario} handleClose={handleClose} handleOpen={handleOpen} open={open} />}
    </div>
  )
}

export default index