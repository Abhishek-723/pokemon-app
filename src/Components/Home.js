import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './Home.css'
import Pokemon from './Pokemon';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const [inputVal, setInputVal] = useState("");
    const [allPokemons, setAllPokemons] = useState([]);
    const [pokemon, setPokemon] = useState();
    const [view, setView] = useState(false);

    const getAllPokemons = async () => {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1126`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await data.json();
        setAllPokemons(res.results)
    }

    useEffect(() => {
        if(allPokemons.length===0){
            getAllPokemons();   
        }
    }, [allPokemons.length]);

    const findPokemon = async() => {
        setView(false);
        if(inputVal==="") {
            toast.warn("Please enter a pokemon name");
            return null;
        }
        await fetch(`https://pokeapi.co/api/v2/pokemon/${inputVal}`).then(async res => {
            
            const data = await res.json();
            console.log(data);
            setPokemon(data);
        }).catch(err=>{
            toast.error("Invalid Pokemon name");
            console.log(err);
        });
    }

  return (
    <>
    <ToastContainer />
        <div className="home">
            <h1>Find your favourite pokemon here</h1>
            <div className="search__bar">
                <input type="search" placeholder='Search pokemon here...' value={inputVal} onChange={(e)=>{
                    setInputVal(e.target.value);
                    setView(true);
                }}/>
                <button onClick={findPokemon}><i className="fa-solid fa-magnifying-glass"></i>SEARCH</button>
            </div>
                {
                    inputVal === "" ? (
                        null
                    ): (
                        <div className={view ? "search__dropdown" : "none"}>
                            {
                                allPokemons.filter((data)=> {
                                    if(data.name.toLowerCase().includes(inputVal.toLowerCase())) return data;
                                    else return null;
                                }).map(data => (
                                    <p onClick={()=>setInputVal(data.name)} key={data.id}>{data.name}</p>
                                ))
                            }
                        </div>
                    )
                }
                {
                    pokemon ? (
                        <Pokemon pokemon={pokemon}/>
                    ) : (
                        null
                    )
                }

        </div>
    </>
  )
}

export default Home