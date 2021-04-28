import React, { Component } from 'react'
import M from 'materialize-css'; 
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignOutLinks from './SignOutLinks'
import { connect } from 'react-redux'



class Navbar extends Component{
    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
        
        let elem = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    } 
    render () {
        const { auth , profile} = this.props;  
        //console.log(auth)
        const links = auth.uid ? <SignedInLinks profile={ profile }/> : <SignOutLinks />;
        return (
            <div>
                <ul id="dropdown1" className="dropdown-content">
                    {/**Insert Link tags on Categories later and remve the divider*/}
                        <Link to="/paintings"><li><a href="/paintings">Paintings</a></li></Link>
                        <Link to="/graphite"><li><a href="/graphite">Graphite</a></li></Link>
                        <Link to="/photography"><li><a href="/photography">Photography</a></li></Link>
                        <Link to="/craft"><li><a href="/craft">Craft</a></li></Link>
                        <Link to="sculpture"><li><a href="/sculpture">Sculpture</a></li></Link>
                        <li className="divider" tabindex="-1"></li>
                        <Link to="/all-categories"><li><a href="/all-categories">All Categories</a></li></Link>
                </ul>
                

                <nav className="nav-wrapper navbar">
                    <div className="container">
                        <Link to='/' className="brand-logo">KeviArt</Link>
                        <ul className="right hide-on-med-and-down">                 
                            <li>
                                <a
                                    className="dropdown-trigger"
                                    href="#"
                                    data-target="dropdown1">Category
                                    <i className="material-icons right">arrow_drop_down</i>
                                </a>
                            </li>
                            <li>{ links }</li>          
                        </ul>
                        <a href="#" className="sidenav-trigger hide-on-lg" data-target="mobile-links">
                            <i className="material-icons">menu</i>
                        </a> 
                    </div>   
                </nav>
                <ul className="sidenav" id="mobile-links">
                    <li>
                        <a
                            href="#"
                            data-target="dropdown1">Category  
                            <i className="material-icons right">arrow_drop_down</i>
                        </a>
                    </li>
                    <li>{links}</li>      
                </ul>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
        
    }
}

export default connect(mapStateToProps)(Navbar);