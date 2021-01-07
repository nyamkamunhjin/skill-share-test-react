import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import PostAPI from '../../api/PostAPI';
import { formatDate } from '../../functions';
/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const history = useHistory();
  const handleSearch = async (searchInput) => {
    const { data, err } = await PostAPI.searchPost(searchInput, 10);
    setResults(data);
    // console.log(data);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-purple-500 w-full pt-10 flex flex-col items-center">
        <p className="text-5xl font-bold">Posts</p>
        <div className="w-96 m-4">
          <span className="absolute p-2">
            <HiSearch className="text-2xl text-gray-400" />
          </span>
          <input
            className="w-full p-2 pl-10 rounded-sm text-gray-800"
            onChange={(e) => {
              if (e.target.value.trim() !== '') {
                handleSearch(e.target.value);
              }
              setSearchInput(e.target.value);
            }}
            placeholder="Search..."
            value={searchInput}
          />
        </div>
      </div>
      <div className="mt-5">
        {results.length !== 0 &&
          results.map((result, index) => (
            <div
              key={index}
              className="bg-green-300 rounded-md m-2 p-2 w-screen max-w-screen-sm flex flex-col items-start"
            >
              <p
                className="text-2xl text-black font-bold hover:text-purple-400 cursor-pointer"
                onClick={() => history.push(`/post/${result._id}`)}
              >
                {result.title}
              </p>
              <p>
                <b>on {formatDate(result.createdAt)}</b>
              </p>
              <p>
                By {result.author.firstName} {result.author.lastName}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
