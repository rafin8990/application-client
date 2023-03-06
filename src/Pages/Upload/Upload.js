import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Upload = () => {
    const updatedData = useLoaderData();
    // console.log(updatedData)
    const { _id } = updatedData;

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate()
    const [multipleImages, setMultipleImages] = useState([]);

    const changeMultipleFiles = (e) => {
        if (e.target.files) {
            const imageArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setMultipleImages((prevImages) => prevImages.concat(imageArray));
        }
    };

    const render = (data) => {
        return data.map((image) => {
            return <img className="image" src={image} alt="" key={image} />;
        });
    };

    const handleUpdate = (data) => {
        const formData = new FormData();
        for (let i = 0; i < data.files.length; i++) {
            formData.append("picture", data.picture[i]);
        }
        fetch(`http://localhost:5000/update/${_id}`,  {
            method:"PUT",
            headers:{
                "content-type":"multipart/form-data"
            },
            body:JSON.stringify(formData)
            
        })
        .then(res=>res.json())
        .then(updateData=>{
            console.log(updateData)
            alert('inword picture successfully uploaded')
        })


    }

    return (
        <div className='md:h-[600px] flex justify-center items-center'>
            <form onSubmit={handleSubmit(handleUpdate)} className='md:w-1/3  p-10 border rounded-lg shadow-lg' >
                <div className="my-2 w-full">
                   
                    <p className='my-2'>Enter Your Picture (INWARDS):</p>
                    <input {...register("picture")} accept="image/*" multiple onChange={changeMultipleFiles} className='p-5 border border-gray-500 rounded-lg w-full' placeholder='' type="file" />
                    {errors.picture && <p className="text-red-600">{errors.picture?.message}</p>}
                    {render(multipleImages)}
                </div>
                <div>
                    <button className='border border-violet-500 text-white bg-violet-500 px-4 py-2 rounded-lg w-full my-5' type="submit">Upload Picture</button>
                </div>
                
            </form>
        </div>
    );
};

export default Upload;