import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { getDocs, collection, query, where } from 'firebase/firestore';
import useFetchOrderedData from './useFetchOrderedData';

const useFetchInterestsData = (user) => {
  const [myInterest, setMyInterest] = useState([]);
  const [interestsData, setInterestsData] = useState([]);
  const postData = useFetchOrderedData('created_at', 'desc');

  useEffect(() => {
    const fetchInterestsData = async () => {
      if (user) {
        const userQuery = query(
          collection(db, 'users'),
          where('uid', '==', user.uid),
        );

        const querySnapshot = await getDocs(userQuery);
        const userDoc = querySnapshot.docs[0];

        if (userDoc) {
          setMyInterest(userDoc.data().interests);
        }

        if (postData.length > 0 && myInterest.length > 0) {
          const interestPosts = postData.filter(
            (post) =>
              post.tags &&
              Array.isArray(post.tags.hashTag) &&
              post.tags.hashTag.some((tag) => myInterest.includes(tag)),
          );

          setInterestsData(interestPosts);
        }
      }
    };

    fetchInterestsData();
  }, [user]);

  return interestsData;
};

export default useFetchInterestsData;
