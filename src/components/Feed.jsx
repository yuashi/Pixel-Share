import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utils/data";

const Feed = () => {
  const [loading, setloading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setloading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setloading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setloading(false);
      });
    }
  }, [categoryId]);

  if (loading) return <Spinner message="We are loading your feed !" />;
  if (!pins?.length)
    return <div className="mt-10 text-center text-xl ">No Images Found !</div>;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
