import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { database } from "../firestoreConfig";

const ImagesContext = createContext();

export const useImages = () => useContext(ImagesContext);

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(
          collection(database, "images"),
          orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setImages(data);
          setLoading(false);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <ImagesContext.Provider value={{ images, loading }}>
      {children}
    </ImagesContext.Provider>
  );
};

export default ImagesContext;
