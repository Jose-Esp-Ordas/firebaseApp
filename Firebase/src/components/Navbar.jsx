import React from 'react'
import fuego from '../assets/fuego.png'
import {signOut} from 'firebase/auth'
import { auth } from '../../config/firebase'

const Navbar = () => {
  return (
    <nav className="navbar bg-gray-800 p-4 flex items-center gap-4 max-h-[15vh]">
        <img src={fuego} alt="Firebase Logo" className="w-20 h-20"/>
        <h1 className=" text-3xl font-bold from-orange-400 to-orange-700 text-transparent bg-clip-text bg-linear-to-r">Lista de tareas en la nube</h1>
        <button
          onClick={() => signOut(auth)}
          className="ml-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
    </nav>
  )
}

export default Navbar