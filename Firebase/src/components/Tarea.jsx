import { useState, useRef } from 'react';
import flecha from '../assets/flecha.png';
import tache from '../assets/tache.png';
import CreateModal from '../modals/CreateModal';
const Tarea = ({ task, updateDocument, deleteDocument }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  const resolveRef = useRef(null);
  const types = {
    delete: "Borrar tarea",
    undo: "Deshacer completición tarea"
  };

  const openModal = (type) => {
    return new Promise((resolve) => {
        setAction(type);
        setIsModalOpen(true);
        resolveRef.current = resolve;
    });
  }

  const handleAccept = () => {
    setIsModalOpen(false);
    if (resolveRef.current) {
      resolveRef.current(true);
      resolveRef.current = null;
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    if (resolveRef.current) {
      resolveRef.current(false);
      resolveRef.current = null;
    }
  };

  const handleDelete = async () => {
    const confirmed = await openModal("delete");
    setLoading(true);
    if (confirmed) {
        await deleteDocument(task.id);
        setAction("");
    }
    setLoading(false);
  }

  const handleToggle = async () => {
     if (task.completed) {
      setLoading(true);
      const confirmed = await openModal("undo");
      
      if (confirmed) {
        await updateDocument(task.id, !task.completed);
      }
      
      setLoading(false);
      setAction("");
    } else {
      await updateDocument(task.id, !task.completed);
    }
  };
  return (
    <>
    <CreateModal open={isModalOpen} onClose={handleClose}>
        <div className=' from-orange-400 to-orange-700 text-transparent bg-clip-text bg-linear-to-r'>
            <h2 className="text-xl font-bold mb-4">{"Objetivo ->" + types[action]}</h2>
            <h3>¿Estás seguro que deseas realizar la acción?</h3>
        </div>
        <div className="flex gap-2 justify-between">
            <button
                onClick={handleAccept}
                className="bg-red-500 text-white p-2 mt-4"
            >
                Soy conciente de mi decisión
            </button>
            <button
                onClick={handleClose}
                className="bg-gray-500 text-white p-2 mt-4"
            >
                Cancelar
            </button>
        </div>
    </CreateModal>
    <div key={task.id} className="mb-2 flex items-center justify-between">
        {loading ? (
            <div>Loading...</div>
        ) : (
          <>
            <span className="text-black bg-amber-400 shadow shadow-amber-700 rounded p-1 mr-4 wrap-break-words inline-block">
              {task.title}
            </span>
            <div className=''>
              <button 
                onClick={handleToggle}
                className="bg-green-500 text-white mr-2 mb-2 p-1 min-w-12"
              >
                {task.completed ? "Revertir" : <img src={flecha} alt="Borrar" className="w-5 h-5 inline-block"/>}
              </button>
              <button 
                onClick={handleDelete}
                className="bg-red-500 text-white mr-2"
              >
                <img src={tache} alt="Borrar" className="w-5 h-5 inline-block"/>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Tarea