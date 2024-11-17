// import Post from "./components/Post-backup";

// function App() {  
//   return (
//     <div className="App container tac">
//       <h1 className="title">Voting App</h1>

//       <div className="post-wrap tac">
//         <Post />
//       </div>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React, { useState, useEffect } from 'react';
import Post from './components/Post';
import VotingButton from './components/VotingButton';
import { firestore } from './firebase';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [votes, setVotes] = useState({});
  const [winner, setWinner] = useState('');

  useEffect(() => {
    // Fetch posts from Firebase Firestore
    const unsubscribe = firestore.collection('posts').onSnapshot((snapshot) => {
      const postList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postList);
    });

    return () => unsubscribe();
  }, []);

  const handleVote = (postId) => {
    // Update votes in state
    setVotes((prevVotes) => ({ ...prevVotes, [postId]: (prevVotes[postId] || 0) + 1 }));
  };

  const calculateWinner = () => {
    const maxVotes = Math.max(...Object.values(votes));
    const winningPostId = Object.keys(votes).find((postId) => votes[postId] === maxVotes);
    const winningPost = posts.find((post) => post.id === winningPostId);
    setWinner(winningPost.caption);
  };

  useEffect(() => {
    // Recalculate winner when votes change
    calculateWinner();
  }, [votes]);

  return (
    <div>
      <h1>Instagram Voting App</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} onVote={handleVote} />
      ))}
      <VotingButton winner={winner} />
    </div>
  );
};

export default App;

