import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"


const Create = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState("")

  // Taken in an event (e) when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault() 
    
    if (!title || !method || !rating) { // Nothing should be empty
      setFormError("Please fill in all input fields")
      return 
    }

    // If entered correctly, add the input data to supabase as a new row
    // From this call we receive data and error
    const {data, error} = await supabase
      .from("smoothies")
      .insert([{title, method, rating}]) // [{}] inserts an array of rows {} = 1 row

    if (error) {
      console.log(error); 
      setFormError("Please fill in all input fields")
    }

    //if (data) {
    else {
      console.log(data); 
      setFormError(null) 
      navigate('/') // redir user to home page so they can see their new insert 
    }
    //  navigate('/')
  }

  // Allow for users to input text and insert new records into supabase
  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type = "text"
          id = "title" 
          value = {title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id = "method"
          value = {method}
          onChange={(e) => setMethod(e.target.value)}
        /> 

        <label htmlFor="rating">Rating:</label>
        <input
          type = "number"
          id="rating"
          value = {rating}
          onChange={(e) => setRating(e.target.value)} 
        />

        <button>Create Smoothie Recipe</button>
        {/* If we have an error, display it, check for error with logical and  */}
        {formError && (<p className="error">{formError}</p>)}
        
      </form>
    </div>
  )
}

export default Create