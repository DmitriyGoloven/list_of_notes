import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from "uuid";


const OneNote = ({subList}) => {

    const [note, setNote] = useState(" ")
    const [list, setList] = useState([])

    console.log(list)

   useEffect(()=>{
       setList(subList)
   },[subList])

    const input = () => (
        <li>
            <input className={"noteInput"}
                   type={"text"}
                   value={note}
                   placeholder={"Your note"}
                   onChange={(event) => {
                       setNote(event.target.value)
                   }}/>
            <button className={"noteButton"} onClick={addNote}>ADD</button>
        </li>)

    const addNote = () => {

        if (note.trim() !== '') {
            const myNote = {
                id: uuidv4(),
                note: note
            }
            setList((list) => [...list, myNote])
            setNote('')
        } else alert('Note is empty!')
    }

    return (
        <div>
            <ul key={list.length}>

                {list.map((note, index) => {
                    return (<li key={note.id} style={{margin: "5px 0 "}}>
                            <textarea className={"myNote"} defaultValue={note.note}/>
                        </li>
                    )
                })}

                {input()}
            </ul>

        </div>

    );
}
export default OneNote;