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
            text: '',
            errors: {},
            showError: false
        }
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
        let author = this.props.auth.user.name;
        let postID = this.props.post._id;

        const newComment = {
            text: this.state.text,
            author: author,
            postID: postID
        }

        this.props.addComment(postID, newComment);
        this.setState({ text: '' });
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.errors.postID === this.props.post._id) {
            this.setState({ showError: true })
          } else {
            this.setState({ showError: false });
          }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    render() {
        const { errors } = this.state
        const showError = this.state.showError
		const { auth, post, comments } = this.props
        const commentsContent = comments.map(comment => <Comment key={comment._id} comment={comment}  post={post} />)

        return (
            <div className="comment-section">
                { commentsContent }
                <div className="comment-post">
                { showError ? (<span className="error-span">{errors.commentText}</span>):(null)}
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
  comments: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.error
})

export default connect(mapStateToProps, { addComment })(UserCommentList);