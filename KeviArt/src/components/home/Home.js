import React, { Component } from 'react'
import Dashboard from './Dashboard'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'


class Home extends Component {
    render() {
        const { auth } = this.props;
        if(!auth.uid) return<Redirect to='/'/>
        return (
            <div className="home">
                <Dashboard />
                {/**
                 * Render Posts.js if not logged in
                 */} 
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    //console.log(state);
    return {
        auth: state.firebase.auth
    }
}

export default withRouter(connect(mapStateToProps) (Home))
