import { useParams, useNavigate } from "react-router-dom" // hook for routing 
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

const Update = () => {
  const navigate = useNavigate()
  const {id} = useParams()

  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) { // Nothing should be empty
      setFormError("Please fill in all input fields")
      return 
    }

    const {data, error} = await supabase 
      .from("smoothies")
      .update({title, method, rating})
      .eq("id",id)      // specify the corres. record to update

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

  useEffect(() => {
    const fetchSmoothie = async () => {
      const {data, error} = await supabase
        .from("smoothies")
        .select()     // select smoothies such that...
        .eq('id', id) // select the smoothies where the "id" property/column is equal to the passed in id
        .single()     // make it so only one thing is returned (1 smoothie)

        if (error) {
          navigate('/', {replace: true})
        }
        else {
           // Update the vals since we edited the record
           setTitle(data.title)
           setMethod(data.method)
           setRating(data.rating)
        }
    }

    fetchSmoothie() 
  })
  return (
    <div className="page update">
      <form onSubmit = {handleSubmit}>
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

        <button>Update Smoothie Recipe</button>
        {/* If we have an error, display it, check for error with logical and  */}
        {formError && (<p className="error">{formError}</p>)}
        
      </form>
    </div>
  )
}

export default Update