import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./Counter";

function App() {
  const [students, setStudents] = useState([
    { id: 1, firstname: "John", lastname: "Doe", absent: undefined },
    { id: 2, firstname: "Jane", lastname: "Doe", absent: undefined },
    { id: 4, firstname: "Nick", lastname: "Smith", absent: undefined },
  ]);

  const [count, setCount] = useState(0);

  function handleOnClick() {
    setCount((count) => count + 1);
  }

  function toggleAbsent(id) {
    //we want to toggle the absent property of the student
    //challenge: we have to set the entire list anew + the change within the list
    console.log("clicked:", id);

    const newList = students.map((student) => {
      console.log(`${student.id} === ${id}`);
      return student.id === id
        ? {
            ...student,
            absent:
              student.absent === undefined || student.absent === true
                ? false
                : true,
          }
        : student;
    });

    console.log(newList);

    setStudents(newList);
  }

  function handleAddStudent() {
    setStudents([
      ...students,
      {
        id: Math.random().toString(36).substring(2),
        firstname: "Kent",
        lastname: "Mill",
        absent: undefined,
      },
    ]);
  }

  function handleRemoveStudent(id) {
    console.log(id);
    setStudents(
      students.filter((student) => (student.id === id ? false : true))
    );
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>State lifting up</h1>
      <Counter count={count} onClick={handleOnClick} />
      <div className="card">
        <p>
          Current count is at: <code>{count}</code>.
        </p>
      </div>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.firstname} {student.lastname}{" "}
            <span onClick={() => toggleAbsent(student.id)}>
              {student.absent === true
                ? "✅"
                : student.absent === false
                ? "✖️"
                : "🟣"}
            </span>
            <button onClick={() => handleRemoveStudent(student.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddStudent}>add new student</button>
    </>
  );
}

export default App;
