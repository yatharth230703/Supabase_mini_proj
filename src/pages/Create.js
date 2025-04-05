import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import supabase from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate()

  const [title,setTitle] = useState('')
  const [method,setMethod] = useState('')
  const [rating,setRating] = useState('')
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    if (!title || !method || !rating || isNaN(rating)) {
      setFormError("Please fill in all the fields correctly")
      return
    }
  
    const { error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating: Number(rating) }], { returning: 'minimal' })
  
    if (error) {
      console.log(error)
      setFormError("Insert failed: " + error.message)
      return
    }
  
    setFormError(null)
    console.log("Navigation about to happen")
    navigate('/')
  }
  return (
    
    <div className="page create">
      <form onSubmit={handleSubmit}>

        <label htmlFor="title">Title:</label>
        <input 
        type="text"
        id="title"
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
           id="method"
           value={method}
           onChange={(e)=>setMethod(e.target.value)}
        />
        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange ={(e)=>setRating(e.target.value)}
        />

        <button type="submit"> Create Smoothie Recipe</button>



        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create