import React from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'



const Profile = ({ profile, auth }) => {
    
    const handleChange = (e) => {
        //let path = '/changeprofile'
        //this.props.history.push(path)
        //<Link to="/changeprofile"/>
        return <Redirect to='/changeprofile'/>
        console.log("Clicked Meeee!!", e)
     
        
    }
   // console.log(profile)
    if(!auth.uid) return<Redirect to='/signin'/>
    return (
        <div className="profile_container create-post">
            <div className="container profile">
                <div className="profile_pic">
                    <p className="profile_icon white-text btn-floating green lighten-2"><div>{ profile.initials }</div></p>
                </div>  
                
                <div className="profile_body">
                    <div className="profile_name">
                        <strong>Name: </strong><p>{profile.firstName} { profile.lastName } </p>
                    </div>
                    <div className="profile_email">
                        <strong>Email: </strong> <p>{auth.email}</p>
                    </div>
                    <div className="profile_about">
                        <strong>About: </strong><p>{ profile.about }</p>
                    </div>
                    <div className="profile_location">
                        <strong>Location: </strong><p>{profile.location}</p>
                    </div>
                    <div className="profile_contact">
                        <strong>Contact: </strong><p>{profile.contact}</p>
                    </div>
                    <div className="change_profile_btn ">
                     <Link to='/changeprofile'><input className="btn" type="button" value="Change profile or Password" name="change_btn" onClick={ handleChange}/></Link> 
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }        
}


export default withRouter(connect(mapStateToProps)(Profile))
