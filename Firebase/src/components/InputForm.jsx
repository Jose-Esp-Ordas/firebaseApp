import { useState,useEffect } from 'react'
import CreateModal from '../modals/CreateModal';
import { Button } from "@/components/ui/button"
import DatePicker from './DatePicker';
const InputForm = ({ add }) => {
    const [taskInput, setTaskInput] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [result, setResult] = useState(null);
    const [date, setDate] = useState("")

    useEffect(() => {    
        let timer = setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
        return () => clearTimeout(timer);
      }, [isModalOpen]);
    
      const handleAddTask = async (e) => {
        e.preventDefault();
        if (taskInput.trim()) {
            const result = await add({ 
                title: taskInput,
                horario: date ? date.toISOString() : null,
                completed: false
            });
            if (result.success) {
               setResult(taskInput + " agregado exitosamente.");
               setIsModalOpen(true);
               setTaskInput("");
            }else {
                setResult(taskInput + " no se pudo agregar. Inténtalo de nuevo.");
                setIsModalOpen(true);
            }
        }
        else {
        alert("El campo de la tarea no puede estar vacío.");
        }
  };
  return (
    <>
        <CreateModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className=" from-orange-400 to-orange-700 text-transparent bg-clip-text bg-linear-to-r">
                <h2 className="text-xl font-bold mb-4">{"Objetivo -> Agregar nueva tarea"}</h2>
                <p>{result}</p>
            </div>
        </CreateModal> 
        <form onSubmit={handleAddTask} className="mb-4 justify-center flex-col items-center">
            <textarea 
                value={taskInput} 
                onChange={(e) => setTaskInput(e.target.value)} 
                placeholder="Nueva tarea" 
                className="border p-2 w-full rounded-lg min-h-14 mb-2 bg-indigo-900 text-white"
            />
            <div className='mb-2'>  
                <DatePicker date={date} setDate={setDate} />
            </div>
            <Button variant="default" aria-label="submit" type="submit" size="large">Agregar Tarea</Button>
        </form>
    </>
  )
}

export default InputForm