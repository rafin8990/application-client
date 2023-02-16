import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';


const Dashboard = () => {

    const [Applications, setApplications] = useState([])

    useEffect(() => {
        fetch('https://application-server-nine.vercel.app/application')
            .then(res => res.json())
            .then(data => setApplications(data))
    }, [])
    return (
        <div>
            <Navbar></Navbar>
            <div className="overflow-x-auto mt-10">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>Serial No</th>
                            <th>Application Id</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Description</th>
                            <th>Image URL</th>
                            <th>Image URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Applications.map((Application, i) =><tr key={Application._id}>
                            <th>{i + 1}</th>
                            <td>{Application._id}</td>
                            <td>{Application.name}</td>
                            <td>{Application.mobile}</td>
                            <td>{Application.application}</td>
                            <td>{Application.imageUrl}</td>
                            <td>{Application.picture}</td>
                        </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Dashboard;