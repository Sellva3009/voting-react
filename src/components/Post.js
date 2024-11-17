// src/components/Post.js
import React from "react";

const Post = ({ post, onVote }) => {
  return (
    <div>
      <img src={post.imageUrl} alt={post.caption} />
      <p>{post.caption}</p>
      <button onClick={() => onVote(post.id)}>Vote</button>
    </div>
  );
};

export default Post;
