import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';


const Dashboard = () => {

    const [Applications, setApplications] = useState([]);

    const [searchResults, setSearchResults] = useState([]);





    const handleSearch = (event) => {
        event.preventDefault();
        const mobile = event.target.mobile.value;
        const url = `https://application-server-nine.vercel.app/search?mobile=${mobile}`
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
                            <th>Image URL (OUTWARDS)</th>
                            <th>Image URL (INWARDS)</th>
                            <th>Upload</th>
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
                                        <td className='text-blue-500 hover:underline' ><a href={result.imageUrl}>View Outwards Image</a></td>
                                        <td>
                                            {
                                                result.picture ?
                                                    <a className='text-blue-500 hover:underline' href={result.picture}>View Outwards Image</a>
                                                    :
                                                    ''
                                            }
                                        </td>
                                        <td>
                                            {
                                                result.picture ?
                                                    ''
                                                    :
                                                    <Link to={`/upload/${result._id}`}><button className='btn btn-success btn-sm'>Upload Inwards Image</button> </Link>
                                            }

                                        </td>

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
                                        <td className='text-blue-500 hover:underline'><a href={Application.imageUrl}>View Outwards Image</a></td>
                                        <td>
                                            {
                                                Application.picture ?
                                                    <a className='text-blue-500 hover:underline' href={Application.picture}>View Inwards Image</a>
                                                    :
                                                    ''
                                            }
                                        </td>
                                        <td>
                                            {
                                                Application.picture ?
                                                    ''
                                                    :
                                                    <Link to={`/upload/${Application._id}`}><button className='btn btn-success btn-sm'>Upload Inwards Image</button> </Link>
                                            }
                                        </td>
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