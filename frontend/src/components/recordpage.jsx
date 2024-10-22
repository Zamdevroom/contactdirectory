import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const RecordPage = ()  => {
    const [data, setData] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearch] = useState('')
    const [searchField, setSearchType] = useState('name')
    const [selectedCity, setSelectedCity] = useState('');
    const [uniqueCities, setUniqueCities] = useState([]);

    const navigate = useNavigate();

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    };

    const cityFilter = (e) =>
    {
        if (e.target.value === '') {
            setFilteredData(data);
            return;
        }
        setFilteredData(e.target.value
            ? data.filter(item => item.city === e.target.value)
            : data)
    }
    


    const onChangeSearchType = (e) => {
        setSearchType(e.target.value)
    };

    const handleDelete = async (e,id_) => {
        e.preventDefault();
        console.log(id_);
        try {
            const response = await axios.post('http://localhost:8000/record/deleteRecord', {id: id_});
            console.log(response.data);
            getData();
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = async (e,id_) => {
        e.preventDefault();
        navigate('/editrecord', {state : id_});  
    }


    const getData = async () => {
        try{
            const response = await axios.post('http://localhost:8000/record/getRecords');
            setData(response.data);
            setFilteredData(response.data);
            setUniqueCities([...new Set(response.data.map(item => item.city))]);
        }
        catch (error) {
            console.error(error);
        }
        
    }

    const searchData = async (e) => {
        e.preventDefault();
        console.log(searchValue, searchField);
        if(searchValue === '') {
            getData();
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/record/searchRecords', {searchField, searchValue});
            console.log(response.data);
            setData(response.data);
            setFilteredData(response.data);
            setUniqueCities([...new Set(response.data.map(item => item.city))]);
        } catch (error) {
            console.error(error);
        }
        setSearch('');
    }

    const onClickSearch = () => {
        setShowSearch(!showSearch);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Records</h1>
        <span>
        <button className="flex justify-end mb-6" onClick ={onClickSearch}> Search Toggle </button>
        </span>
        {showSearch && (
            <form className="flex justify-center mb-6">
                <input type = "text" placeholder="Search" className="p-2 border border-gray-300 rounded-lg" name="value" value={searchValue} onChange={onChangeSearch}/>
                <select className="p-2 border border-gray-300 rounded-lg" onChange={onChangeSearchType}>
                    <option value="name">Name</option>
                    <option value="occupation" >Occupation</option>
                    <option value="email" >Email</option>
                    <option value="phone">Phone</option>
                    <option value="address" >Address</option>
                    <option value="address" >City</option>
                </select>
                <button className="flex justify-end mb-6" onClick ={searchData}> Search </button>
            </form>
            
            )}
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Filter by City
                </label>
                <select
                    id="city"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={selectedCity}
                    onChange={(e) => {
                        setSelectedCity(e.target.value)
                    cityFilter(e)}
                }
                >
                    <option value="">All Cities</option>
                    {uniqueCities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
        <button className="flex justify-end mb-6" onClick ={() => {getData()
            setSelectedCity('')}
        }> Reset Search </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="text-xl font-semibold mb-4">
                    <div className="text-gray-700 mb-2 flex justify-between">
                        <span>Name: </span>
                        <span>{item.name}</span>
                    </div>
                    <div className="text-gray-700 mb-2 flex justify-between">
                        <span>Occupation: </span>
                        <span>{item.occupation}</span>
                    </div>
                    <div className="text-gray-700 mb-2 flex justify-between">
                        <span>Email: </span>
                        <span>{item.email}</span>
                    </div>
                    <div className="text-gray-700 mb-2 flex justify-between">
                        <span>Phone: </span>
                        <span>{item.phone}</span>
                    </div>
                    <div className="text-gray-700 mb-2 flex justify-between">
                        <span>Address: </span>
                        <span>{item.address}</span>
                    </div>
                    <div className="text-gray-700 flex justify-between">
                        <span>City: </span>
                        <span>{item.city}</span>
                    </div>
                    <div className="text-gray-700 flex justify-between">
                        <button className="bg-blue-500 text-white p-2 rounded" onClick={ (e) => {
                            handleDelete(e,item._id)}}> Delete</button>
                    </div>
                    <div className="text-gray-700 flex justify-between">
                        <button className="bg-blue-500 text-white p-2 rounded" onClick={ (e) => {
                            handleEdit(e,item._id)}}> Edit</button>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>

        
    );
}

export default RecordPage;

    

