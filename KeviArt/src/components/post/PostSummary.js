import React from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { likePost, dislikePost, commentPost } from '../../store/actions/postActions'
import PostComment from './PostComment'


class PostSummary extends React.Component {
    state = {
        
        isLiked: 0,
        isDisliked: 0
    }

    handleChange = (e) => {
        e.preventDefault();
        const details = {
            userUID: this.props.auth.uid,
            post: this.props.post,
            name: this.props.profile.firstName + " " + this.props.profile.lastName
        }
        const post = this.props.post;
            

        if (e.target.id == "like-btn") {
            
            //console.log(this.state);
            this.props.likePost(details)
            this.setState({
                isLiked: 1
            });
            //console.log(this.state);
        }
        if (e.target.id == "dislike-btn") {
                      
            //console.log("Dislike Button Cliked", e);
            this.props.dislikePost(details);
            this.setState({
                isDisliked: 1
            });             

        }
        if (e.target.id == "comment-btn") {
            //console.log("Comment Button Cliked", e);
            <Link to='/comments'>
                <PostComment post={post} />
            </Link>
           // this.props.commentPost(post)
        }
    }
    
    render() {
        
        const { post, auth } = this.props;
        const initials = post.firstName[0] + post.lastName[0];

        if (auth.uid) {
            return (
                <div className="card  z-depth-0 post-summary white post-summary">
                    <div className="card-image photo-wrap">
                        <img src={post.imageURL} alt="img"/>
                    </div>
                            
                    <div className="post-author">
                        <span className="btn btn-floating green lighten-2">{initials}</span>
                        <div className="author-details">
                            <span className="card-title name grey-text text-darken-3"> {post.firstName +" "+ post.lastName}</span>
                            <div className="d-details">
                                <span className="grey-text text-darken-2"><strong>Category: </strong> {post.category}</span>
                                <span className="grey-text date">{moment(post.postedAt.toDate()).calendar()}</span>                     
                            </div>
                        </div>
                                
                    </div>
                            
                    <div className="card-content black-text">
                        <p>
                            {post.description}
                        </p>
                    </div>
                    
                    <div className="card-action">                      
                        <button
                            name="like-btn" id="like-btn"
                            disabled={this.state.isLiked === 1 ? true : false}
                            
                            className={this.state.isLiked === 1 ? "liked-btn .disabled" : "like-btn"}
                            disabled={this.state.isDisliked=== 1}
                            onClick={this.handleChange}>
                            <i className="material-icons icons">thumb_up</i>
                            <p>{post.likes}</p>
                        </button>

                        <button
                            disabled={this.state.isDisliked === 1 ? true : false}
                            className={this.state.isDisliked === 1 ? "liked-btn .disabled" : "like-btn"}
                            disabled={this.state.isLiked === 1}
                            name="dislike-btn" id="dislike-btn"
                            onClick={this.handleChange}>
                            <i className="material-icons icons"> thumb_down</i>
                            <p>{post.dislikes}</p>
                        </button>
                        
                        <Link className="comment-link" to={'/comments/' + post.id}>
                            <button
                                name="comment-btn" id="comment-btn">
                                
                                <i className="material-icons icons like-btn">message</i>
                                
                                <p>{post.comments}</p>
                            </button>
                         </Link>
                            
                    </div>
                </div>  
            )
            
        } else {
            return (
                <div className="card  z-depth-0 post-summary white post-summary">
                    <div className="card-image photo-wrap">
                        <img src={post.imageURL} alt="img"/>
                    </div>
                            
                    <div className="post-author">
                        <span className="btn btn-floating green lighten-2">{initials}</span>
                        <div className="author-details">
                            <span className="card-title name grey-text text-darken-3"> {post.firstName +" "+ post.lastName}</span>
                            <div className="d-details">
                                <span className="grey-text text-darken-2"><strong>Category: </strong> {post.category}</span>
                                <span className="grey-text date">{moment(post.postedAt.toDate()).calendar()}</span>                     
                            </div>
                        </div>                               
                    </div>
                            
                    <div className="card-content black-text">
                        <p>
                            {post.description}
                        </p>
                    </div>
                    
                    <div className="card-action ">                       
                        <button disabled><i className="material-icons icons disabled-icons">thumb_up </i><p>{ post.likes}</p></button>
                        <button disabled><i className="material-icons icons disabled-icons ">thumb_down</i><p>{ post.dislikes}</p></button>
                        <button disabled><i className="material-icons icons disabled-icons">message</i><p>{ post.comments}</p></button>
                    </div>
                </div>  
            )
        }       
    }
}

const mapStateToProps = (state) => {    
    //console.log(state);

    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        likePost: (details) => dispatch(likePost(details)),
        dislikePost: (details) => dispatch(dislikePost(details))
        // ,commentPost: (comment) => dispatch(commentPost(comment))  
    } 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSummary))