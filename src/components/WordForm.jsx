import { useEffect, useContext, useState } from "react";
import { WordsContext } from "../contexts/Context";

export default function WordForm({
  earthWord,
  alienWord,
  category,
  id,
  flag,
  editSetter,
}) {
  const { words, wordsDispatcher } = useContext(WordsContext);
  const [inputs, setInputs] = useState({
    earthWord: earthWord,
    alienWord: alienWord,
    category: category,
    id: id,
  });

  useEffect(() => {
    setInputs({ earthWord, alienWord, category, id });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("PRESSED");
    if (inputs.earthWord && inputs.alienWord && inputs.category) {
      const newWords = {
        earthWord: inputs.earthWord,
        alienWord: inputs.alienWord,
        category: inputs.category,
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
          setInputs({
            earthWord: "",
            alienWord: "",
            category: "",
            id: 0,
          });
        });

      if (flag) {
        editSetter({
          id: 0,
          earthWord: "",
          alienWord: "",
          category: "",
          flag: false,
        });
      }
    }
  };
  function getAndSetRandomName() {
    fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((response) => response.json())
      .then((data) => {
        setInputs((inputs) => ({ ...inputs, alienWord: data[0] }));
      });
  }

  function handleChange(e) {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  }

  return (
    <div className="word-input-container text-black-100">
      <form
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1>{flag ? "Update a word!" : "Enter a new translated word!!🔁"}</h1>
        <div className="mb-4">
          <label
            htmlFor="earthWord"
            className="block text-gray-700 font-semibold mb-2"
          >
            Human Word:
          </label>
          <input
            type="text"
            id="earthWord"
            name="earthWord"
            placeholder="Enter Human Words"
            value={inputs["earthWord"]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2">
            <label htmlFor="alienWord" className="text-gray-700 font-semibold">
              Alien Word:
            </label>
            <button
              className="text-md text-gray-500 h-6 w-6 flex items-center justify-center hover:bg-gray-100 rounded-full focus:outline-none"
              onClick={getAndSetRandomName}
            >
              🎲
            </button>
          </div>

          <textarea
            id="alienWord"
            name="alienWord"
            placeholder="Enter Alien Words"
            value={inputs["alienWord"]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-semibold mb-2"
          >
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={inputs["category"]}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Greetings">Greetings</option>
            <option value="Food">Food</option>
            <option value="Space Objects">Space Objects</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-ring-500 ${
              inputs.category ? "" : "opacity-50 cursor-not-allowed"
            }`}
          >
            {flag ? "Update Word" : "Add Translation"}
          </button>
        </div>
      </form>
    </div>
  );
}
