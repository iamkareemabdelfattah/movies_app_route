import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export default function TvDetails ()
{
  let [ trendingTvshows, setTrendingTvshows ] = useState( [] );
  let { id } = useParams();

  async function getDetails ()
  {
    let { data } = await axios.get( `https://api.themoviedb.org/3/tv/${ id }?api_key=b83cc031768f2a4781dd594de3d35111&language=en-US&page=1` );
    setTrendingTvshows( data );
    console.log( data );
  }

  useEffect( () =>
  {
    getDetails();
  } );
  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3">
            <img src={ "https://image.tmdb.org/t/p/w500" + trendingTvshows?.poster_path } className="w-100" alt="" />
          </div>
          <div className="col-md-9">
            <div className="item">
              <h1>
                { trendingTvshows?.title } { trendingTvshows?.name }
              </h1>
              <p>{ trendingTvshows?.tagline }</p>
              <ul className="list-unstyled d-flex">
                { trendingTvshows?.genres?.map( ( genre ) => (
                  <div className="bg-info p-3 mx-2 rounded-2">{ genre.name }</div>
                ) ) }
              </ul>
              <p>vote : { trendingTvshows?.vote_average }</p>

              <p>vote count : { trendingTvshows?.vote_count }</p>
              <p>popularty :{ trendingTvshows?.popularity } </p>
              <p>release data : { trendingTvshows?.release_date }</p>
              <p>{ trendingTvshows?.overview }</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

