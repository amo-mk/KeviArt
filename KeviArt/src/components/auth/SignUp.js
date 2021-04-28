import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        contact: '',
        about: '',
        location: ''
    }

    handleChange = (e)=> {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault(); 
        //console.log(this.state)
        this.props.signUp(this.state)
    }

    render() {
        const { auth, authError } = this.props;
        if(auth.uid) return<Redirect to='/home'/>
        return (
            <div className="sign-up create-post">
                <div className="container">
                    <form onSubmit={ this.handleSubmit }>
                        <div className="row">
                            <div className="col s12 m5 offset-m4">
                                <div className="card">
                                    
                                    <div className="card-action">
                                        <h5 className="grey-text text-darken-3">Sign Up</h5>

                                        <div className="input-field">
                                            <label htmlFor="firstName">First Name</label>
                                            <input required type="text" name="firstName" id="firstName"onChange={ this.handleChange }/>
                                        </div>
                                        <div className="input-field">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input required type="text" name="lastName" id="lastName"onChange={ this.handleChange }/>
                                        </div>
                                        <div className="input-field">
                                            <label htmlFor="contact">Contact</label>
                                            <input required type="number" name="contact" id="contact"onChange={ this.handleChange }/>
                                        </div>
                                        <div className="input-field">
                                            <label htmlFor="location">Location</label>
                                            <input required type="text" name="location" id="location"onChange={ this.handleChange }/>
                                        </div>
                                        <div className="input-field">
                                            <label htmlFor="description">About</label>
                                            <input required  type="text" name="about" id="about"onChange={ this.handleChange }/>
                                        </div>
                                        
                                        <div className="input-field">
                                            <label htmlFor="email">Email</label>
                                            <input required type="email" name="email" id="email" onChange={ this.handleChange }/>
                                        </div>

                                        <div className="input-field">
                                            <label htmlFor="password">Password</label>
                                            <input required type="password" name="password" id="password" onChange={ this.handleChange }/>
                                        </div>

                                        <div className="input-fiel d">
                                            <button className="btn lighten-2 signin-btn">Sign Up</button>
                                            <div className="red-text center">
                                                {authError ? <p>{ authError }</p> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*
                        <h5 className="grey-text text-darken-3">Sign In</h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" onChange={ this.handleChange }/>
                        </div>

                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" onChange={ this.handleChange }/>
                        </div>

                        <div className="input-fiel d">
                            <button className="btn marron lighten-2">Log In</button>
                        </div>*/}

                    </form>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser)) 
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(SignUp)
