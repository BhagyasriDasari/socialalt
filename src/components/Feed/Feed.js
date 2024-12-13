import React, { Component } from "react";
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCreator from "./PostCreator";

class Feed extends Component {
  // Initialize state as a class field
  state = {
    posts: [],
    lastVisible: null,
    hasMore: true,
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(5));
    const querySnapshot = await getDocs(q);

    this.setState({
      posts: querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
    });
  };

  fetchMorePosts = async () => {
    const { lastVisible, posts } = this.state;

    if (!lastVisible) return;

    const q = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      startAfter(lastVisible),
      limit(5)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      this.setState({ hasMore: false });
      return;
    }

    this.setState({
      posts: [
        ...posts,
        ...querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      ],
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
    });
  };

  render() {
    const { posts, hasMore } = this.state;

    return (
      <>
        <PostCreator />
        <InfiniteScroll
          dataLength={posts.length}
          next={this.fetchMorePosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more posts to show.</p>}
        >
          {posts.map((post) => (
            <div key={post.id}>
              <p>{post.text}</p>
              {post.image && <img src={post.image} alt="post" />}
            </div>
          ))}
        </InfiniteScroll>
      </>
    );
  }
}

export default Feed;
