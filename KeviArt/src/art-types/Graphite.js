import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostSummary from '../components/post/PostSummary';
import Notifications from '../components/home/Notifications'


class Graphite extends Component {
    render() {
        const { posts, auth } = this.props;

        if (auth.uid == null) {
            if (posts) {
                return (
                    <div className="home">
                        <div className="container section">
                            <div className="row">
                                {
                                posts && posts.map((post) => {
                                    while (post.category === "Graphite") {
                                        return (
                                            <div className="col s12 m6 l6">
                                                <PostSummary post={post} key={post.id} />
                                            </div>
                                        )
                                    }
                                })
                            }
                            </div>                    
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="center grey-text">
                        No Painting posts yet
                    </div>
                )
            }
        } else {
            if (posts) {
                return (
                    <div className="home">
                        <div className="container dashboard">
                            <div className="row">
                                <div className="col s12 m6 l6">
                                    {posts && posts.map((post) => {
                                    while (post.category === "Graphite") {
                                        return (
                                            <div >
                                                <PostSummary post={post} key={post.id} />
                                            </div>
                                        )
                                    }
                                })}
                                </div>
                                <div className="col s12 m5 offset-m1">
                                    <Notifications />
                                </div>
                                
                            </div>                    
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="center grey-text">
                        No Painting posts yet
                    </div>
                )
            }
        }
    }
}
        
const mapStateToProps = (state) => {
    //console.log(state)
    return {
        posts: state.firestore.ordered.posts,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Graphite)