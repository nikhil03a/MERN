import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const List = () => {
    const [listItems, setListItems] = useState([]);
    const [todo, setTodo] = useState({value: ""});
    const navigate = useNavigate();
    function handleChange(val) {
        return setTodo(prev => {
            return {...prev,...val};
        });
        console.log(todo);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const newTodo = {...todo};
        await fetch("http://localhost:5000/add", {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                "Content-Type": "application/json"
            }
        }).catch(error => {
            window.alert(error);
            return;
        })
        setTodo({value:""});
        navigate('/');
    }
    useEffect(() => {
        async function getRecords() {
            const result = await fetch('http://localhost:5000/list');
            if (!result.ok) {
                const message = `An error occured ${result.statusText}`
                window.alert(message);
                return;
            }
            const list = await result.json();
            setListItems(list);
        }
        getRecords();
    }, [listItems.length])

    function recordlist() {
        return (
            listItems.map((item) => {
                return (
                    <div>{item.value}</div>
                )
            })
        )
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=>handleChange({value:e.target.value})}></input>
                <input type="submit" value="Submit"></input>
            </form>
            <div>{recordlist()}</div>
        </>


    )
}



export default List
