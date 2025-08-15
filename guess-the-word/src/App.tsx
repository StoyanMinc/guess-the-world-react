import { useEffect, useState } from "react";
import { words } from "./constants"

interface Word {
    value: string,
    description: string
}

function App() {

    const [wordToGuess] = useState<Word>(() => words[Math.floor(Math.random() * words.length)]);
    const [guesses, setGuesses] = useState<string[]>(Array(5).fill(""));
    const [currentRow, setCurrentRow] = useState<number>(0);
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [isGuessed, setIsGuessed] = useState<boolean>(false);

    const grid = Array.from({ length: 2 }, () => Array.from({ length: wordToGuess.value.length }));

    useEffect(() => {
        const typeHandler = (event: KeyboardEvent) => {
            if (currentRow === 2 || isGuessed) return
            const key = event.key;

            if (key === "Backspace") {
                setCurrentGuess((prev) => prev.slice(0, -1));
                return;
            }
            if (key === "Enter") {
                if (currentGuess.length === wordToGuess.value.length) {
                    setGuesses(prev => {
                        const newGuesses = [...prev];
                        newGuesses[currentRow] = currentGuess;
                        return newGuesses;
                    });
                    if (currentGuess === wordToGuess.value) {
                        setIsGuessed(true);
                        return
                    }
                    setCurrentRow(prev => prev + 1);
                    setCurrentGuess('');
                    return;
                }
            }
            if (/^[a-zA-ZА-Яа-я]$/.test(key) && currentGuess.length < wordToGuess.value.length) {
                setCurrentGuess((prev) => prev.length < wordToGuess.value.length ? prev + key : prev);
            }
        };
        window.addEventListener('keyup', typeHandler);

        return () => { window.removeEventListener('keyup', typeHandler) };
    }, [currentGuess, currentRow]);

    return (
        <div className="container">

            {currentRow === 2 || isGuessed
                ? <div className="game-over-message ">{isGuessed ? <p>Браво, ти победи!</p> : <p>Tи загуби! Верният отговор е <span>{wordToGuess.value}</span></p>}</div>
                : null}

            <div className="grid-container">
                {grid.map((row, ri) => (
                    <div className="row" key={ri}>
                        {row.map((_, ci) => {
                            const letter = currentRow === ri ? currentGuess[ci] : guesses[ri][ci];
                            let className = 'cell';
                            if (ri < currentRow || isGuessed) {
                                if (letter === wordToGuess.value[ci]) { className += ' correct'; }
                                else if (letter && wordToGuess.value.includes(letter)) { className += ' close'; }
                                else if (letter) { className += ' wrong'; }
                            }
                            return (
                                <div key={`${ri}${ci}`} className={className}>{letter}</div>
                            )
                        })}
                    </div>
                ))}
            </div>
            <div className="description">
                <p>{wordToGuess.description}</p>
            </div>
        </div>
    );
}

export default App;
