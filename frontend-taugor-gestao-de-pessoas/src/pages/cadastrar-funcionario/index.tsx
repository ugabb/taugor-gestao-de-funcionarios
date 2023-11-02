import FormHeader from '@/components/Header/FormHeader'
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'

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
import FuncionarioA4 from '@/components/FuncionarioA4'

// gerar PDF
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

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
  funcionarioPDF:''
};


const index = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFuncionario>()


  // criar funcionario
  const [funcionario, setFuncionario] = useState<IFuncionario>(initialFuncionarioState)


  const createFuncionario = async (funcionarioData: IFuncionario) => {
    try {
      console.log("Funcionario POST: ", funcionarioData)
      console.log("Funcionario PDF: ", funcionarioPdfUrl)
      console.log("Funcionario Picture: ", pictureURL)
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
        funcionarioPDF: funcionarioPdfUrl
      });
      console.log(response);

      // if (response.status == 201) {
      //   return (
      //     <div className='absolute inset-0 flex items-center justify-center bg-white p-10'>
      //       <h1 className='text-blue-600 text-xl font-bold'>Funcionário Criado com sucesso!</h1>
      //     </div>
      //   )
      // }
      return response;
    } catch (error) {
      console.log(error);
    }
  };



  const onSubmit: SubmitHandler<IFuncionario> = (funcionarioData: IFuncionario) => {
    console.log("Funcionario DATA: ", funcionarioData)
    setFuncionario(funcionarioData)
    uploadImage();
    generateAndUploadPdf()
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
    console.log(funcionario.contatoInfo.profilePicture)
  };


  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // selecionar imagem
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRounded, setIsRounded] = useState<boolean>(false);
  const [pictureURL, setPictureURL] = useState<string>("");
  function handleSelectedPicture(e: ChangeEvent<HTMLInputElement>) {
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
  const uploadImage = async () => {
    if (funcionario.contatoInfo.profilePicture && typeof funcionario.contatoInfo.profilePicture !== 'string') {
      const picture: File = funcionario.contatoInfo.profilePicture;
      const imageRef = ref(storage, `profile-pictures/${picture + v4()}`);
      await uploadBytes(imageRef, picture);
      const pictureURL = await getDownloadURL(imageRef);
      setPictureURL(pictureURL);
    }
  };


  const handleRounded = () => {
    setIsRounded(prev => !prev)
  }

  // gerar PDF
  // const [pdfData, setPdfData] = useState<Blob | null>(null);
  const [funcionarioPdfUrl, setFuncionarioPDFUrl] = useState<string>('');
  const generateAndUploadPdf = async () => {
    if (!funcionario) {
      return;
    }

    const input = document.getElementById('document');
    if (input) {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const inputWidthPx = input.offsetWidth;
      const inputHeightPx = input.offsetHeight;

      const pdfWidthMm = 210;
      const pdfHeightMm = pdfWidthMm * (inputHeightPx / inputWidthPx);

      const canvas = await html2canvas(input, { scale: 2, useCORS: true, scrollX: 0, scrollY: 0, width: inputWidthPx, height: inputHeightPx });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidthMm, pdfHeightMm);
      const pdfData = pdf.output('blob');
      if (pdfData) {
        const pdfRef = ref(storage, `funcionarios-pdf/${funcionario.contatoInfo.name}${funcionario.contatoInfo.lastName}.pdf` + v4());
        await uploadBytes(pdfRef, pdfData);
        const pdfURL = await getDownloadURL(pdfRef);
        setFuncionarioPDFUrl(pdfURL);
        console.log('PDF URL:', pdfURL);
      }
    }
  };


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
                    <input {...register("contatoInfo.name", { required: true })} type='text' className='input' placeholder='Nome' onChange={syncronizeWithDocument} />
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
                            onChangeCapture={(e) => handleSelectedPicture(e)}
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
                    <input {...register("funcionarioInfo.role", { required: true })} type='text' className={`input  `} placeholder='Cargo' onChange={syncronizeWithDocument} />
                    {errors.funcionarioInfo?.role && <span className='text-red-500 text-xs'>Cargo é obrigatório</span>}
                  </div>

                  <div className='flex flex-col w-full'>
                    <input {...register("funcionarioInfo.sector", { required: true })} type='text' className='input w-full' placeholder='Setor' onChange={syncronizeWithDocument} />
                    {errors.funcionarioInfo?.sector && <span className='text-red-500 text-xs'>Setor é obrigatório</span>}
                  </div>

                  <div className='flex flex-col w-full'>
                    <input {...register("funcionarioInfo.salary", { required: true, valueAsNumber: true })} type='number' className='input w-full' placeholder='Salário' onChange={syncronizeWithDocument} />
                    {errors.funcionarioInfo?.salary && <span className='text-red-500 text-xs'>Salário é obrigatório</span>}
                  </div>
                </div>
                <p className='text-xs text-gray-500'>ex: Coordenador</p>
              </div>

              <div className="w-full flex flex-col gap-3">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                  <div className='flex flex-col w-full'>
                    <input {...register("contatoInfo.address.cep", { required: true })} type='text' className='input w-full' placeholder='CEP' onChange={syncronizeWithDocument} />
                    {errors.contatoInfo?.address?.cep && <span className='text-red-500 text-xs'>CEP é obrigatório</span>}
                  </div>
                  <div className="flex gap-3">
                    <div className='flex flex-col w-full'>
                      <input {...register("contatoInfo.address.number", { required: true, valueAsNumber: true })} type='number' className='input w-full' placeholder='Número' onChange={syncronizeWithDocument} />
                      {errors.contatoInfo?.address?.number && <span className='text-red-500 text-xs'>Número é obrigatório</span>}
                    </div>

                    <div className='flex flex-col w-full'>
                      <input {...register("contatoInfo.address.uf", { required: true })} type='text' className='input w-full' placeholder='UF' onChange={syncronizeWithDocument} />
                      {errors.contatoInfo?.address?.uf && <span className='text-red-500 text-xs'>UF é obrigatório</span>}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col w-full'>
                  <input {...register("contatoInfo.address.logradouro", { required: true })} type='text' className='input' placeholder='Logradouro' onChange={syncronizeWithDocument} />
                  {errors.contatoInfo?.address?.logradouro && <span className='text-red-500 text-xs'>Logadouro é obrigatório</span>}
                </div>
                <p className='text-xs text-gray-500'>ex: Rua 5 de Gotham City</p>
              </div>


              <div className='flex flex-col justify-center w-full gap-3'>
                <div className='flex flex-col gap-3'>
                  <div className='w-full flex flex-col'>
                    <div className="flex gap-3">
                      <div className='flex flex-col w-full'>
                        <input {...register("contatoInfo.phone", { required: true })} type='text' className='input w-full' placeholder='Telefone' onChange={syncronizeWithDocument} />
                        {errors.contatoInfo?.phone && <span className='text-red-500 text-xs'>Telefone é obrigatório</span>}
                      </div>
                      <div className='flex flex-col w-full'>
                        <input {...register("contatoInfo.email", { required: true })} type='email' className='input w-full' placeholder='Email' onChange={syncronizeWithDocument} />
                        {errors.contatoInfo?.email && <span className='text-red-500 text-xs'>Email é obrigatório</span>}
                      </div>

                      <div className='flex flex-col w-full'>
                        <select {...register("contatoInfo.gender", { required: true })} type='text' className='input w-full' placeholder='Gênero' onChange={syncronizeWithDocument} >
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
                        <input {...register("funcionarioInfo.admissioDate", { required: true })} type='date' className='input w-full' placeholder='Data de Admissão' onChange={syncronizeWithDocument} />
                        {errors.funcionarioInfo?.admissioDate && <span className='text-red-500 text-xs'>Data de Admissão é obrigatório</span>}
                      </div>
                      <div className='flex flex-col w-full'>
                        <input {...register("contatoInfo.birthday", { required: true })} type='date' className='input w-full' placeholder='Data de Nascimento' onChange={syncronizeWithDocument} />
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



        <FuncionarioA4 funcionario={funcionario} profilePicture={selectedImage} isRounded={isRounded} />



      </main>
      {(open && pictureURL != '' && funcionarioPdfUrl != '') && <ModalCreateFuncionario funcionario={funcionario} createFuncionario={createFuncionario} handleClose={handleClose} handleOpen={handleOpen} open={open} />}
    </div>
  )
}

export default index