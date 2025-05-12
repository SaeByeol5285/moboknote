import React, { useEffect, useState } from "react";
import FeedCard from "../components/FeedCard";

function FeedList() {
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3005/feed")
      .then(res => res.json())
      .then(data => {
        setFeeds(data.list);
      });
  }, []);


  return (
    <>
      {feeds.map(feed => (
        <FeedCard key={feed.feed_no} feed={feed} />
      ))}
    </>
  );
}

export default FeedList;
