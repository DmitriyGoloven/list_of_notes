import './App.css';
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';

function App() {

    const [note, setNote] = useState(" ")
    const [notes, setNotes] = useState(
        JSON.parse(localStorage.getItem("notes")) || []
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
        setNotes(notes.filter((el) => el.id !== id))
    }

    const moveUp = (index) => {
        let notesList = [...notes]
        let item = notesList[index - 1]
        notesList[index - 1] = notesList[index]
        notesList[index] = item
        setNotes(notesList)
    }

    const moveDown = (index) => {
        let notesList = [...notes]
        let item = notesList[index + 1]
        notesList[index + 1] = notesList[index]
        notesList[index] = item
        setNotes(notesList)
    }

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


    const addSublist = (id) => {
        const element = notes.filter((el) => el.id === id)
        console.log(typeof element, element)
        element.push({id: 44444444, note: 'hjhjhjhjh'})


    }

    return (
        <div className={"app"}>
            <div className={"board"}>

                <ul key={notes.length}>
                    {notes.map((note, index) => {
                        return (<li key={note.id} style={{margin: "5px 0 "}}>
                                <textarea className={"myNote"} defaultValue={note.note}/>
                                <button className={"noteButton"}
                                        onClick={() => addSublist(note.id)}>+ SL
                                </button>
                                <button className={"noteButton"}
                                        onClick={() => delNote(note.id)}>del
                                </button>
                                <button className={index !== 0 ? "noteButton" : "none"}
                                        onClick={() => moveUp(index)}>up
                                </button>
                                <button className={index === notes.length - 1 ? "none" : "noteButton"}
                                        onClick={() => moveDown(index)}>down
                                </button>
                            </li>
                        )
                    })}

                    {input()}
                </ul>

            </div>
        </div>
    );
}

export default App;
