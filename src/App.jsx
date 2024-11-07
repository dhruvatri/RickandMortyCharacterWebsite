import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharCard from './components/CharCard/CharCard';
import './App.css';
import {useQuery} from 'react-query';

const App = () => {

  const [pageUrl, setPageUrl] = useState('https://rickandmortyapi.com/api/character');

  async function getDataFromApi({queryKey}) {
      const response = await axios.get(queryKey[1]);
      console.log("data", response.data);
      return response.data;
  }

  const {data,status} = useQuery(['characters',pageUrl],getDataFromApi,{keepPreviousData:true});

  if (status === 'loading') {
    return <div id='loading-screen'>Loading...</div>;
  }

  const nextClickHandler = () => {
    const nextLink = data.info.next;
    if (nextLink) {
      setPageUrl(nextLink);
    }
  };

  const prevClickHandler = () => {
    const prevLink = data.info.prev;
    if (prevLink) {
      setPageUrl(prevLink);
    }
  };

  return (
    <div id="mainScreen">
      <h1>Rick and Morty</h1>
      <div id="charDisplay">
        {
          data.results.map((char, index) => (
            <CharCard key={index} char={char} />
          ))
        }
      </div>
      <div id="btnSection">
        <button className="moveBtn" onClick={prevClickHandler} disabled={!data.info.prev}>
          Prev
        </button>
        <button className="moveBtn" onClick={nextClickHandler} disabled={!data.info.next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
