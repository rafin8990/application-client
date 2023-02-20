import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Upload = () => {
    const updatedData=useLoaderData();
    console.log(updatedData)
    const {_id}=updatedData
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate()

    const imageHostKey = process.env.REACT_APP_imageBB_key;
    const handleUpdate = (data) => {
        const formData = new FormData();
        const image = data.image[0];
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const picture=imageData.data.url;
                    fetch(`http://localhost:5000/update/${_id}`, {
                        method:'PUT',
                        headers:{
                            "content-type":"application/json"
                        },
                        body:JSON.stringify(picture)
                    })
                    .then(res=>res.json())
                    .then(upload=>{
                        if(upload.acknowledged){
                            alert('Your Picture Upload successfully');
                            reset()
                            navigate('/dashboard')
                        }
                    })
                }
            })
    }

    return (
        <div className='md:h-[600px] flex justify-center items-center'>
            <form onSubmit={handleSubmit(handleUpdate)} className='md:w-1/3  p-10 border rounded-lg shadow-lg' >
                <div className="my-2 w-full">
                    <p className='my-2'>Enter Your Picture (OUTWARDS):</p>
                    <input {...register("image")} accept="image/*" className='p-5 border border-gray-500 rounded-lg w-full' placeholder='' type="file" />
                    {errors.image && <p className="text-red-600">{errors.image?.message}</p>}
                </div>
                <div>
                    <button className='border border-violet-500 text-white bg-violet-500 px-4 py-2 rounded-lg w-full my-5' type="submit">Upload Picture</button>
                </div>
            </form>
        </div>
    );
};

export default Upload;