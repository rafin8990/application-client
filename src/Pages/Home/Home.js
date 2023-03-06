import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../../Navbar/Navbar';
import formpic from '../../assets/form.png'
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate()
    const [multipleImages, setMultipleImages] = useState([]);
    // console.log(multipleImages)


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

    const handleApplication = (data) => {

        const formData = new FormData();
        const date =new Date()
        for (let i = 0; i < data.files.length; i++) {
            formData.append("files", data.files[i]);
            formData.append("name", data.name);
            formData.append("mobile", data.mobile)
            formData.append("application", data.application)
            formData.append("time", date)
        }
        fetch('http://localhost:5000/application', {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.acknowledged) {
                    console.log(imageData)
                    alert('Your Application Successfully Submitted')
                    reset();
                    navigate('/welcome')
                }

            })

    }


    return (
        <div>
            <Navbar></Navbar>
            <div>
                <h1 className='my-20 text-center font-bold text-4xl text-emerald-900'>Submit Your Application from here </h1>
            </div>
            <div className='md:flex'>
                <div>
                    <img src={formpic} alt="" />
                </div>
                <div className=' mt-15 flex justify-center items-center'>
                    <form onSubmit={handleSubmit(handleApplication)} className=' w-[500px] p-10'>
                        <div className=" my-2 w-full">
                            <p>
                                <span className="">Name</span>
                            </p>
                            <input {...register("name", { required: "Name is required" })} type="text" placeholder="Enter Your Name" className=" p-3 border border-gray-500 rounded-lg w-full " />
                            {errors.name && <p className="text-red-600">{errors.name?.message}</p>}
                        </div>
                        <div className="my-2 w-full">
                            <p>
                                <span className="">Mobile Number</span>
                            </p>
                            <input {...register("mobile", { required: "Mobile Number is required" })} type='text' placeholder="Enter Mobile No " className="  p-3 border border-gray-500 rounded-lg w-full " />
                            {errors.mobile && <p className="text-red-600">{errors.mobile?.message}</p>}
                        </div>
                        <div className="my-2 w-full">
                            <p className='my-2'>Application Details:</p>
                            <textarea {...register("application", { required: "Application details is required" })} placeholder="Write Your Application" className='p-10 border border-gray-500 rounded-lg w-full'></textarea>
                            {errors.application && <p className="text-red-600">{errors.application?.message}</p>}
                        </div>
                        {render(multipleImages)}
                        <div className="my-2 w-full">
                            <p className='my-2'>Enter Your Picture (OUTWARDS):</p>
                            <input type="file" {...register("files", { required: "Image Upload is required" })} onChange={changeMultipleFiles} accept="image/*" className='p-5 border border-gray-500 rounded-lg w-full' multiple />
                            {errors.files && <p className="text-red-600">{errors.files?.message}</p>}

                        </div>
                        <div>
                            <button className='border border-violet-500 text-white bg-violet-500 px-4 py-2 rounded-lg w-full my-5' type="submit"> Submit Application</button>
                        </div>

                    </form>
                </div>
            </div>


        </div>
    );
};

export default Home;
