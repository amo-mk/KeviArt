import React from 'react'
import { connect } from 'react-redux'
import createPost from '../../store/actions/postActions'
import postReducer from '../../store/reducers/postReducer'

const ProgressBar = (props) => {
    const { progress } = props;
    //console.log(progress)
    return (
        <div className="progress-bar">     
            
        </div>
    )
}
const mapStateToProps = (state) => {
    //console.log(state)
    return {
        progress: state.post.progress
    }
}

export default connect (mapStateToProps)(ProgressBar);