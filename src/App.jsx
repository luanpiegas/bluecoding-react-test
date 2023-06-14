import { useState } from 'react'	
import { useForm } from "react-hook-form";
import { Button, Modal } from 'flowbite-react';
import './App.css'

function App() {
  const [gifs, setGifs] = useState([])

  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const { register, handleSubmit } = useForm();
  const onError = (errors, e) => console.log(errors, e);
  const onSubmit = async (data) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${data.keyword}&limit=10&offset=0&rating=g&lang=en`)
      .then((response) => response.json())
      .catch((error) => console.log(error))
       setGifs(response.data)
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline text-slate-500 m-5">
        Giphy Search
      </h1>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input {...register("keyword")} className='p-2 m-5 border-2 border-solid border-slate-700' />
        <button type="submit" className='bg-slate-700 text-white px-5 py-3'>Search</button>
      </form>

      <div className='gifs'>
        {gifs.map((gif) => (
          <div className="gif" key={gif.id}>
            <Button onClick={() => props.setOpenModal(gif.id)}>
              <img src={gif.images.original_still.url} alt={gif.title} className='gif-still' />
            </Button>
            <Modal show={props.openModal === gif.id} onClose={() => props.setOpenModal(undefined)}>
              <Modal.Body>
                <img src={gif.images.original.url} alt={gif.title} className='gif' />
              </Modal.Body>
              <Modal.Footer>
                <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
