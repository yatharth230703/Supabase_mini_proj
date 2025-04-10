import supabase from "../config/supabaseClient"

import { useEffect , useState } from "react"

import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies,setSmoothies] = useState(null)

  const handleDelete = (id) => {
    setSmoothies(prev => {
      if (!prev) return []
      return prev.filter(sm => sm.id !== id)
    })
  }

  useEffect(()=>{
    const fetchSmoothies = async() =>{
      //table name == smoothies
      const {data,error} = await supabase
       .from('smoothies')
       .select()

       if(error){
        setFetchError("Could NOt fetch the smoothies like so")
        setSmoothies(null)
        console.log(error)
       }
       if (data){
        setSmoothies(data)
        setFetchError(null)
       }
    }
    fetchSmoothies()

  }, [])
  

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className = "smoothies">
          {/*order by buttons to be added later*/}
          <div className="smoothie-grid">
          {smoothies.map(smoothie =>(
            <SmoothieCard 
            key={smoothie.id} 
            smoothie={smoothie}
            onDelete={handleDelete}
            />
          ))} 
          </div>
        </div>
      )}
    </div>
  )
}

export default Home