import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateInword = () => {
    const navigate = useNavigate()
    const inwords = useLoaderData()
    const { files, applicationID } = inwords
    console.log(inwords)

    const handleInword = () => {
        fetch(`http://localhost:5000/update/${applicationID}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(files)
        })
            .then(res => res.json())
            .then(inwordData => {
                if (inwordData.acknowledged) {
                    console.log(inwordData)
                    navigate('/allapplication')
                }
            })
    }

    return (
        <div>
            <form onSubmit={handleInword} className='h-[600px] flex justify-center items-center'>
                <div>
                    <h1 className='text-2xl'>Your Inword Image Uploaded Successfully </h1>
                </div>
                <br />
                <button type='submit' className='text-blue-500 hover:underline'>Back to Application Page</button>
            </form>
        </div>
    );
};

export default UpdateInword;