import {Link} from 'react-router-dom'
import supabase from "../config/supabaseClient"

const SmoothieCard = ({smoothie , onDelete}) =>{
    
    const handleDelete = async () => {
        const { data, error } = await supabase
          .from('smoothies')
          .delete()
          .eq('id', smoothie.id)
      
        if (error) {
          console.log("Delete error:", error)
        }
        if (data) {
          console.log("Deleted successfully:", data)
          onDelete(smoothie.id) // 🟢 Make sure this fires
        }
      }

    return (
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className="rating">{smoothie.rating}</div>
            <div className="buttons">
                <Link to={'/'+smoothie.id}>
                   <i className="material-icons">edit</i>
                </Link>
                <i className="material-icons" onClick={handleDelete}>delete</i>
                {/*material-icons is a library of react that replaces keywords like edit, delete with actual icons, baad me dekhna if this can be customized or not*/}
            </div>
        </div>
    )
}

export default SmoothieCard