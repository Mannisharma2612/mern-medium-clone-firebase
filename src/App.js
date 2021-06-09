import { Button, Container, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import {   Redirect, Route, Switch } from "react-router";
import db from "./firebase";
import "./App.scss";
import MediumPosts from "./components/MediumPosts";
import NavBar from "./components/NavBar";
import PostBody from "./PostBody";
import firebase from "firebase";
import Login from './components/Login';
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import ForgotPassword from "./components/ForgotPassword";
import EditBlog from "./components/EditBlog";

function App() {
  const [value, setValues] = useState({ title: "",author:"", paragraph: "", url: "" });
  const [posts, setPosts] = useState([]);


  const changeValue = (e) => {
    setValues({ ...value, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      title: value.title,
      author: value.author,
      paragraph: value.paragraph,
      image: value.url,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setValues({ ...value, title: "",author:"", paragraph: "", url: "" });
    
    


  };

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

  var user = firebase.auth().currentUser;
  if(user != null) {
    return (
      <div className="App">
      
      <AuthProvider>
      <NavBar />
      <Switch>
        <Route exact path="/">
          
          

          <div className="App_MainSection">
            <Container>
              <Grid container justify="center" alignItems="center">
                <Grid item lg={6}>
                  <h1>Where good ideas find you</h1>

                  <p>
                    Read and share new perspectives on just about any topic.
                    Everyone’s welcome. <a href="!#">Learn more.</a>
                  </p>

                  <Button>Get Started</Button>
                </Grid>
                <Grid item container justify="center" lg={6}>
                  <img
                    src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
                    alt="medium"
                  />
                </Grid>
              </Grid>
            </Container>
          </div>
          
          <form onSubmit={submit}>
            <Container>
              <h1>Create your Medium Post</h1>
              <div className="Form_InputDivs">
                <p>Title</p>
                <input
                  value={value.title}
                  name="title"
                  type="text"
                  placeholder="Title..."
                  onChange={changeValue}
                  required
                />
              </div>
              <div className="Form_InputDivs">
                <p>Author</p>
                <input
                  value={value.author}
                  name="author"
                  type="text"
                  placeholder="Author..."
                  onChange={changeValue}
                  required
                />
              </div>
              <div className="Form_InputDivs">
                <p>Paragraph</p>
                <input
                  value={value.paragraph}
                  type="text"
                  placeholder="Paragraph..."
                  name="paragraph"
                  onChange={changeValue}
                  required
                />
              </div>
              <div className="Form_InputDivs">
                <p>Image URL</p>
                <input
                  value={value.url}
                  type="text"
                  placeholder="Image URL"
                  name="url"
                  onChange={changeValue}
                  required
                />
              </div>

              <div className="Form_SubmitBtn">
                <Button type="submit">Submit</Button>
              </div>
            </Container>
          </form>
          
          <div className="App_posts">
            <Container>
              {posts.map(({ id, data }) => (
                <MediumPosts key={id} id={id} data={data} />
              ))}
            </Container>
          </div>
        
        </Route>
        <Route path="/SignUp" component={Signup}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route path = "/forgot-password" component={ForgotPassword} />
        <Route path="/Post/EditBlog/:id" component={EditBlog}></Route>
        <Route path="/Post/:id">
          <PostBody />
        </Route>
      </Switch>
      </AuthProvider>
    </div>
    );
  }
  else {
    return (
        <Redirect to="/LogIn" />
    );
  }
}

export default App;
