import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
export default  function App()
{
    const [movies,setMovie]=useState([]);
    useEffect(() => {
        const fetchmovie = async()=>{
            const res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=7212e9c9a507d1f8bb208baf5ac276b5&page=1")
            const data=await res.json()
            setMovie(data.results);
        }

        fetchmovie();
    }, []);

    const imagePath="https://image.tmdb.org/t/p/w500";
    return (
        <div className="container mt-5 mb-5">
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Chercher un film ..."/>
            </div>
            <div className="row">
                {movies.length > 0 ? (
                    movies.map((movie,index)=>
                            <div className="card mb-3 border-0 col-md-3">
                                <img src={imagePath+movie.poster_path} alt={movie.title} key={movie.id} class="card-img-top" style={{height:'200px'}}/>
                                <div className="card-body shadow">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h5 className="card-title">{movie.title}</h5>
                                        </div>
                                        <div className="col">
                                            <span className={movie.vote_average >=8 ? 'badge rounded-pill text-bg-success' : 'badge rounded-pill text-bg-warning'} style={{float:'right'}}>{movie.vote_average}</span>
                                        </div>
                                    </div>
                                    <small>Release on : {movie.release_date}</small>
                                </div>
                            </div>
                    )
                ):(
                    <div>
                        <h1 className="text-center">Veuillez connecter à internet ....</h1>
                    </div>
                )}

            </div>
            <ul>
            </ul>
        </div>
    )
}


