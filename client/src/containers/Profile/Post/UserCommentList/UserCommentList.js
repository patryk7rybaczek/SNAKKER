import React from 'react'
import Avatar from '../../../../components/Header/ProfileSettings/avatar.jpg'
import './style.css'

const UserCommentList = props => (
    <div className="UserCommentList">
        {
            props.comments.map((comment, index) => 
                <div className="user-comment" key={index}>
                    <div className="user-info">
                        <img src={Avatar}  alt="user avatar"/>
                        <a href="">Adam Gregori</a>
                    </div>
                    <p>{ comment }</p>
                </div>
            )
        }
    </div>
)

export default UserCommentList