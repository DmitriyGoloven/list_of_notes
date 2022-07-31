import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from "uuid";


const OneNote = ({notes, id, index, setNotes}) => {

    const [note, setNote] = useState(" ")
    const [list, setList] = useState(notes.find(note => note.id === id).subList)

    useEffect(() => {

        const listNotes = [...notes]
        listNotes[index].subList = list
        setNotes(listNotes)

    }, [list])

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

    const delNote = (id) => {
        setList(list.filter((el) => el.id !== id))
    }

    const moveUp = (index) => {
        let notesList = [...list]
        let item = notesList[index - 1]
        notesList[index - 1] = notesList[index]
        notesList[index] = item
        setList(notesList)
    }

    const moveDown = (index) => {
        let notesList = [...list]
        let item = notesList[index + 1]
        notesList[index + 1] = notesList[index]
        notesList[index] = item
        setList(notesList)
    }

    const addSublist = (id, index) => {
        const listNotes = [...list]
        listNotes[index].subList = []
        setList(listNotes)
    }

    const delSublist = (id, index) => {
        const listNotes = [...list]
        delete listNotes[index].subList
        setList(listNotes)
    }

    return (
        <div>
            <ul key={list.length}>

                {list.map((note, index) => {
                    return (<li key={note.id} style={{margin: "5px 0 "}}>
                            <textarea className={"myNote"} defaultValue={note.note}/>
                            <button className={"noteButton"}
                                    onClick={() => delNote(note.id)}>del
                            </button>

                            <button className={index !== 0 ? "noteButton" : "none"}
                                    onClick={() => moveUp(index)}>up
                            </button>

                            <button className={index === list.length - 1 ? "none" : "noteButton"}
                                    onClick={() => moveDown(index)}>down
                            </button>

                            <button className={note.subList ? "none" : "noteButton"}
                                    onClick={() => addSublist(note.id, index)}>+ SL
                            </button>

                            <button className={note.subList ? "noteButton" : "none"}
                                    onClick={() => delSublist(note.id, index)}>- SL
                            </button>

                            <br/>
                            <ul>
                                {note.subList && <OneNote notes={list}
                                                          id={note.id}
                                                          index={index}
                                                          setNotes={setList}/>
                                }
                            </ul>

                        </li>
                    )
                })}

                {input()}
            </ul>

        </div>

    );
}
export default OneNote;