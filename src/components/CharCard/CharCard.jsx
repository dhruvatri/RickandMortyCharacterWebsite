import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './CharCard.css'
import { useQuery } from 'react-query'
const CharCard = ({char}) => {
    const getLastEpisode = async ({queryKey}) => {
        const episode = queryKey[1];
        const value = await axios.get(episode);
        return value.data.name;
    }

    const {data,status} = useQuery(['lastEpisode',char.episode[char.episode.length-1]],getLastEpisode);
    
  return (
    <div id='card'>
      <img src={char.image}></img>
      <div id='charInfo'>
        <h2>{char.name}</h2>
        <h3>{(char.status) === 'Alive' ? ('🟢') : ('🔴') } {char.status} - {char.species}</h3>
        <div className='inBox'>
            <p>Last Known Location : </p>
            <h4>{char.location.name}</h4> 
        </div>
        <div className='inBox'>
            <p>Last Seen in Episode : </p>
            <h4>{status === 'loading' ? 'Loading ... ' : data}</h4>
        </div>
      </div>
    </div>
  )
}

export default CharCard
