import "./styles.css";
import React, { useState } from "react";
/*
Coding Challenge Rules:

1. Create a react application that allows users to click the screen and leave a dot (10px x 10px)

2. create an "undo" button that allows users to remove the last dot.
  * it can be clicked as many times as needed. (until all dots are removed.)

3. create a "redo" button that puts the dots back on the screen.
  * it can be clicked as many times as needed. (until all dots are restored.)

  https://www.youtube.com/watch?v=D36HU7LpTCk&list=PLimOuyQgYUlZgT_QW0Hoyzk0yHYsGbi4j&index=2
  */

export default function App() {
  const [dots, setDots] = useState([]);
  const [stack, setStack] = useState([]);

  function handleUndo(e) {
    if (dots.length === 0) return;

    e.preventDefault();

    let newDots = [...dots];
    let removeDot = newDots.pop();

    setStack([...stack, removeDot]);
    setDots(newDots);
  }

  function handleRedo(e) {
    if (stack.length === 0) return;

    let newDots = [...dots];
    let newStack = [...stack];
    newDots.push(newStack.pop());

    setStack(newStack);
    setDots(newDots);
  }

  function handleClick(e) {
    console.log(e.clientX, e.clientY, e);
    setDots([...dots, { x: e.clientX, y: e.clientY }]);
  }

  return (
    <div className="App">
      <h1>ReactJS-DotUndoRedo</h1>
      <div className="btn-container">
        <button type="click" onClick={(e) => handleUndo(e)}>
          Undo
        </button>

        <button type="click" onClick={(e) => handleRedo(e)}>
          Redo
        </button>
      </div>

      <div className="click-container" onClick={(e) => handleClick(e)}>
        {dots.map((item, i) => {
          const { x, y } = item;

          return (
            <div
              key={`dot-${i}`}
              style={{ left: x, top: y }}
              className="dot"
            ></div>
          );
        })}
      </div>
    </div>
  );
}
