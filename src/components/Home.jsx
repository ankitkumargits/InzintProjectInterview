import React, { useEffect, useState } from 'react'
import Users from './Users';

const Home = () => {

    const [ data, setData ] = useState([]);

    const fetchData = () => {
        fetch("/users")
        .then((res)=> { return res.json();})
        .then((data)=> {
            // console.log(data);
            setData(data);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (deletedId) => {
        // Update the details state by removing the deleted item
        setData(prevDetails => prevDetails.filter(detail => detail._id !== deletedId));
    };
    
    return (
        <>
            <h1>Home page</h1>
            <Users details={data} onDelete={handleDelete}/>
        </>
    )
}

export default Home