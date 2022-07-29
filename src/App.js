import './App.css';
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';

function App() {

    const [note, setNote] = useState("")
    const [notes, setNotes] = useState(
        localStorage.getItem("notes") || []
    )

    useEffect(() => {

            localStorage.setItem('notes', JSON.stringify(notes))
        },
        [notes])

    const addNote = () => {

        if (note.trim() !== '') {
            const myNote = {
                id: uuidv4(),
                note: note
            }
            setNotes((notes) => [...notes, myNote])
            setNote('')
        } else alert('Note is empty!')
    }
    const delNote = (id) => {
        console.log(id)
        console.log(notes.filter((el) => el.id !== id))
        setNotes(notes.filter((el) => el.id !== id))
    }

    return (
        <div className={"app"}>
            <div className={"board"}>

                <ul>

                    {notes.map((note, index) => {
                        return <>
                            <li style={{margin: "5px 0 "}}>
                                <textarea className={"myNote"} defaultValue={note.note}/>
                                <button className={"noteButton"} onClick={() => delNote(note.id)}>del</button>
                                <button className={index !== 0 ? "noteButton" : "none"}>up</button>
                                <button className={index === notes.length - 1 ? "none" : "noteButton"}>down</button>
                            </li>
                        </>

                    })}


                    <li><input className={"noteInput"}
                               type={"text"}
                               value={note}
                               placeholder={"Your note"}
                               onChange={(event) => {
                                   setNote(event.target.value)
                               }}/>
                        <button className={"noteButton"} onClick={addNote}>ADD</button>
                    </li>
                </ul>

                {/*<ul>*/}
                {/*    {notes.map((note) => {*/}
                {/*        return <li>{note.note}</li>*/}
                {/*    })}*/}

                {/*</ul>*/}
                {/*{notes.map((note)=>{*/}
                {/*    return <div>{note.note}</div>*/}
                {/*})}*/}


            </div>
        </div>
    );
}

export default App;
