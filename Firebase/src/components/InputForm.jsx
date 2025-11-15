import { useState,useEffect } from 'react'
import CreateModal from '../modals/CreateModal';
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import DatePicker from './DatePicker';
const InputForm = ({ add }) => {
    const [taskInput, setTaskInput] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [result, setResult] = useState(null);
    const [date, setDate] = useState("")
    const [hour, setHour] = useState("10:30:00")

    useEffect(() => {    
        let timer = setTimeout(() => {
          setIsModalOpen(false);
        }, 1500);
        return () => clearTimeout(timer);
      }, [isModalOpen]);
    
      const handleAddTask = async (e) => {
        e.preventDefault();
        if (taskInput.trim()) {
            const result = await add({ 
                title: taskInput,
                horario: date ? date.toISOString() : null,
                hora: hour,
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
                <p className=' break-words max-w-[80vw]'>{result}</p>
            </div>
        </CreateModal> 
        <form onSubmit={handleAddTask} className="mb-4 h-full flex flex-col justify-evenly gap-4"> 
            <FieldSet>
                <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="feedback" className=" text-white">Tarea:</FieldLabel>
                    <Textarea
                    placeholder="Nueva tarea"
                    rows={4}
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    className="flex-1 text-white max-h-[35vh] bg-black resize-none"
                    />
                    <FieldDescription  className=" text-gray-400">
                    Describe tu tarea
                    </FieldDescription>
                </Field>
                </FieldGroup>
            </FieldSet>

            
            <div className='mb-0 flex justify-between gap-2 align-middle'>
                <DatePicker date={date} setDate={setDate} hour={hour} setHour={setHour} />
            </div>

            <div className="flex justify-end">
                <Button variant="default" aria-label="submit" type="submit" className="w-32 rounded-2xl border border-white">Agregar Tarea</Button>
            </div>
        </form>
    </>
  )
}

export default InputForm