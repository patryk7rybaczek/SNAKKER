import React, { Component } from 'react'
import './style.css'

import Suggestion from './SearchSuggestion/Suggestion'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUsers } from '../../../actions/userActions'
class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showSuggestion: false,
      users: [{}],
      searchesFound: []
    }
  }

  onSearchClick = (e) => {
    this.setState({
      showSuggestion: true
    })
    this.props.getUsers();
  }

  handleSearchChange = (event) => {
    if(event.target.value) {
      let updatedSearchesFound = this.state.users.users;
      let query = event.target.value.toString().toLowerCase();
      updatedSearchesFound = updatedSearchesFound.filter(function(searchesFound) {
        return (searchesFound.name.toLowerCase().search(query) >= 0)
      })
      this.setState({searchesFound: updatedSearchesFound})
    } else {}
  }

  hideList = e => {
    this.setState({showSuggestion: false})
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.users) {
      this.setState({
        users: nextProps.users
      })
    }
  }
  

  render() {
    let suggestionContent;
    suggestionContent = this.state.searchesFound.map(user => <Suggestion key={user.id} user={user} />)

    return (
      <div className="search">
          <input 
            type="text" 
            placeholder="Search users..." 
            onChange={this.handleSearchChange}
            onClick={this.onSearchClick}
          />
          <button onClick={this.onSearchClick}><i className="fas fa-search"></i></button>
          <div onClick={this.hideList}>
          {this.state.showSuggestion && (
              <ul className="search-list">
                {suggestionContent}
              </ul>)}
          </div>
      </div>
    )
  }
}

Search.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  errors: state.error
});

export default connect(
  mapStateToProps, { getUsers })(Search);
  