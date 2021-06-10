import React, { useEffect, useState } from "react";
import 'firebase/auth';
import 'firebase/firestore';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import { useParams } from "react-router";
import {useHistory} from 'react-router-dom';
import db from "./firebase";
import './App.scss';
import { CircularProgress } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import firebase from 'firebase';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

const PostBody = () => {
  const [dataPost, setDataPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(''); 

  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    db.collection("posts")
      .doc(id)
      .get()
      .then((doc) => {
        setDataPost(doc.data());
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    db.collection("posts")
    .doc(id)
    .collection("comments")
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      setComments(snapshot.docs.map((doc) => ({text: doc.data()})));
    });
  }, [id]);


  // funtion to handle edits
  const handleEdit = () => {
    history.push('/Post/EditBlog/'+ id);
  }

  
  // like/dislike a blog
  const like = () => {
    console.log("like");
    let x = document.getElementById('like');
    if(x.style.color==="grey"){
      x.style.color="red";
    }
    else{
      x.style.color="grey";
    }
  }

  //delete a blog
  function deleteBlog () {
    db.collection("posts").doc(id).delete().then(() => {
      history.push('/');
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }

  


  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(id).collection("comments").add({
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  }

  return (
    <div className="postBody">
      
      {loading ? (
        <CircularProgress
          style={{ margin: "100px 0", color: "#9AC4F8" }}
          size={100}
        />
      ) : (
        <div className="postBody_container postContainer">
          <h1>{dataPost?.title}</h1>
          <h2 style={{paddingTop: '20px'}}>-{'  '} {dataPost?.author}</h2>

          <div
            className="postBody_image"
            style={{ backgroundImage: `url(${dataPost?.image})` }}
          />

          <p>{dataPost?.paragraph}</p>

          <div className="postBody_icons">
            <div className="postBody_Container">
            <FavoriteIcon id="like" onClick={like}/>
          
            </div>

            <div className="postBody_Container">
            <EditIcon onClick={handleEdit} />
              <DeleteOutline onClick={deleteBlog}/>
            </div>
          </div>

            <div>
              {comments.map((comt) => {
                <p>
                  <strong>{comt.text}</strong>
                </p>
              })}
            </div>

          <div className="postBody_Container">
            <h3>Comments: </h3>
            
            
            <Form>
              <Form.Group>
                <Form.Control
                  className="inp"
                  type="text"
                  placeholder="Add a comment... "
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{borderLeft:'0',borderRight:'0',borderTop:'0',width:'70%'}}
                />
                <Button 
                  style={{marginLeft:'10px'}}
                  variant="outlined" 
                  color="primary"
                  size='medium'
                  disabled={!comment}
                  type="submit"
                  onClick={postComment}
                >
                Post
              </Button>
              </Form.Group>
              
              
            </Form>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default PostBody;
