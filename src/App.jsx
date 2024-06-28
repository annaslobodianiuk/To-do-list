import { useEffect, useState } from 'react'
import './App.css'
import Task from './components/Task'
import TaskForm from './components/TaskForm'

function App() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    if(tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks){
      setTasks(tasks);
    }
    else{
      setTasks([]);
    }
  }, [])

  function addTask(name){
    setTasks(
      prev => {
        return[...prev, {name: name, done:false}];
      }
    )
  }

  function updateTaskDone(taskIndex, newDone){
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    })
  }

  function removeTask(taskIndex){
    setTasks(prev => {
      return prev.filter((task, index) => index !== taskIndex)
    });
  }

  function renameTask(index, newName){
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  const numberComplete = tasks.filter(task => task.done).length;
  const allTasks = tasks.length;
  const message = (numberComplete === allTasks) ? "You did it 🕊" : "You can🤍";

  return (
    <>
      <main>
        <h1>{numberComplete}/{allTasks} Complete</h1>
        <h2>{message}</h2>
        <TaskForm onAdd = {addTask}></TaskForm>
        {tasks.map((task, index) =><Task {...task} 
          onTrash={() => removeTask(index)}
          onToggle={done => updateTaskDone(index, done)}
          onRename={newName => renameTask(index, newName)}
        />)}
      </main>
    </>
  )
}

export default App
