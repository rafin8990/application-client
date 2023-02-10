import React from 'react';

const ApplicationDetails = ({app}) => {

    const {name, imageUrl,mobile, application}=app;
    return (
        <div className='mt-20 border p-10'>
            <div className='flex justify-center'>
                <img className='w-96' src={imageUrl} alt="" />
            </div>
            <div>
                <h1 className='text-xl text-center mt-10'>Applicants Name: {name}</h1>
                <h1 className='text-xl text-center my-5'>Applicants Mobile No: {mobile}</h1>
            </div>
            <div>
                <h1 className='text-3xl text-emerald-900 text-center'>Application :</h1>
                <p className='text-center mt-5'>{application}</p>
            </div>
        </div>
    );
};

export default ApplicationDetails;