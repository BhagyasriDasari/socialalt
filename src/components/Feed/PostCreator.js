import React, { Component } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

class PostCreator extends Component {
  state = {
    text: "",
    image: null,
  };

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  };

  handleImageChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { text, image } = this.state;
    let imageUrl = null;

    if (image) {
      const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, "posts"), {
      text,
      image: imageUrl,
      timestamp: serverTimestamp(),
    });

    // Reset state after submission
    this.setState({ text: "", image: null });
  };

  render() {
    const { text } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          value={text}
          onChange={this.handleTextChange}
          placeholder="What's on your mind?"
        />
        <input type="file" onChange={this.handleImageChange} />
        <button type="submit">Post</button>
      </form>
    );
  }
}

export default PostCreator;
