import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';


const Dashboard = () => {

    const [Applications, setApplications] = useState([]);

    const [searchResults, setSearchResults] = useState([]);





    const handleSearch = (event) => {
        event.preventDefault();
        const mobile = event.target.mobile.value;
        const url = `http://localhost:5000/search?mobile=${mobile}`
        fetch(url)
            .then(res => res.json())
            .then(data => setSearchResults(data))

    }

    useEffect(() => {
        fetch('http://localhost:5000/application')
            .then(res => res.json())
            .then(data => {
                setApplications(data)
            })
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

                                    searchResults && searchResults.sort((a, b) => a.time > b.time ? -1 : 1).map((result, i) => <tr key={result._id}>
                                        <th>{i + 1}</th>
                                        <td>{result._id}</td>
                                        <td>{result.name[0]}</td>
                                        <td>{result.mobile[0]}</td>
                                        <td>{result.application[0]}</td>
                                        <td>
                                            {
                                                result.files.map((file, i) => <li className='text-blue-500 hover:underline'><a href={`http://localhost:5000/${file.filename}`}> View Outwords Image</a></li>)

                                            }
                                        </td>
                                        <td>
                                            {
                                                result.picture ?
                                                    result.picture.map(file => <li className='text-blue-500 hover:underline'><a href={`http://localhost:5000/${file.filename}`}> View Outwords Image</a></li>)
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
                                    Applications && Applications.sort((a, b) => a.time > b.time ? -1 : 1).map((Application, i) => <tr key={Application._id}>
                                        <th>{i + 1}</th>
                                        <td>{Application._id}</td>
                                        <td>{Application.name[0]}</td>
                                        <td>{Application.mobile[0]}</td>
                                        <td>{Application.application[0]}</td>
                                        <td>
                                            {
                                                Application.files.map((file, i) => <li className='text-blue-500 hover:underline'><a href={`http://localhost:5000/${file.filename}`}> View Outwords Image</a></li>)

                                            }
                                        </td>
                                        <td>
                                            {
                                                Application.picture ?
                                                    Application.picture.map(file => <li className='text-blue-500 hover:underline'><a href={`http://localhost:5000/${file.filename}`}> View Outwords Image</a></li>)
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