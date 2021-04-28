import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createPost } from '../../store/actions/postActions'
import ProgressBar from './ProgressBar'

class PostCreation extends Component {
    state = {
        category: '',
        description: '',
        file: '',
        name: ' Please select a PNG or JPG image file',
        progress: 0
    }
    handleChange = (e)=> {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleFileChange = (e) => {
        let selected = e.target.files[0];
        
        const typesAllowed = ['image/png', 'image/jpeg'];
        if (selected && typesAllowed.includes(selected.type)) {
            this.setState({
                file: selected,
                name: selected.name
            }) 
        } else {
            this.setState({
                category: '',
                description: '',
                file: '',
                name: 'Error! Choose image file',
                progress: 0
            }) 
        }
    }
    handleSubmit = (e) => {

        e.preventDefault(); 
        
        console.log(this.state)
        const post = this.state;
        this.props.createPost(post)
        this.props.history.push('/home');
        //console.log(this.props.history)
        //console.log(this.state.progress)
    }

    render() {
        return (
            <div className="create-post">
                <form onSubmit={this.handleSubmit}>
                    <div className="card">
                        {<ProgressBar />}
                        <div className="card-action">
                            <h5 className="grey-text text-darken-3">Add Post</h5>    
                            
                            <div className=" file-field input-field ">
                                   
                                <div className=" file-input">
                                    <i className="material-icons text-color-white">add_photo_alternate</i>
                                    <span>{this.state.name}
                                        <input required type="file" accept="image" className="file-input" name="file" id="file" onChange={this.handleFileChange} />
                                    </span>
                                </div>
                                

                            </div>
                            <div className="input-field">
                                    <select required id="category"value={this.value} onChange={this.handleChange}className="browser-default">
                                            <option value="" disabled selected>Category</option>
                                            <option value="Painting">Painting</option>
                                            <option value="Graphite">Graphite</option>
                                            <option value="Photography">Photography</option>
                                            <option value="Craft">Craft</option>
                                            <option value="Sculpture">Sculpture</option>
                                    </select>                                   
                                </div>                         
                                <div className="input-field">
                                    <label htmlFor="description">Description</label>
                                    <input required type="text" name="description" id="description" onChange={ this.handleChange }/>
                                </div>
                                <div className="input-field">
                                    <button className="btn lighten-2 signin-btn">Add Post</button>
                                </div>
                        </div>
                    </div>                              

                </form>
            </div>

        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post))
    }    
}

export default withRouter(connect(null, mapDispatchToProps)(PostCreation))
