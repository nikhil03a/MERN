import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const Record = (props) => {
    return (
        <tr>
            <td>{props.record.name}</td>
            <td>{props.record.position}</td>
            <td>{props.record.level}</td>
            <td>
                <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link>
                <button className='btn btn-link' onClick={() => { props.deleteRecord(props.record._id) }}>Delete</button>
            </td>
        </tr>
    )
};
const RecordList = () => {
    const [records, setRecords] = useState([]);
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`);
            if (!response.ok) {
                const message = `An error occured ${response.statusText}`
                window.alert(message);
                return;
            }
            const records = await response.json();
            setRecords(records);
        }
        getRecords();
    }, [records.length])
    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE",
            params:{
                id:id
            }
        })
        const newRecords = records.filter((ele) => ele._id != id)
        setRecords(newRecords);
    }
    function recordlist() {
        return (
            records.map((record) => {
                return (
                    <Record record={record} deleteRecord={() => deleteRecord(record._id)}
                        key={record.id} />
                )
            })
        )
    }
    return (
        <div>
            <h3>Record List</h3>
            <table className='table table-stripped' style={{marginTop:20}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {recordlist()}
                </tbody>
            </table>
        </div>
    )
}

export default RecordList
