import React, { Component } from 'react'
import './style.css'

import SearchSuggestion from './SearchSuggestion/SearchSuggestion'
import Avatar from '../ProfileSettings/avatar.jpg'

export default class Search extends Component {

  state = {
    showSuggestion: false,
    initsearchesFound: [{
      id: 0,
      name: 'Alfred',
      lastname: 'Svensson',
      avatar: {Avatar}
    },
    {
      id: 1,
      name: 'Simon',
      lastname: 'Gunnarsson',
      avatar: {Avatar}
    },
    {
      id: 2,
      name: 'Ahmed',
      lastname: 'Nilsson',
      avatar: {Avatar}
    },
    {
      id: 3,
      name: 'Niklas',
      lastname: 'Gran',
      avatar: {Avatar}
    },
    {
      id: 4,
      name: 'Shindy',
      lastname: 'Ylle',
      avatar: {Avatar}
    },
    {
      id: 5,
      name: 'Dankan',
      lastname: 'Bertin',
      avatar: {Avatar}
    }
  ],
  searchesFound: []
  }

  handleSearchChange = (event) => {
    if(event.target.value) {
      let updatedSearchesFound = this.state.initsearchesFound;
      let query = event.target.value.toString().toLowerCase();
      updatedSearchesFound = updatedSearchesFound.filter(function(searchesFound) {
        return (
          searchesFound.name.toLowerCase().search(query) >= 0 ||
          searchesFound.lastname.toLowerCase().search(query) !== -1
        )
      })
      this.setState({showSuggestion: true})
      this.setState({searchesFound: updatedSearchesFound})
    } else {
      this.setState({showSuggestion: false})
    }
  }

  componentWillMount() {
    this.setState({searchesFound: this.state.initsearchesFound})
  }

  render() {
    return (
      <div className="search">
          <input 
            type="text" 
            placeholder="search users..." 
            onChange={this.handleSearchChange}
          />
          <button><i className="fas fa-search"></i></button>
          <div className="">
            {this.state.showSuggestion && <SearchSuggestion searchesFound={this.state.searchesFound}/>}
          </div>
      </div>
    )
  }
}
  