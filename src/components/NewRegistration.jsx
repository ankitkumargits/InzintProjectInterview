import React, { useState } from 'react'

const NewRegistration = () => {
    const [form, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [image, setImage] = useState("");
    const [quote, setQuote] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(e.target.files[0]);
        // if(name.image || value.image){
        //     if(file.type !== "image/jpeg"){
        //         setMessage("Please upload a JPEG image")
        //     }else {
        //         setMessage("Failed to upload");
        //     }
        // }
        // if(name.quote || value.quote){
        //     if(file.type !== "text/plain"){
        //         setMessage("Please upload a text file")
        //     }else {
        //         setMessage("Failed to upload");
        //     }
        // }

        setFormData((prev)=> {
            setMessage("");
            return { ...prev,[name]: value}
        })
    }

//     const handleSubmitForm = (e) => {
//         e.preventDefault();
//         // if(form.name === "" || form.email === "" || form.phone === "" || quote || image){
//         //     setMessage("Please enter empty field");
//         // }
//         const formData = new FormData();
//         formData.append('image', image);
//         formData.append('name', form.name);
//         formData.append('email', form.email);
//         formData.append('phone', form.phone);
//         formData.append('quote', quote);
//         console.log(quote);
//         if(image.type !== 'image/jpeg' && quote.type !== 'text/plain'){
//             setMessage('Please upload a JPEG image');
//         }else {
//         fetch("/new-registration", {
//             method: "POST",
//             body: formData
//         }).then((res)=> {return res.json();})
//         .then((data)=> {
//             if(data){
//                 if(data.message === 'Registration successfully'){
//                     setMessage("Registration successfully");
//                 }else if(data.message === 'User already exists'){
//                     setMessage("User already exists");
//                 }else {
//                     setMessage("Try again...");
//                 }
//             }
//         })
//     }
// }

const handleSubmitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('quote', quote);

    let validationErrors = [];

    if (form.name.trim() === "") {
        validationErrors.push("Name is required");
    } else {
        const sanitizedName = form.name.trim().toLowerCase();
        if (!/^[^aeou]+$/i.test(sanitizedName)) {
            validationErrors.push("Name can only contain consonants and 'i'");
        }
    }

    if (form.email.trim() === "") {
        validationErrors.push("Email is required");
    }

    if (form.phone.trim() === "") {
        validationErrors.push("Phone is required");
    }

    if (image && image.type !== 'image/jpeg') {
        validationErrors.push("Please upload a JPEG image");
    }

    if (quote && quote.type !== 'text/plain') {
        validationErrors.push("Please upload a plain text quote");
    }


    if (validationErrors.length > 0) {
        const errorMessage = validationErrors.join("\n");
        setMessage(errorMessage);
    } else {
        fetch("/new-registration", {
            method: "POST",
            body: formData
        }).then((res) => res.json())
        .then((data) => {
            if (data) {
                if (data.message === 'Registration successfully') {
                    setMessage("Registration successfully");
                } else if (data.message === 'User already exists') {
                    setMessage("User already exists");
                } else {
                    setMessage("Try again...");
                }
            }
        });
    }
};


    // const handleUpload = (e) =>{
        
    //     console.log(image)

    //     const formData = new FormData();
    //     formData.append('image', image);

    //     fetch("/uploadImages", {
    //         method: "POST",
    //         body: formData
    //     }).then((res)=> {return res.json()})
    //     .then((data)=> {
    //         console.log(data);
    //     })
    //     .catch(error => {
    //         console.error('An error occurred:', error);
    //     });
    // }

    return (
        <>
        <section id='new-registration'>
        <div className="container">
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <section>
                                <div>
                                    <h2 className='text-center'>Login</h2>
                                </div>
                                <div className="my-3">
                                    <h3 className='text-center text-danger'> {message} </h3>
                                </div>
                                <form method='post' onSubmit={handleSubmitForm}>
                                    <div className='mb-3'>
                                        <label>Image</label>
                                        <input type="file" name="image"  onChange={(e)=>setImage(e.target.files[0])}/>
                                    </div>
                                    <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="name" name="name" onChange={handleChange}/>
                                    <label htmlFor="floatingInput">Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' onChange={handleChange}/>
                                    <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                    <input type="tel" className="form-control" id="floatingInput" placeholder="Enter your phone number" name='phone' onChange={handleChange}/>
                                    <label htmlFor="floatingInput">Phone</label>
                                    </div>
                                    <div className='mb-3'>
                                        <label>Quote Txt File</label>
                                        <input type="file" name="quote" onChange={(e)=> setQuote(e.target.files[0])}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary form-control mb-3">Submit</button>
                                </form>
                            </section>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
        </section>
        </>
    )
}

export default NewRegistration