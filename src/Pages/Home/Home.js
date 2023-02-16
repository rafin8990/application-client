import React from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../../Navbar/Navbar';
import formpic from '../../assets/form.png'
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate()

    const imageHostKey = process.env.REACT_APP_imageBB_key
    // const pictureHostKey=process.env.REACT_APP_picture_key

    const handleApplication = (data) => {
        const formData = new FormData();
        const formData2 = new FormData();
       
        const image = data.image[0];
        const pic=data.picture[0];
        formData.append('image', image);
        formData2.append('image', pic)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        // const picUrl =`https://api.imgbb.com/1/upload?key=${imageHostKey}`
        // const picUrl =`https://api.imgbb.com/1/upload?key=${pictureHostKey}`
        // console.log(picUrl)
        
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    fetch(url, {
                        method: "POST",
                        body: formData2
                    })
                        .then(res => res.json())
                        .then(imgData => {
                            if (imgData.success) {
                                const name = data.name;
                                const mobile = data.mobile;
                                const application = data.application;
                                const imageUrl = imageData.data.url;
                                const picture=imgData.data.url;
                                const form = {
                                    name, mobile, application, imageUrl, picture
                                }
                                fetch('https://application-server-nine.vercel.app/application', {
                                    method: 'POST',
                                    headers: {
                                        "content-type": "application/json"
                                    },
                                    body: JSON.stringify(form)
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.acknowledged) {
                                            alert('Application added successfully')
                                            reset()
                                            navigate('/welcome')
                                        }

                                    })
                            }
                        })

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
                            <input {...register("mobile", { required: "Mobile Number is required" })} type='text' placeholder="Enter Mobile No with country code" className="  p-3 border border-gray-500 rounded-lg w-full " />
                            {errors.mobile && <p className="text-red-600">{errors.mobile?.message}</p>}
                        </div>
                        <div className="my-2 w-full">
                            <p className='my-2'>Application Details:</p>
                            <textarea {...register("application", { required: "Application details is required" })} placeholder="Write Your Application" className='p-10 border border-gray-500 rounded-lg w-full'></textarea>
                            {errors.application && <p className="text-red-600">{errors.application?.message}</p>}
                        </div>
                        <div className="my-2 w-full">
                            <p className='my-2'>Enter Your Picture:</p>
                            <input {...register("image", { required: "Image Upload is required" })} accept="image/*" className='p-5 border border-gray-500 rounded-lg w-full' placeholder='' type="file" />
                            {errors.image && <p className="text-red-600">{errors.image?.message}</p>}
                        </div>
                        <div className="my-2 w-full">
                            <p className='my-2'>Enter Your Picture:</p>
                            <input {...register("picture", { required: "Image Upload is required" })} accept="image/*" className='p-5 border border-gray-500 rounded-lg w-full' placeholder='' type="file" />
                            {errors.picture && <p className="text-red-600">{errors.picture?.message}</p>}
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