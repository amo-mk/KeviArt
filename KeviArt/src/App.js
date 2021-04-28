import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import Navbar from './components/layout/Navbar'
import Home from './components/home/Home'
import Posts from './components/post/Posts';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreatePost from './components/post/CreatePost';
import Profile from './components/users/Profile'
import ChangeProfile from './components/users/ChangeProfile'
import Painting from './art-types/Paintings'
import Graphite from './art-types/Graphite'
import Photography from './art-types/Photography'
import Craft from './art-types/Craft'
import Sculpture from './art-types/Sculpture'
import AllCategories from './art-types/AllCategories'
import Footer from './components/layout/Footer';
import PostComment from './components/post/PostComment';





function App(props) {


  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Posts} />
          <Route path='/home' component={Home} /> 
          <Route path='/signin' component={SignIn} /> 
          <Route path='/signup' component={SignUp} /> 
          <Route path='/createpost' component={CreatePost} /> 
          <Route path='/profile' component={Profile} />
          <Route path='/changeprofile' component={ChangeProfile} />

          <Route path='/paintings' component={Painting} />
          <Route path='/graphite' component={Graphite} />
          <Route path='/photography' component={Photography} />
          <Route path='/craft' component={Craft} />
          <Route path='/sculpture' component={Sculpture} />
          <Route path='/all-categories' component={AllCategories} />
          <Route path='/comments/:id' component={PostComment} />
                    
          
        </Switch>
        
      </div>
    </BrowserRouter>
    
  );
}


export default App;
