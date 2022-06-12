import React from 'react'
import './Pokemon.css'
import colors from '../colors.json'

function Pokemon(props) {
    const data = props.pokemon;
  return (
    <div className="Pokemon__card" style={{ backgroundColor: colors[data.types[0].type.name]}}>
        <div className="name"><h2>{data.name}</h2></div>
        <div className="image">
            <img src={data.sprites.front_default} alt="" />
        </div>
        <div className="type"><p>Type : {data.types[0].type.name}</p></div>
        <div className="stats">
            <p><span>{data.stats[0].base_stat}</span>  HP</p>
            <p><span>{data.stats[1].base_stat}</span>  ATTACK</p>
            <p><span>{data.stats[2].base_stat}</span>  DEFENSE</p>
            <p><span>{data.stats[3].base_stat}</span> SPEED</p>
            <p><span>{data.stats[4].base_stat}</span> SDEFENSE</p>
            <p><span>{data.stats[5].base_stat}</span> SATTACK</p>
        </div>
    </div>
  )
}

export default Pokemon