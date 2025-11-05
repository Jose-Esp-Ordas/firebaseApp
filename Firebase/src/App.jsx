import reactlogo from './assets/react.svg'

function App() {
  
  return (
    <>
      <navbar className="navbar bg-gray-800 p-4 flex items-center gap-4">
        <img src={reactlogo} alt="Firebase Logo" className="w-20 h-20"/>
        <h1 className="text-orange-500 text-3xl font-bold">Implementación de firebase</h1>
      </navbar>
    </>
  )
}

export default App
