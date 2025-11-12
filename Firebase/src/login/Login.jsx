import { useState } from 'react'
import { useAuth } from './Auth.jsx'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'

const Login = () => {
    const {user} = useAuth()
    const [userInput, setUserInput] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState(0)
    const texts = ["Iniciar sesión", "Registrarse"]
    
    const onChange = (e) => {
        if (error) {
            setError("")
        }
        if (e.target.id === 'user') {
            setUserInput(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        if (!userInput || !password) {
            setError("Por favor, complete todos los campos.")
            setLoading(false)
            return
        }
        if (text === 1) {
            // Registro
            try {
                await createUserWithEmailAndPassword(auth, userInput, password)
            } catch (error) {
                setError(`Error al registrarse: ` + error.message)
                console.error(error.code);
                console.error(error.message);
            } finally {
                setLoading(false)
            }
        } else {
            // Inicio de sesión
            try {
                await signInWithEmailAndPassword(auth, userInput, password)
            } catch (error) {
                setError(`Error al iniciar sesión: ` + error.message)
                console.error(error.code);
                console.error(error.message);
            } finally {
                setLoading(false)
            }
        }
    }
  return (
    <>
        <div className="flex flex-col md:flex-row h-full">
            {/* Columna izquierda - Formulario */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 py-12">
                <div className="w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center text-rosita mb-6">
                    Cloud To Do App
                </h1>
                <h1 className="text-3xl font-bold text-center text-rosita mb-6">
                    Inicio de sesión
                </h1>

                {error && (
                    <p className="text-red-500 text-center text-sm mb-2">{error}</p>
                )}
                {loading && (
                    <p className="text-gray-500 text-center text-sm mb-2">Cargando...</p>
                )}

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div>
                    <label
                        htmlFor="user"
                        className="block text-sm font-medium text-rosita mb-1"
                    >
                        Usuario
                    </label>
                    <input
                        type="text"
                        id="user"
                        name="user"
                        value={user}
                        disabled={loading}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-rosita outline-none"
                    />
                    </div>

                    <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-rosita mb-1"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        disabled={loading}
                        value={password}
                        onChange={onChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-rosita outline-none"
                    />
                    </div>

                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-rosita text-white font-semibold py-2 rounded-md transition mt-4 cursor-pointer bg-indigo-800 hover:bg-indigo-600"
                    >
                    {texts[text]}
                    </button>
                </form>
                <p onClick={() => setText(text === 0 ? 1 : 0)} className="text-center text-blue-600 cursor-pointer mt-4 ">
                    {text === 0 ? "¿No tienes una cuenta? Regístrate" : "¿Ya tienes una cuenta? Inicia sesión"}
                </p>
                </div>
            </div>

            {/* Columna derecha - Imagen */}
            <div className="hidden md:flex w-1/2 bg-indigo-950 items-center justify-center h-screen">
                <img
                src="https://img.pikbest.com/origin/09/23/73/88GpIkbEsT8vF.png!sw800"
                alt="Login ilustración"
                className="max-w-md w-3/4"
                />
            </div>
        </div>
    </>
  )
}

export default Login