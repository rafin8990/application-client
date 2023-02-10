import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import ApplicationDetails from './ApplicationDetails';

const Application = () => {

    const [applications, SetApplications]=useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/application')
        .then(res=>res.json())
        .then(data=>SetApplications(data))
    },[])
    return (
        <div>
            <Navbar></Navbar>
            <div>
                {
                    applications.map(app=><ApplicationDetails
                    key={app._id}
                    app={app}
                    
                    ></ApplicationDetails>)
                }
            </div>
        </div>
    );
};

export default Application;