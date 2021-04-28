import React, { Component } from 'react'
import PostList from '../post/PostList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import Footer from '../layout/Footer'


class Dashboard extends Component {

   /* componentDidMount = () => {
        const db = firebase.firestore().collection('posts').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                
            })
        })
    }*/
    componentDidMount()  {
        this.setState({
            componentData: this.props
        });
    }

    render() {
       // console.log(this.props)
        const { posts, notifications } = this.props;

        if (posts) {
            return (
                
                <div>

                    <div className="dashboard container">
                        <div className="row dashboard-section">
                            <div className="col s12 m6">
                                <div className="section posts-dashboard ">
                                    <PostList posts={ posts }/>
                                </div>
                            </div>
                            <div className="col s12 m5 offset-m1 fixed-content">
                                <Notifications notifications={ notifications }/>
                            </div>
                        </div>                
                    </div>
                    <Footer />
            </div>
              
            )  
        } else {
            return (
                <div className="container center">Loading...</div>
            )
        }
        
    } 
}
const mapStateToProps = (state) => {
    //console.log(state)
    return {
        posts: state.firestore.ordered.posts,
        notifications: state.firestore.ordered.notifications
    }        
}

export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect ([
        { collection: 'posts' },
        {collection: 'notifications'}
    ])
)(Dashboard))
