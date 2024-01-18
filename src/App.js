import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
export default  function App()
{
    const [movies,setMovie]=useState([]);
    const [search,setSearch]=useState("");

    useEffect(() => {
        if (search)
        {
            const searchmovie = async()=>{
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=7212e9c9a507d1f8bb208baf5ac276b5`)
                const data=await res.json()
                setMovie(data.results);
            }
            searchmovie();
        }else
        {
            const fetchmovie = async()=>{
                const res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=7212e9c9a507d1f8bb208baf5ac276b5&page=1")
                const data=await res.json()
                setMovie(data.results);
            }
            fetchmovie();
        }

    }, [search]);

    const imagePath="https://image.tmdb.org/t/p/w500";
    return (
        <div className="container mt-5 mb-5">
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Chercher un film ..." value={search} onChange={(e)=> setSearch(e.target.value)}/>
            </div>
            <div className="row justify-content-between">
                {movies.length > 0 ? (
                    movies.map((movie,index)=>
                            <div  className="col-md-3 mt-5 div" key={movie.id}>
                                <div className="card d-flex flex-column h-100">
                                    <img src={imagePath+movie.poster_path} alt={movie.title} key={movie.id} className="card-img-top" style={{height:'200px'}}/>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h5 className="card-title">{movie.title}</h5>
                                            </div>
                                            <div className="col">
                                                <span className={movie.vote_average >=8 ? 'badge rounded-pill text-bg-success' : 'badge rounded-pill text-bg-warning'} style={{float:'right'}}>{movie.vote_average}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <button type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Description</button>
                                            </div>
                                            <div className="col-md-7">
                                                <small>Date : {movie.release_date}</small>
                                            </div>
                                        </div>
                                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">

                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary">Understood</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
                    ):(
                        <div>
                            <h1 className="text-center">Chargement ....</h1>
                        </div>
                    )}
            </div>
        </div>
    )
}


