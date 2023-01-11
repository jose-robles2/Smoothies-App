import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

// Components
import { SmoothieCard } from "../components/SmoothieCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null) 

  const handleDelete = (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }

  // At render, this hook called (calls a function to fetch our data)
  // Use an empty array for our dependecies
  useEffect(() => {
    // Create async funct
    const fetchSmoothies = async () => {
      // fetch smoothies (data) and errors if any
      const {data, error} = await supabase
        .from("smoothies") // this is the table we want to fetch
        .select()          // fetch all data in table by leaving () empty
        
        if (error) {
          setFetchError("Could not fetch smoothies")
          setSmoothies(null) 
          console.log(error) 
        }
        if (data) {
          setSmoothies(data)  // update the smoothies
          setFetchError(null) // no errors found
        }
    }

    fetchSmoothies() // call the function within the useEffect(() => {}) hook
  }, [])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">                                        
          <div className="smootie-grid">                                 {/*pass as prop here*/}
          {smoothies.map(smoothie => (<SmoothieCard 
                                        key = {smoothie.id} 
                                        smoothie={smoothie}
                                        onDelete = {handleDelete} 
                                        />))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home