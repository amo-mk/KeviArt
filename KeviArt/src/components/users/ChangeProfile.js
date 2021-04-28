import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { changeProfile, changePassword } from '../../store/actions/authActions'

class ChangeProfile extends Component {

    

    state = {

        uid: this.props.auth.uid,       
        firstName: this.props.profile.firstName,
        lastName: this.props.profile.lastName,
        contact: this.props.profile.contact,
        about: this.props.profile.about,
        location: this.props.profile.location,
        email: this.props.auth.email,
        passwordChanged: false
    }

    handleChange = (e) => {
        console.log(this.state);
        
        this.setState({
            [e.target.id]: e.target.value
            
        })
        
    }
    handleClick = (e)=> {
        e.preventDefault();
        this.setState({
            ...this.state,
            passwordChanged : true

        })
        const newAuthDetails = {
            email: this.state.email,
            password: this.state.passwordChanged
        }
        if (newAuthDetails.password == true) {
            this.props.changePassword(newAuthDetails);
        }
        

    }
    handleSubmit = (e) => {
        
        e.preventDefault(); 
        console.log(this.state)
        
        if (
            
            this.state.firstName != '' && this.state.lastName != '' && this.state.contact != '' &&
            this.state.about != '' && this.state.location != ''  && this.state.email != ''
        ) {
            this.props.changeProfile(this.state);
        }
    }
    
     
    render() {
        const { auth, authError } = this.props;
        //console.log(auth, profile);
        if(!auth.uid)return <Redirect to='/signin'/>
        return (
            <div className="sign-up create-post">
                <div className="container">
                    <form onSubmit={ this.handleSubmit }>
                        <div className="row">
                            <div className="col s12 m5 offset-m4">
                                <div className="card">
                                    <div className="card-action">
                                        <h5 className="grey-text text-darken-4">Change User Profile</h5>

                                        <div className="input-field">
                                            <label className="active" htmlFor="firstName">First Name</label>
                                            <input value={ this.state.firstName }required type="text" name="firstName" id="firstName"onChange={ this.handleChange }/>
                                        </div>
                                        <div className="input-field">
                                            <label className="active" htmlFor="lastName">Last Name</label>
                                            <input value={ this.state.lastName }required type="text" name="lastName" id="lastName"onChange={ this.handleChange }/>
                                        </div>
                                        <div className="input-field">
                                            <label className="active" htmlFor="contact">Contact</label>
                                            <input value={ this.state.contact }required type="number" name="contact" id="contact"onChange={ this.handleChange }/>
                                        </div>
                                        <div className="input-field">
                                            <label className="active" htmlFor="location">Location</label>
                                            <input value={ this.state.location }required type="text" name="location" id="location"onChange={ this.handleChange }/>
                                        </div>
                                        <div className="input-field">
                                            <label className="active" htmlFor="description">About</label>
                                            <input value={ this.state.about}required  type="text" name="about" id="about"onChange={ this.handleChange }/>
                                        </div>
                                        
                                        <div className="input-field">
                                            <label className="active"htmlFor="email">Email</label>
                                            <input value={this.state.email}required type="email" name="email" id="email" onChange={ this.handleChange }/>
                                        </div>
                                       

                                        <div className="input-field">
                                            <button className="btn lighten-2 signin-btn">Save Changes</button>
                                            <div className="red-text center">
                                                {authError ? <p>{ authError }</p> : null}
                                            </div>
                                        </div>
                                        <div className="input-field change-password">
                                            <a href="#" className="blue-text center change-password" onClick={ this.handleClick }><span className="change-password-text">Change password?</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
   // console.log(state)
    return {
        
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeProfile: (newProfile) => dispatch(changeProfile(newProfile)) ,
        changePassword: (newPassword) => dispatch(changePassword(newPassword)) 
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangeProfile));
