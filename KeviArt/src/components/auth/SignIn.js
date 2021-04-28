import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePassword, signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        passwordChanged: false
    }

    handleChange = (e)=> {
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
        }
        if (this.state.passwordChanged == true && newAuthDetails.email != '') {
            this.props.changePassword(newAuthDetails);
        }
        else {
            alert("Please Enter your email to change the password");
        }
    }
    handleSubmit = (e) => {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        e.preventDefault(); 
        this.props.signIn(user)
    }

    render() {
        const { authError, auth } = this.props
        if(auth.uid) return<Redirect to='/home'/>
        return (
            <div className="sign-in create-post">
                <div className="container">
                    <form onSubmit={ this.handleSubmit }>
                        <div className="row">
                            <div className="col s12 m5 offset-m4">
                                <div className="card">
                                    
                                    <div className="card-action">
                                        <h5 className="grey-text text-darken-3">Sign In</h5>
                                        <div className="input-field">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" onChange={ this.handleChange }/>
                                        </div>

                                        <div className="input-field">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" id="password" onChange={ this.handleChange }/>
                                        </div>

                                        <div className="input-field">
                                            <button className="btn lighten-2 signin-btn">Log In</button>
                                            <div className="red-text center">
                                                {authError ? <p> { authError } </p>: null}
                                            </div>
                                        </div>
                                        <div className="input-field change-password">
                                            <a href="#" className="blue-text center change-password" onClick={ this.handleClick }><span className="change-password-text">Forgot password?</span></a>
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
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
        changePassword: (newPassword) => dispatch(changePassword(newPassword)) 
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
