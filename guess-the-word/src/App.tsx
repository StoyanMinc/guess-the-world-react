import { useState } from "react";
import { words } from "./constants"

function App() {
    const wordToGuess = words[Math.floor(Math.random() * words.length)];
    const grid = Array.from({ length: 5 }, () =>
        Array.from({ length: 5 })
    );

    const [numberOfGuesses, setNumberOfGuesses] = useState<number>(0);
    const [currentGuess, setCurrentGuess] = useState<string>('');
    
    return (
        <div className="container">
            <div className="grid-container">
                {grid.map((row, ri) => (
                    <div className="row" key={ri}>
                        {row.map((_, ci) => (
                            <div className="cell" key={ci}></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
