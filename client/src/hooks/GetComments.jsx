import{ useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

const GetComments = (url) =>{
  const initialState = {id:0,comentario:"",usuario_comentario:""}
  const [comment, setComment] = useState(initialState)

  let { user } = useContext(AuthContext)

  const registerComment = async (newComment) => {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "comentario": String(newComment.comment),
        "usuario_comentario": String(user.username),
        "id_comentario":   String(window.location.href.slice(-12)),
      })
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const res = await registerComment(comment)
      const data = await res.json()
      console.log(data)
    }catch(error){
      console.log(error)
    }

    (!user ? alert("No has iniciado sesión") : window.location.reload(false))
  }

  const handleInputChange=(e)=>{
    setComment({[e.target.name]:e.target.value})
  }

  return{
    handleSubmit,
    handleInputChange,
    comment
  }
}


export default GetComments