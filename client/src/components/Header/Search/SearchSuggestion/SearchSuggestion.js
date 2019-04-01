import React from 'react'
import Avatar from '../../ProfileSettings/avatar.jpg'
import './style.css'

const SearchSuggestion = (props) => {
    const options = props.searchesFound.map(s =>(
        <li key={s.id}>
        <img src={Avatar} alt="profile avatar"/>
            {s.name} {s.lastname}
        </li>
    ))
    return <ul className="search-list">{options}</ul>
}

export default SearchSuggestion