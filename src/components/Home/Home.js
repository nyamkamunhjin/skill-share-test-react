import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import PostAPI from '../../api/PostAPI';
import { formatDate } from '../../functions';
import PostView from '../PostView/PostView';
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

  useEffect(() => {
    handleSearch(searchInput);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-purple-500 w-full pt-10 flex flex-col items-center p-2">
        <p className="text-5xl font-bold">Posts</p>
        <div className="w-full max-w-sm m-4">
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
      <div className="mt-1 px-2 w-full max-w-screen-sm">
        {results.length !== 0 &&
          results.map((result, index) => (
            <PostView result={result} key={`post-view-${index}`} />
          ))}
      </div>
    </div>
  );
};

export default Home;
