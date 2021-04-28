import React, { Component } from 'react'
import PostSummary from './PostSummary'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom'
import PostList from './PostList'

class Posts extends Component {
    render() {
        const { posts ,auth } = this.props;
    
        if(auth.uid) return<Redirect to='/home'/>
       // console.log(posts)
        if (posts) {
          return (
                <div className="home">
                    <div className="container section post-details">
                      <div className="row">
                          {posts && posts.map((post) => {
                                return (
                                    <div className="col s12 m6 l6">
                                        <PostSummary post={post} key={post.id} />
                                    </div>
                                )
                            })}
               
                          {/*
                            <PostList posts={ posts }/>  
                            
                          */}
                        </div>                        
                    </div>
                </div>
            )  
        } else {
            return (
                <div className="container centre">Loading...</div>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth
    }        
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect ([
        { collection: 'posts' }
    ])
)(Posts)