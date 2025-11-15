import { useFirestore } from '../hooks/useFirestore'
import TareaGrid from './components/TareaGrid'
import Navbar from './components/Navbar'
import InputForm from './components/InputForm'
import Login from './login/Login.jsx'
import { useAuth } from './login/Auth.jsx'

function App() {
  const { user } = useAuth()
  const userId = user?.uid
  const { documents: tasks, addDocument, deleteDocument, updateDocument, loading, error } = useFirestore(
    userId ? `users/${userId}/tasks` : null
  )

  if (!user) return <Login />

  return (
    <>
      <Navbar />
      <main className={`p-4 grid grid-cols-1 md:grid-cols-3 gap-8 bg-linear-to-r
       to-orange-600 from-30% via-orange-900 via-40% from-indigo-950 to-75% max-h-[85vh] min-h-[85vh]`}>
        <InputForm add={addDocument} className="col-span-1" />
        <div className="col-span-1 md:col-span-2">
          {loading && <p>Cargando tareas...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!error && !loading && <TareaGrid  tasks={tasks} updateDocument={updateDocument} deleteDocument={deleteDocument} />}
        </div>
      </main>
    </>
  )
}

export default App
