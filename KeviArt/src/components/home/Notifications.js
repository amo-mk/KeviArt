import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PostComment from '../post/PostComment'


class Notifications extends Component {

    
    
    render() {
       const { notifications, auth, posts } = this.props
        //console.log(notifications, auth, posts);

        return (
            <div className="section">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title"><strong>Notifications</strong></span>
                        <ul className="notifications">
                            {
                                notifications && notifications.map((notification) => {

                                    //check notification type
                                    let type = '';
                                    if (notification.notificationType === "like") {
                                        type = "Liked your post"
                                    }
                                    if (notification.notificationType === "dislike") {
                                        type = "Disliked your post"
                                    }
                                    if (notification.notificationType === "comment") {
                                        type = "Commented on your post"
                                    }

                                    const link = "/comments/" + notification.postID;

                                    

                                    //verify user and display notifications
                                    if (auth.uid === notification.authourID) {
                                            return (
                                            <li key={notification.id}>
                                                <span className="black-text">{notification.name + " "}</span>
                                                <Link to={link}>
                                                    <span className="blue-text darken-1">
                                                            <a onClick={function () {
                                                                
                                                            const id = notification.postID;

                                                            const post = posts.filter(postc => postc.id === id);                                                     
                                                                                                                        
                                                            <Link to={link}>
                                                                <PostComment post={post} />
                                                            </Link>
                                                        }}>{type}</a>
                                                    </span> 
                                                </Link> 
                                                <div className="grey-text note-date">
                                                    {moment(notification.time.toDate()).fromNow()}
                                                </div>    
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    
    return {
        auth: state.firebase.auth,
        posts: state.firestore.ordered.posts
    }
}

export default withRouter(connect(mapStateToProps)(Notifications));