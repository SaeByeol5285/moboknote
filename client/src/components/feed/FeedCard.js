import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms";
import { Box, Card, CardContent, Typography, } from "@mui/material";
import FeedHeader from "./FeedHeader";
import FeedActionButtons from "./FeedActionButtons";
import BookmarkBtn from "./BookmarkBtn";
import LikeBtn from "./LikeBtn";

function FeedCard({ feed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useRecoilValue(userState);
  const currentUserId = user.member_no;
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // 본문 펼침 여부


  useEffect(() => {
    fetch(`http://localhost:3005/comment/${feed.feed_no}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setComments(data.comments);
        }
      });
  }, [feed.feed_no]);



  return (
    <Card
      onClick={() => navigate(`/feed/${feed.feed_no}`, {
        state: { backgroundLocation: location },
      })}
      sx={{ cursor: "pointer", margin: "14px" }}
    >

      <CardContent sx={{ display: "flex", alignItems: "center", padding: "14px" }}>
        <FeedHeader
          feed={feed}
          currentUserId={currentUserId}
          profileImg={user.profile_img}
        />
      </CardContent>


      {/* 이미지 */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1 / 1", // ✅ 정사각형 유지 
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >

        <img
          src={`http://localhost:3005/${feed.file_path}`}
          alt="피드 이미지"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // ✅ 꽉 채우고 잘라도 됨
            display: "block",
          }}
        />
      </Box>

      {/* 아이콘 버튼들 */}
      {feed.member_no !== user.member_no ? (
        <FeedActionButtons
          BookmarkComponent={<BookmarkBtn feed_no={feed.feed_no} />}
          LikeComponent={<LikeBtn feed_no={feed.feed_no} onCountChange={delta => setLikeCount(prev => prev + delta)} />}
          likeCount={likeCount}
          showSend={true}
        />
      ) : (
        <FeedActionButtons
          showBookmark={false}
          showSend={false}
          LikeComponent={<LikeBtn feed_no={feed.feed_no} onCountChange={delta => setLikeCount(prev => prev + delta)} />}
          likeCount={likeCount}
        />
      )}

      {/* 본문 + 댓글 */}
      <CardContent sx={{ pt: 0 }}>
        {/* 본문 (더보기 포함) */}
        <Typography variant="body2">
          {(() => {
            const fullText = `${feed.title} ${feed.content || ""}`.trim(); // 제목 + 본문
            const preview = isExpanded ? fullText : fullText.slice(0, 30);
            return (
              <>
                <strong>{feed.nickname}</strong>{" "}
                {isExpanded ? (
                  fullText
                ) : (
                  <>
                    {preview}
                    {fullText.length > 30 && (
                      <span
                        style={{ color: "#888", cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsExpanded(true);
                        }}
                      >
                        ... 더보기
                      </span>
                    )}
                  </>
                )}
              </>
            );
          })()}
        </Typography>


        {/* 댓글 목록 출력 */}
        {comments.length > 0 && (
          <>
            <Typography variant="body2" sx={{ color: "#888", mt: 1 }}>
              댓글 {comments.length}개 모두 보기
            </Typography>

            {/* 최근 댓글 1개만 미리 보여주기 */}
            <Typography variant="body2">
              <strong>{comments[comments.length - 1].nickname}</strong>{" "}
              {comments[comments.length - 1].content}
            </Typography>

          </>
        )}
        {(!comments || comments.length === 0) && (
          <Typography variant="body2" sx={{ color: "#888", mt: 1 }}>
            아직 댓글이 없습니다.
          </Typography>
        )}

      </CardContent>
    </Card>
  );
}

export default FeedCard;
