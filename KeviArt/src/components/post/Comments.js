import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { commentPost } from '../../store/actions/postActions'

class Comments extends Component {
    state = {
        postID: this.props.data.postID,
        comment: '',
        name: this.props.profile.firstName + ' ' + this.props.profile.lastName,
        time: '',
        commentCount: this.props.data.post.comments,
        post: this.props.data.post
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.commentPost(this.state);
       // console.log(this.state);

    }


    render() {
        //const { data } = this.props;
        console.log(this.props.data);

        const data = this.props.data;
        const postID = data.postID;

        const comments = this.props.commentsHere;
        
        console.log(postID);
              
        return (
            <div className="section">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title"><strong>Comments</strong></span>
                        <ul className="comments black-text darken-3">
                            {
                                comments && comments.map((comment) => {

                                    const commentPostID = comment.postID;
                                    console.log(commentPostID);

                                    if (postID === commentPostID) {
                                        return (
                                            <li key={comment.id}>
                                                <span className="blue-text">{comment.name + " "}</span>
                                                
                                                <span>{comment.comment}</span>
                                                <div className="grey-text note-date">
                                                    {moment(comment.time.toDate()).fromNow()}
                                                </div>
                                            </li>
                                        )
                                    } 
                                    
                                })
                            }
                        </ul>
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-field">
                                <label htmlFor="comment">Type comment</label>
                                <input type="text" name="comment" id="comment" onChange={ this.handleChange}/>
                            </div>
                            <div className="input-field">
                                <button className="btn lighten-2 signin-btn">Send Comment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    //console.log(state);
    return {
        posts :state.firestore.data.posts,
        profile: state.firebase.profile,
        commentsHere: state.firestore.ordered.comments     
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        commentPost: (comment) => dispatch(commentPost(comment))
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'comments', limit: 6}
    ])
)(Comments)

