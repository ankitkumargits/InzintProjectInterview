import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Users = (props) => {
    const { details} = props;
    console.log(details.image)

    const [image, setImage] = useState("");

    const handleDelete = (id) => {
        console.log(id)
        fetch(`/users/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json"}
        }).then((res)=> { return res.json(); })
        .then((data)=> {
            // console.log(data);
            props.onDelete(data.DeleteId._id);
        });
    }
    return (
        <>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Quote</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    details.map((detail, i)=> (
                        <tr key={detail._id}>
                        <th scope="row">{i+1}</th>
                        <td>
                        <img src={`/images/${detail.image}`} alt="loading..." width="100px" height="100px"/>
                        </td>
                        <td>{detail.name}</td>
                        <td>{detail.email}</td>
                        <td>{detail.phone}</td>
                        <td>{detail.quote}</td>
                        <td>
                            <button type="submit" className='btn btn-danger' onClick={()=> handleDelete(detail._id)}>Delete</button>
                        </td>
                        </tr>
                    ))
                }
            </tbody>
</table>
        </>
    )
}

export default Users