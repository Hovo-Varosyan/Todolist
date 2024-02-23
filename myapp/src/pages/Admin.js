import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Admin() {
    const [data, setData] = useState()

    useEffect(() => {

        axios
            .get("http://localhost:8080/userlist")
            .then((respons) => setData(respons.data.data))
            .catch((respons) => {
                alert("error");
                console.log(respons);
            });

    }, [])
    console.log(data)
    return (
        <main>
            {data ? <table border='1' className="Table">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        data !== 'empty' ? data.map((e, i) => {
                           return <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                            </tr>
                        }) : <tr>{data}</tr>
                    }
                </tbody>
            </table> : 'Loading...'}
        </main>
    )
}

export default Admin