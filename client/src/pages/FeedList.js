import React, { useEffect, useState } from "react";
import FeedCard from "../components/feed/FeedCard";


function FeedList({ filters }) {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    let queryString = "";

    if (filters) {
      const parts = [];

      if (filters.region) parts.push(`region=${filters.region}`);
      if (filters.season) parts.push(`season=${filters.season}`);
      if (filters.bariType) parts.push(`bariType=${filters.bariType}`);
      if (filters.locationType) parts.push(`locationType=${filters.locationType}`);
      if (filters.ccType) parts.push(`ccType=${filters.ccType}`);
      if (filters.keyword) parts.push(`keyword=${filters.keyword}`);

      queryString = parts.length > 0 ? "?" + parts.join("&") : "";
    }

    const url = queryString
      ? `http://localhost:3005/feed/search${queryString}`
      : `http://localhost:3005/feed`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const feedData = data.feeds || data.list;
        setFeeds(feedData);
      });
  }, [filters]);



  return (
    <>
      {feeds.length === 0 ? (
        <p style={{ color: "gray", textAlign: "center", paddingTop: "2rem" }}>게시글이 없습니다.</p>
      ) : (
        feeds.map((feed) => <FeedCard key={feed.feed_no} feed={feed} />)
      )}
    </>
  );
}

export default FeedList;
