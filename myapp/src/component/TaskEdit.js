
import { useEffect, useState } from "react";
import "../assets/style/edit.scss";
import CloseButton from 'react-bootstrap/CloseButton';
import axios from "axios";

export default function TaskEdit({ id, setShow }) {

    const [data, setData] = useState()

    function handleEdit(e) {
        e.preventDefault()
        axios
            .patch("http://localhost:8080/", { ...data, id })
            .then((respons) => alert('successful'))
            .catch((respons) => console.log(respons));
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/task/${id}`).then(res => setData(res.data.data))
            .catch(err => console.log(err))
    }, [])

    function handleClose() {
        setData(false)
        setShow(false)
    }

    return (
        <div className="main__div" onClick={handleClose}>
            <div onClick={(e) => e.stopPropagation()}>
                <div className="edit__header">
                    <h1>Edit task</h1>
                    <CloseButton aria-label="Hide" onClick={handleClose} />
                </div>

                <section className="edit">
                    {data ? <form onSubmit={handleEdit}>
                        <label htmlFor="title">Enter Task Title</label>
                        <input
                            type="text"
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            name="title"
                            id="title"
                            value={data.title}
                            required
                        />
                        <label htmlFor="description">Enter Task description</label>
                        <textarea
                            id="description"
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            name="description"
                            value={data.description}
                            required
                        ></textarea>
                        <div className="radio">
                            <input
                                type="radio"
                                onChange={() => setData({ ...data, status: false })}
                                name="done"
                                id="notdone"
                                checked={!data.status}
                                required
                            />
                            <div className="red">
                                <label htmlFor="notdone"> Not Done</label>
                            </div>
                        </div>
                        <div className="radio">
                            <input
                                onChange={() => setData({ ...data, status: true })}
                                type="radio"
                                name="done"
                                id="done"
                                checked={data.status}
                                required
                            />
                            <div className="green">
                                <label htmlFor="done"> Done</label>
                            </div>
                        </div>
                        <input type="submit" value="Edit" />
                    </form> : 'Loading...'}
                </section>
            </div>
        </div>
    );
}
