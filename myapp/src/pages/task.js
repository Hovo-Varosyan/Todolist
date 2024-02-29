import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../assets/style/task.scss'
import server from '../api/api';

function Task (){

    const [data, setData] = useState()
    const { id } = useParams()

    useEffect(() => {
        server(`/task/${id}`).then(res => setData(res.data.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            {data && <main className='task__main user__container'>

                <h1>{data.title}</h1>
                <div>
                    <span className={data.status ? 'green' : 'red'}>{String(data.status)}</span>
                    <p>{data.description}</p>
                </div>
            </main>}
        </>
    )
}
export default Task
