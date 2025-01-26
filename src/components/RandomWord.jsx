import { useContext } from "react";
import { WordsContext } from "../contexts/Context";

export default function RandomWord() {

    const { wordsDispatcher } = useContext(WordsContext)

    const genRandomWord = () => {
        const category = ['Food', 'Space Objects', 'Greetings']
        fetch("https://random-word-api.herokuapp.com/word?number=2")
            .then((response) => response.json())
            .then((word) => {
                
            
                const newWords = {
                    earthWord: word[0],
                    alienWord: word[1],
                    category: category[Math.floor(Math.random() * category.length)],
                  };

            fetch("http://localhost:7070/words", {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify(newWords),
                  })
                    .then((response) => response.json())
                    .then((word) => {
                      newWords.id = word.id;
                      wordsDispatcher({ type: "ADD_WORD", payload: newWords });
                    });
    });
}

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
            <button onClick={genRandomWord} className="min-w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Generate Random Word</button>
        </div>
    );
}