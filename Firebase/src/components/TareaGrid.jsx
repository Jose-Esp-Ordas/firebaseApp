import {useState} from 'react'
import Tarea from './Tarea'

const TareaGrid = ({ tasks, updateDocument, deleteDocument }) => {
  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);
  const [showCompleted, setShowCompleted] = useState(false);
  return (
    <section className=' w-full col-span-2 '>
      <div className=' flex flex-row gap-6 bg-amber-300 p-2 mb-4 rounded-2xl text-center justify-center'>
        <h4 onClick={() => setShowCompleted(false)} className={showCompleted ? 'cursor-pointer' : 'font-bold text-white '}>Pendientes</h4>
        <h4 onClick={() => setShowCompleted(true)} className={showCompleted ? 'font-bold text-white ' : 'cursor-pointer'}>Completadas</h4>
      </div>
      <div className="p-4 bg-indigo-900 rounded-lg overflow-y-scroll h-[65vh]">
          {(showCompleted ? completedTasks : incompleteTasks).map((task) => (
           <Tarea
            key={task.id}
            task={task}
            updateDocument={updateDocument}
            deleteDocument={deleteDocument}
           />
          ))}
      </div>
    </section>
  )
}

export default TareaGrid