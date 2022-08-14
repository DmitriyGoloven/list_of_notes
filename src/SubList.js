import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from "uuid";


const SubList = ({notes, id, index, setNotes}) => {

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
                note: note,
                class : 'myNoteList'
            }
            setList((list) => [...list, myNote])
            setNote('')

        } else alert('Note is empty!')
    }

    const doneSubNote = (note, id)=>{
        note.class === 'myNoteList' ? note.class = 'completed' : note.class = 'myNoteList'
        const notesList = [...list]
        notesList[id] = note
        setList(notesList)
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
            <ul key={list.length} style={{marginTop:"10px"}}>

                {list.map((note, index) => {
                    return (<li key={note.id}>

                            <input type={'checkbox'}
                                   readOnly checked={note.class !== 'myNoteList'}
                                   disabled={note.class === 'myNoteList'}
                                   style={{width:"22px", opacity:"20%"}}/>
                            <textarea readOnly
                                      className={note.class}
                                      defaultValue={note.note}
                                      onClick={()=>doneSubNote(note, index)}/>
                            <div className={"butGroup"}>
                                <button className={"noteButton"}
                                        onClick={() => delNote(note.id)}>×
                                </button>

                                <button className={index !== 0 ? "noteButton" : "none"}
                                        onClick={() => moveUp(index)}>⇑
                                </button>

                                <button className={index === list.length - 1 ? "none" : "noteButton"}
                                        onClick={() => moveDown(index)}>⇓
                                </button>

                                <button className={note.subList ? "none" : "noteButton"}
                                        onClick={() => addSublist(note.id, index)}>+SL
                                </button>

                                <button className={note.subList ? "noteButton" : "none"}
                                        onClick={() => delSublist(note.id, index)}>-SL
                                </button>
                            </div>

                            <ul>
                                {note.subList && <SubList notes={list}
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
export default SubList;