import React, { useState } from 'react';
// import { InstagramEmbed } from "react-social-media-embed";
import Embed from "react-embed";
import '../firebase';
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore';

const Post = () => {
    // const [winnerCount, setWinnerCount] = useState(0);
    const [items, setItems] = useState([
      {
        id: 1,
        name: "Chaitra Reddy",
        url: "https://www.instagram.com/p/C2IAOkDxzQC/?igsh=MW8zY3U2NnAzbzlxdA==",
        likes: 0,
      },
      {
        id: 2,
        name: "Keerthy Suresh",
        url: "https://www.instagram.com/p/C2IS2BlP2dq/?igsh=cTRncm9qamU2eDBr",
        likes: 0,
      },
      {
        id: 3,
        name: "Prathnanthan",
        url: "https://www.instagram.com/p/C2HU-ZCL2gn/?igsh=Z211bHd1cTE1OGl2",
        likes: 0,
      },
      {
        id: 4,
        name: "Samyuktha Shan",
        url: "https://www.instagram.com/p/C2IDiD6S-nN/?igsh=MWd3ajFhbGowcW5lZg==",
        likes: 0,
      },
      {
        id: 5,
        name: "Nivetha Pethuraj",
        url: "https://www.instagram.com/p/C2H2TblBiTU/?igsh=bDR4ZDlhOGgwNDNr",
        likes: 0,
      },
      {
        id: 6,
        name: "Reba John",
        url: "https://www.instagram.com/reel/C2H5lWJr-su/?igsh=MTFydWg4OGJreXlrcA==",
        likes: 0,
      },
      {
        id: 7,
        name: "Anjali",
        url: "https://www.instagram.com/p/C2HQXCIxucE/?igsh=dmZldnJmZXpkZXc2",
        likes: 0,
      },
      {
        id: 8,
        name: "Rashmika Mandanna",
        url: "https://www.instagram.com/p/C2HvUUVotb9/?igsh=MXVvczVyYnpibnFmeA==",
        likes: 0,
      },
      {
        id: 9,
        name: "Samantha ruth Prabhu",
        url: "https://www.instagram.com/p/C2H17H0rlh4/?igsh=aTB2bHUyZXZ2Z2Yz",
        likes: 0,
      },
      {
        id: 10,
        name: "Indhuja Ravichandran",
        url: "https://www.instagram.com/p/C2Hxg1FPg7K/?igsh=MWNpdml2OTl0cWN2bA==",
        likes: 0,
      },
      {
        id: 11,
        name: "Athulya",
        url: "https://www.instagram.com/p/C2Hl11ULzDy/?igsh=aXlmbDE0dnMzNnZ0",
        likes: 0,
      },
      {
        id: 12,
        name: "Gaby",
        url: "https://www.instagram.com/reel/C2HfRJVvmu5/?igsh=MW4xY290M3lzZWp2eA==",
        likes: 0,
      },
      {
        id: 13,
        name: "Aathmika",
        url: "https://www.instagram.com/p/C2HaScnhlQN/?igsh=MWVwMHowb3hkbmM4cQ==",
        likes: 0,
      },
      {
        id: 14,
        name: "Pragyanagra",
        url: "https://www.instagram.com/p/C2HA8HxvPzf/?igsh=dTBzcWg2aW05cDI0",
        likes: 0,
      },
      {
        id: 15,
        name: "Smruthi Venkat",
        url: "https://www.instagram.com/reel/C2G5P8goLzi/?igsh=MWMzd3l1cWNteXJrOQ==",
        likes: 0,
      },
      {
        id: 16,
        name: "Iswarya Menon",
        url: "https://www.instagram.com/p/C2FM5rHPuXD/?igsh=MWJpemNoN3ZnbHkyeA==",
        likes: 0,
      },
      {
        id: 17,
        name: "Janhvi kapoor",
        url: "https://www.instagram.com/p/C1tN3oMoWVl/?igsh=MW05NjJkbnQ2MjB3",
        likes: 0,
      },
    ]);

    const db = getFirestore();

    const saveDataToFirestore = async () => {
      const docRef = await addDoc(collection(db, "myCollection"), {
        items: items
      });
      console.log(docRef);
      alert("Document written to Database");
    };

    saveDataToFirestore();

    const fetchDataFromFirestore = async () => {
      const querySnapshot = await getDocs(collection(db, "myCollection"));
      const temporaryArr = [];
      querySnapshot.forEach((doc) => {
        temporaryArr.push(doc.data());
      });
      setItems(temporaryArr);
    };

    fetchDataFromFirestore();

    const handleClick = (itemId) => {
      const clickedItem = items.find(item => item.id === itemId);
      clickedItem.likes += 1;
      setItems([...items]);
    };

    const calculateWinner = () => {
      // Find the item with the highest number of votes
      const winner = items.reduce(
        (prev, current) => (prev.likes > current.likes ? prev : current),
        {}
      );

      console.log("Winner:", winner);
      // setWinnerCount(winner);
    };
  return (
    <>
      <ul>
        {items.map((item) => (
          <li key={item.id} onClick={() => handleClick(item.id)}>
            <h4>{item.name}</h4>
            {/* <InstagramEmbed
              url={item.url}
            /> */}
            <Embed url={item.url} title={item.name} />
            <h5 className="vote">Makkal vote - {item.likes}</h5>
          </li>
        ))}
      </ul>
      <button onClick={calculateWinner} className='calculateBtn'>Calculate Winner</button>
      {/* <div style={{ display: "flex", justifyContent: "center" }}></div> */}

      {/* {winnerCount && `Winner is ${Winner.name}` } */}
    </>
  );
}

export default Post