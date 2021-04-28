import React from 'react'
import Notifications from '../home/Notifications'
import PostCreation from './PostCreation'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect, withRouter } from 'react-router-dom'


const CreatePost = (props) => {
    const { auth, notifications } = props;
    if(!auth.uid) return<Redirect to='/signin'/>
        return (
            <div className="create-post-author">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m6">
                            <PostCreation />
                        </div>
                        <div className="col s12 m5 offset-m1 notif">
                            <Notifications notifications={notifications} />
                        </div>
                    </div>                
                </div>
            </div>
        )
  
}

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect ([
        {collection: 'notifications'}
    ])
)(CreatePost))
