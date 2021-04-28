import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import PostSummary from './PostSummary'
import Comments from './Comments'

class PostComment extends Component {
    render() {
        
        const { postID, post } = this.props;
        
        const data = { postID: postID, post: post }
        console.log(post)
        
        console.log(post)
        if (post) {
            return (
                <div className="home">
                    <div className="dashboard container ">
                        <div className="row comment-section">
                            <div className="col s12 m6">
                                <div className="row">

                                    <PostSummary post={post} />
                                    
                                </div>
                            </div>
                                         
                            <div className="col s12 m5 offset-m1 fixed-content  ">
                              
                                <Comments data={ data}/>
                                
                            </div>
                        </div>                
                    </div>
                 </div>
            )
        }
    }
}


////PLEAse change these methode. isert it in text
const mapStateToProps = (state, ownProps) => {
    
    const id = ownProps.match.params.id;
    const posts = state.firestore.data.posts;
    const post = posts ? posts[id] : null;

    return {
        postID: id,
        post: post,
        comments: state.firestore.ordered.comments
    }
}
//const firestoreConnect

export default compose(
    connect(mapStateToProps)
    // ,firestoreConnect([
    //    { collection: 'comments', limit: 5}
    // ])
)(PostComment)
