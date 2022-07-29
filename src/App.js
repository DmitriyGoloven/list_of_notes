import './App.css';

function App() {
    return (
        <div className="App">
            <div className={"board"}>
            <input type={"text"}
                   name={"note"}
                   placeholder={"your note"}/>
            <button className={"noteButton"}>Add</button>
        </div>
</div>
);
}

export default App;
