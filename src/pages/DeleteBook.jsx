import React, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
  const [lodaing, setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  const {enqueueSnackbar} = useSnackbar()

  const handleDeleteBooks = () =>{
    setLoading(true)
    axios 
      .delete(`http://localhost:5555/books/${id}`)
      .then(response =>{
        setLoading(false)
        navigate('/')
        enqueueSnackbar('Book deleted successfully', { variant: 'success' })
        console.log(response.data)
      })
      .catch(error =>{
        setLoading(false)
        enqueueSnackbar('An unexpected error occured!', { variant: 'error' })
        console.log(error)
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete book</h1>
      {lodaing ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-3xl'> Are you sure that you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBooks}>
          Yes, Delete it
         </button>
      </div>
    </div>
  )
}

export default DeleteBook