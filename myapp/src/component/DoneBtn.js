import axios from 'axios';
import React, { memo, useState } from 'react'
import AlertMessage from './Alert';
import { useDispatch } from 'react-redux';
import { done } from '../store/Todostore';

function DoneBtn({ id, status }) {
    const [message, setMessage] = useState([])
    const dispatch = useDispatch()

    function handleDone() {
        const doneStatus = status === true ? false : true
        axios
            .post("http://localhost:8080/", { id, status: doneStatus })
            .then((response) => {
                dispatch(done(id))
                setMessage([response.data.message])
            })
            .catch((response) => console.log(response));
    }

    return (
        <>

            <button className={status ? 'table__green' : 'table__red'} onClick={handleDone}>
                {status ? " done" : "not done"}
            </button>

            {message.length > 0 ? <AlertMessage message={message} setMessage={setMessage} /> : null}
        </>
    )
}

export default memo(DoneBtn)