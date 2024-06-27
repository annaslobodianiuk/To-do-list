import { useState } from "react"

export default function TaskForm({onAdd}){
    const [taskName, settaskName] = useState('');
    function handleSubmit(ev){
        ev.preventDefault();
        onAdd(taskName);
        settaskName('');
    }

    return(
        <form onSubmit={handleSubmit}>
            <button>+</button>
            <input type="text" 
                value = {taskName} 
                onChange={ev => settaskName(ev.target.value)} 
                placeholder="Your next task ..." 
            />
        </form>
    )
}