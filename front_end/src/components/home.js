import React from "react";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function Home() {
    const [data, setData] = useState([])

    const [useData, setUseData] = useState("");

    useEffect(() => {
        fetch(`/api`)
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
            })
            
            .then(jsonRes => {
                setData(jsonRes)
            })
    }, []);

    function handleChange(event){
        setUseData(event.target.value);
    }


    return (<div align ="center">
        <div className="box" id="heading">
            <h1>Today</h1>
        </div>
        <div className="box">

        {data.length > 0 && data.map((e, i) =>
        <form key={i} action="/api/delete" method="post">
           <div className="item" key={i}>
               <button type="submit" name="del" value={e._id}><DeleteOutlineIcon /></button>
               <p key={i}>{e.name}</p>
               <input type="hidden" name="listName"></input>
            </div>
        </form>
        )}

        <form className="item" action="/api" method="post">
         <input type="text" name="newItem" autoComplete="off" placeholder="New Item" value={useData} onChange={handleChange}></input>
         <button type="submit" className="add" name="list">+</button>
        </form>  

        </div>   
    </div>);
}

export default Home;