import React from 'react'
import Avatar from '../../Profile/avatar.jpg'
import './style.css'

const SearchSuggestion = (props) => {
    const options = props.searchesFound.map(s =>(
        <li key={s.id}>
        <img src={Avatar} alt="profile avatar"/>
            {s.name} {s.lastname}
        </li>
    ))
    return <ul>{options}</ul>
}

export default SearchSuggestion