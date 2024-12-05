import React, { useState, useEffect } from 'react';
import'./App.css';

function A() {
 const [genre,setgenre]=useState('');
 const [rat,setrat]=useState('');
 const [typ,settyp]=useState('');
 const [list,setlist]=useState([]);
 const type = ['TV', 'Movie', 'OVA', 'Special', 'ONA', 'Music','Any']
 const Genres = [
  'Adventure', 'Action', 'Mystery', 'Sci-Fi', 'Ecchi', 'Fantasy',
  'Comedy', 'Supernatural', 'Girls Love', 'Sports', 'Romance', 'Horror',
  'Award Winning', 'Erotica', 'Slice of Life', 'Drama', 'Gourmet', 'Boys Love',
  'Suspense', 'Avant Garde', 'UNKNOWN'
];
const Rat=['R - 17+ (violence & profanity)', 'PG-13 - Teens 13 or older',
  'PG - Children', 'R+ - Mild Nudity', 'G - All Ages', 'Rx - Hentai','Any']
  const recomm= async(e)=>
  {
    e.preventDefault();
    try{
     const resp= await fetch('http://localhost:100/re',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({'fav_gen': [genre], 'fav_rat': [rat], 'fav_typ': [typ]})
     })
     if(resp.ok){
      const data = await resp.json();
      setlist(data);  
      console.log(data);
       alert('recommending');
     }
      else{
        console.log('error');
      }
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="container">
    <h1 className="header">Anime Recommendation System</h1>
    <form onSubmit={recomm} className="form">
      <div className="form-group">
        <label className="label">Select Genre:</label>
        <select
          onChange={(e) => setgenre(e.target.value)}
          className="select"
        >
          <option value="">Select Genre</option>
          {Genres.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="label">Select Rating:</label>
        <select onChange={(e) => setrat(e.target.value)} className="select">
          <option value="">Select Rating</option>
          {Rat.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="label">Select Type:</label>
        <select onChange={(e) => settyp(e.target.value)} className="select">
          <option value="">Select Type</option>
          {type.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="button">
        Recommend
      </button>
    </form>

    {list.length > 0 ? (
      <div className="list-container">
        <h3 className="list-header">Recommended List:</h3>
        <ul className="list">
          {list[0].slice(0, 10).map((item, index) => (
            <li key={index} className="card">
              <img
                src={item["Image URL"]}
                alt={item.Name}
                className="image"
              />
              <div className="card-title">{item.Name}</div>
              <div className="card-genre">Genres: {item.Genres}</div>
              <div className="card-footer">Rating: {item.Rating}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  :(
    <div className="list-container">
      <h3 className="list-header">Recommended List:</h3>
      <p className="no-list">No recommendations yet!</p>
    </div>
  )}
  </div>
  );
}


export default A;