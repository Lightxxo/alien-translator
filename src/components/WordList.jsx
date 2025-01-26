import { useContext } from "react";
import { WordsContext } from "../contexts/Context";



export default function WordList({edit ,editSetter}) {
    const {words, wordsDispatcher} = useContext(WordsContext);

    function handleDelete(id){
        console.log('Hander DELETING ID:', id)
        fetch(`http://localhost:7070/words/${id}`, {method: 'DELETE'})
        .then(response => response.json())
        .then(json => console.log(json));
        wordsDispatcher({type: 'DELETE_WORD', payload: id});
    }

    function handleEdit(word){
        console.log('Hander EDITING WORD:', word)
        editSetter({id: word.id, earthWord: word.earthWord, alienWord: word.alienWord, category: word.category, flag: true});
        console.log('edit', edit)
        handleDelete(word.id);
         
    }

        
     
        

    return (
        <div>  
            <div className="grid grid-cols-1 gap-4">
            
                    {words.map((word, index) => (
                        
            <div key={word.alienWord + toString(index)} className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-auto my-4 hover:shadow-xl transition-all relative">
                <div className="absolute top-2 right-2 flex space-x-2">

                    <button className="text-blue-500 p-1 px-0 rounded-full hover:bg-blue-100 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={()=>handleEdit(word)}>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <button className="text-red-500 p-1  px-0 rounded-full hover:bg-red-100 focus:outline-none" onClick={()=>handleDelete(word.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <h2 className="text-xl font-bold text-black-500 mb-2">{word.earthWord} → {word.alienWord}</h2>
                <h3 className="text-xs text-zinc-500 text-center">Category:</h3>
                <h3 className="text-lg text-black-500">{word.category} {word.id}</h3>
        </div>


                    ))}
                
            </div>
        </div>
    );
}