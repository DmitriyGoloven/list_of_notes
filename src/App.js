import './App.css';
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import SubList from "./SubList";

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
                note: note,
                class : 'myNote'
            }
            setNotes((notes) => [...notes, myNote])
            setNote('')
        } else alert('Note is empty!')
    }
    const delNote = (id) => {
        setNotes(notes.filter((el) => el.id !== id))
    }

    const doneNote = (note, id)=>{
        note.class === 'myNote' ? note.class = 'completed' : note.class = 'myNote'
        const notesList = [...notes]
        notesList[id] = note
        setNotes(notesList)
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


    const addSublist = (id, index) => {
        const listNotes = [...notes]
        listNotes[index].subList = []
        setNotes(listNotes)
    }

    const delSublist = (id, index) => {
        const listNotes = [...notes]
        delete listNotes[index].subList
        setNotes(listNotes)
    }

    return (

        <div className={"app"}>
            <div className={"board"}>
                <h1>List of notes</h1>

                <ul key={notes.length}>

                    {notes.map((note, index) => {
                        return (<li key={note.id}>
                                <input type={'checkbox'}
                                       readOnly checked={note.class !== 'myNote'}
                                       disabled={note.class === 'myNote'}
                                style={{width:"22px", opacity:"50%"}}/>
                                <textarea readOnly
                                          className={note.class}
                                          defaultValue={note.note}
                                onClick={()=>doneNote(note, index)}/>

                                <div className={"butGroup"}>
                                    <button className={note.subList ? "none" : "noteButton"}
                                            onClick={() => addSublist(note.id, index)}>+SL
                                    </button>

                                    <button className={note.subList ? "noteButton" : "none"}
                                            onClick={() => delSublist(note.id, index)}>-SL
                                    </button>

                                    <button className={"noteButton"}
                                            onClick={() => delNote(note.id)}>??
                                    </button>

                                    <button className={index !== 0 ? "noteButton" : "none"}
                                            onClick={() => moveUp(index)}>???
                                    </button>

                                    <button className={index === notes.length - 1 ? "none" : "noteButton"}
                                            onClick={() => moveDown(index)}>???
                                    </button>
                                </div>

                                <ul>
                                    {note.subList && <SubList notes={notes}
                                                              id={note.id}
                                                              index={index}
                                                              setNotes={setNotes}

                                    />}
                                </ul>
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
