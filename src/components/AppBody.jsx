import { useEffect, useReducer, useState } from "react";
import { WordsContext } from "../contexts/Context";
import TitleText from "./TitleText";
import WordForm from "./WordForm";
import WordList from "./WordList";
import { useLocation } from "react-router-dom";

export default function AppBody() {
    const [words, wordsDispatcher] = useReducer(wordsReducer, []);
    const [editDetails, editSetter] = useState({id: 0, earthWord: '', alienWord: '', category: '', flag: false});
    const [share, setShare] = useState({state:false, id:null});
    const location = useLocation();
    

    useEffect(() => {
        console.log("LOCATION", location.pathname);
        fetch("http://localhost:7070/share", {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log("SHARE DATA", data);
                
                
                let match = false
                let dex = -1;

                data.forEach((element, index) => {
                    let elementLocation = '/'+element.link;
                    console.log('LOOPING',elementLocation);
                    if(elementLocation === location.pathname){
                        match = true;
                        dex = index;
                        console.log("MATCHED", element);
                    }
                });

                if(match){
                    wordsDispatcher({ type: "SET_WORDS", payload: data[dex].data });
                }

                else{
                    fetch("http://localhost:7070/words", {method: 'GET'})
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("GOT DATA", data);
                        wordsDispatcher({ type: "SET_WORDS", payload: data });
                        
                    }).catch((err)=>console.log(err));

        }





    });
        
    }, []);

    
    function addShare(){
        if(words.length > 0){
            fetch("http://localhost:7070/share", {method: 'POST',     headers: {
                "Content-type": "application/json; charset=UTF-8"
            }, body: JSON.stringify({data: words})}).then(response => response.json()).then(data =>
                {
                    setShare({state:true, id:data.link});
                }
            );
        }

        
    }

    function wordsReducer(state, action) {
        let ret;
        switch (action.type) {
            case "ADD_WORD":
                ret = [...state, action.payload];
                console.log('added', ret);
                return ret;
            case "SET_WORDS":
                ret = action.payload;
                console.log('set', ret);
                return ret;

            case "DELETE_WORD":
                ret = state.filter((word) => word.id !== action.payload);
                console.log('deleted', ret);
                return ret;
                
            
                


            default:
                return state;
        }
    }

    return (
        <WordsContext.Provider value={{ words, wordsDispatcher }}>
            <div className="AppBody">    
                <div className="grid grid-cols-1 gap-4">
                    <TitleText text="Contribute To Our 👽 Alien Dictionary!!🛸"></TitleText>
                    <div className="flex justify-center space-x-0 min-w-full">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2" onClick={addShare}>Share</button>
                        {share.state ? (<button onClick={() => {
                            navigator.clipboard.writeText(`http://localhost:3000/${share.id}`);
                            alert("Link copied to clipboard!");
                            }
                        }
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 flex items-center"> Link
                        <p className="font-light text-sm ml-1">({share.id})</p></button>) : null}
                    </div>


                    <WordForm id={editDetails.id} alienWord={editDetails.alienWord} earthWord={editDetails.earthWord} category={editDetails.category} flag={editDetails.flag} editSetter={editSetter}></WordForm>
                    <h1 className="text-center text-2xl font-bold text-green-500">Words List</h1>
                    <WordList  edit = {editDetails} editSetter={editSetter}></WordList>
                </div>
            </div>
        </WordsContext.Provider>
    );
}