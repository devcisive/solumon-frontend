import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';

const useFetchOrderedData = (orderByField, order) => {
  const [orderedData, setOrderedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, 'posts-write'), orderBy(orderByField, order)),
      );
      const dataList = querySnapshot.docs.map((doc) => ({
        postId: doc.id,
        ...doc.data(),
      }));
      setOrderedData(dataList);
    };

    fetchData();
  }, [orderByField, order]);

  return orderedData;
};

export default useFetchOrderedData;
