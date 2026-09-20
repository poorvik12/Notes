import { useState,useEffect } from "react";
import './App.css'

const App = () => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [task, setTask] = useState(()=>{
  const savedTasks = localStorage.getItem("Tasks")
    return savedTasks ? JSON.parse(savedTasks):[]
  })

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(task))
  }, [task])

  const submitHandler = (e) => {
    e.preventDefault()

    if(title.trim()==='' || details.trim()===''){
      alert('Title and Details cannot be empty!!')
      return
    }

    const cpyTask = [...task]
    cpyTask.push({title,details})
    setTask(cpyTask)

    setTitle('')
    setDetails('')
    
  }

  const deleteNote = (idx)=>{
    const copyTask=[...task];
    copyTask.splice(idx,1)
    setTask(copyTask)
  }

  return (
    <div className='bg-black lg:flex text-white h-screen '>
      <form onSubmit={(e)=>{submitHandler(e)}} className='flex lg:w-1/2 flex-col gap-4 items-start p-10 '>
          <h1 className="text-4xl">Add Notes</h1>
          {/*Note Heading*/}
          <input className="px-5 py-2 outline-none font-medium border-2 w-full rounded" type="text" placeholder='Enter Heading' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
          {/*Details*/}
          <textarea className="px-5 py-2 h-32 font-medium border-2 w-full outline-none rounded" placeholder='Write details here' name="" id="" value={details} onChange={(e)=>{setDetails(e.target.value)}} />
          <button className="bg-gray-100 hover:bg-gray-300 font-bold  active:scale-95 text-black w-full px-5 py-2 rounded">Add Notes</button>
      </form>
      <div className=" lg:w-1/2 lg:border-l-2 bg-gray-900 p-10">
        <h1 className="text-4xl">Notes</h1>
        {task.length === 0 ? (
          <div className="h-[90%] flex items-center justify-center text-gray-600 text-6xl font-bold">
            <i>No Notes</i> 
          </div>
        ):(
        <div className="flex flex-wrap items-start justify-start mt-5 gap-5 overflow-auto h-[90%] scrollbar-hide">
          {task.map(function(elem,idx){
            return <div key={idx} className=" flex flex-col justify-between items-start h-52 w-42 bg-cover relative bg-white text-black p-3 rounded-2xl">
              <div className="w-full">
                <h3 id="title" className="h-12 leading-tight text-lg font-bold border-black wrap-anywhere overflow-y-auto scrollbar-hide">{elem.title}</h3>
                <hr id="detail" className="my-3 w-full border-t border-gray-500" />
              </div>
              <p className="mt-2 leading-tight text-gray-500 font-semibold wrap-anywhere overflow-y-auto scrollbar-hide">{elem.details}</p>
              <button onClick={()=>{deleteNote(idx)}} className="w-full py-1 text-xs font-bold rounded-2xl active:scale-95 bg-red-600 text-white">Delete</button>
            </div>
          })}
        </div>
        )}
      </div>
    </div>
  )
}

export default App