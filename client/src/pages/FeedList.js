import React, { useEffect, useState } from "react";
import FeedCard from "../components/feed/FeedCard";
import { useLocation } from "react-router-dom";


function FeedList() {
  const [feeds, setFeeds] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:3005/feed")
      .then(res => res.json())
      .then(data => {
        setFeeds(data.list);
      });
  },[location]);


  return (
    <>
      {feeds.map(feed => (
        <FeedCard key={feed.feed_no} feed={feed} />
      ))}
    </>
  );
}

export default FeedList;
