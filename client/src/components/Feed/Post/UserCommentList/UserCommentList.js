import React, { Component } from 'react'
import Avatar from '../../../Header/ProfileSettings/avatar.jpg'
import './style.css'
import PropTypes from 'prop-types';
import Comment from './Comment';
import { addComment } from '../../../../actions/postActions'
import { connect } from 'react-redux';

class UserCommentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
					text: ''
        }
		}
		
    // COMMENTS ACTIONS
    addComment = (id) => {

    }

    editComment = (id) => {
        
    }

    deleteComment = (id) => {

		}
		
		onChange = e => {
			this.setState({text: e.target.value});
		}

		onCommentKeyDown = (e) => {
			if(e.keyCode === 13) {
				this.onSubmit(e);
			}
		}
	

    onSubmit = (e) => {
			e.preventDefault(e);

			const { user } = this.props.auth;

			const { postID } = this.props;

			const newComment = {
				text: this.state.text,
				author: user.name
			}
			this.props.addComment(postID, newComment);
			this.setState({ text: '' });
    }

    render() {
		const { auth, comments } = this.props
        const commentsContent = comments.map(comment => <Comment key={comment._id} comment={comment} />)

        return (
            <div className="comment-section">
                { commentsContent }
                <div className="comment-post">
                    <img src={Avatar} alt="user avatar"/>
                    <form onSubmit={e => this.onSubmit(e)}>
                        <textarea onChange={this.onChange} onKeyDown={e => this.onCommentKeyDown(e)} value={this.state.text} name="user-comment" type="text" placeholder="Write a comment..."/>
                    </form>
                </div>
            </div>
        )
    }
}

UserCommentList.propTypes = {
	addComment: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, { addComment })(UserCommentList);