import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/Navbar';


const Dashboard = () => {

    const [Applications, setApplications] = useState([]);

    const [searchResults, setSearchResults] = useState([])
    console.log(searchResults)



    const handleSearch = (event) => {
        event.preventDefault();
        const mobile = event.target.mobile.value;
        const url = `http://localhost:5000/search?mobile=${mobile}`
        fetch(url)
            .then(res => res.json())
            .then(data => setSearchResults(data))
    }

    useEffect(() => {
        fetch('https://application-server-nine.vercel.app/application')
            .then(res => res.json())
            .then(data => setApplications(data))
    }, [])
    return (
        <div>
            <Navbar></Navbar>
            <div className='my-10 flex justify-center '>
                <form onSubmit={handleSearch}>
                    <input name='mobile' placeholder='Search with your Phone number' className='input input-bordered md:w-96' type="text" />
                    <button type='submit' className='btn btn-primary'>Search</button>
                </form>
            </div>
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
                    {
                        searchResults.length ?

                            <tbody>
                                {
                                    searchResults.map((result, i) => <tr key={result._id}>
                                        <th>{i + 1}</th>
                                        <td>{result._id}</td>
                                        <td>{result.name}</td>
                                        <td>{result.mobile}</td>
                                        <td>{result.application}</td>
                                        <td>{result.imageUrl}</td>
                                        <td>{result.picture}</td>
                                    </tr>)
                                }
                            </tbody>
                            :
                            <tbody>
                                {
                                    Applications.map((Application, i) => <tr key={Application._id}>
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
                    }
                </table>
            </div>

        </div>
    );
};

export default Dashboard;