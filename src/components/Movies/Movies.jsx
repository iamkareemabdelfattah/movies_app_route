import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';

export default function Movies ()
{
  let [ trendingMovies, setTrendingMovies ] = useState( [] );
  let [ currentPage, setCurrentPage ] = useState( 1 );
  let pageList = new Array( 10 ).fill( 0 ).map( ( ele, index ) => index + 1 );

  async function getTrendingMovies ()
  {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=b83cc031768f2a4781dd594de3d35111&language=en-US&page=${ currentPage }`
    );

    setTrendingMovies( data.results );
  }

  async function searchMovies ( e )
  {

    let searchKey = e.target.value;
    if ( searchKey )
    {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=b83cc031768f2a4781dd594de3d35111&language=en-US&page=${ currentPage }&query=${ searchKey }&include_adult=true`
      );
      setTrendingMovies( data.results );
    } else
    {
      getTrendingMovies();
    }

  }

  function handlePaginate ( page )
  {
    setCurrentPage( page );
  }

  useEffect(
    () =>
    {
      getTrendingMovies();
    }, );

  return (
    <>



      { trendingMovies != null ? <div className="container">

        <input type="text" onKeyUp={ searchMovies } className="form-control bg-transparent text-white my-5" placeholder="Search ...." />

        <div className="row mt-5 align-items-center">
          { trendingMovies.map( ( movie, idx ) =>
            <div key={ idx } className="col-md-2">
              <div className="movie">
                <Link to={ `${ movie.id }` }>
                  <img src={ "https://image.tmdb.org/t/p/w500/" + movie.poster_path } className="w-100" alt={ movie.title } />
                  <h6> { movie.name } </h6>
                </Link>
              </div>
            </div>
          ) }
        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            { currentPage > 1 ? (
              <li className="page-item " onClick={ () => handlePaginate( currentPage - 1 ) }>
                <NavLink to="#" className="page-link bg-transparent text-white">prev</NavLink>
              </li>
            ) : (
              ""
            ) }

            { pageList?.map( ( page, idx ) => (
              <li key={ idx } className="page-item" onClick={ () => handlePaginate( page ) }>
                <NavLink to="#" className={ page === currentPage ? "bg-info page-link  text-white" : "bg-transparent page-link  text-white" }>{ page }</NavLink>
              </li>
            ) ) }
            { currentPage < 10 ? (
              <li className="page-item " onClick={ () => handlePaginate( currentPage + 1 ) }>
                <NavLink to="#" className="page-link bg-transparent text-white">next</NavLink>
              </li>
            ) : (
              ""
            ) }
          </ul>
        </nav>

      </div>
        :
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
        </div>
      }
    </>
  );
}
