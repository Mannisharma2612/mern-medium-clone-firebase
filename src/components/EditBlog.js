import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import db from "../firebase";

const EditBlog = () => {

    const [dataPost, setDataPost] = useState(null);
    const { id } = useParams();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        db.collection("posts")
          .doc(id)
          .get()
          .then((doc) => {
            setDataPost(doc.data());
            setContent(doc.data()?.paragraph);
            setTitle(doc.data()?.title);
          });
      }, [id]);


        const handleSubmit = (e) => {
            e.preventDefault();
            
            db.collection("posts").doc(id).update({
                title:title,
                paragraph:content,
            })
            .then(() => {
                console.log("Document successfully written!");
                history.push('/');
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

        }

    return(
        <div className = "editBlog">
        <h2>Edit Blog</h2>
        <form onSubmit={ handleSubmit }>
            <label for="newTitle">New Title:</label>
            <input 
                name="newTitle"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            ></input>
            <label for="newContent">New Content:</label>
            <textarea
                name="newContent"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button>Confirm Changes</button>
        </form>
        </div>
        );
}

export default EditBlog;