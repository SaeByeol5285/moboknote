import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
    Box, Typography, TextField, Button, Select, MenuItem
} from "@mui/material";
import KakaoMap from "../components/KakaoMap";

function FeedEdit() {
    const { no } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [region, setRegion] = useState("");
    const [season, setSeason] = useState("");
    const [bariType, setBariType] = useState("");
    const [locationType, setLocationType] = useState("");
    const [ccType, setCcType] = useState("");

    const [startPlace, setStartPlace] = useState({ name: "", lat: null, lng: null });
    const [waypoints, setWaypoints] = useState([]);
    const [endPlace, setEndPlace] = useState({ name: "", lat: null, lng: null });
    const [searchPlaces, setSearchPlaces] = useState([]);
    const [selectedPlaceType, setSelectedPlaceType] = useState(null);
    const [courseList, setCourseList] = useState([]);

    const location = useLocation();

    useEffect(() => {
        fetch(`/feed/${no}`)
            .then(res => res.json())
            .then(data => {
                const feed = data.info;
                console.log("feed ===> ", feed);
                setTitle(feed.title);
                setContent(feed.content);
                setRegion(feed.region);
                setSeason(feed.season);
                setBariType(feed.bari_type);
                setLocationType(feed.place_type);
                setCcType(feed.bike_cc);

                const fullCourse = data.course.map(item => ({
                    name: item.place_name,
                    lat: item.latitude,
                    lng: item.longitude,
                }));

                setCourseList(fullCourse);

                if (fullCourse.length >= 2) {
                    setStartPlace(fullCourse[0]);
                    setEndPlace(fullCourse[fullCourse.length - 1]);
                    setWaypoints(fullCourse.slice(1, -1));
                } else if (fullCourse.length === 1) {
                    setStartPlace(fullCourse[0]);
                    setEndPlace({});
                    setWaypoints([]);
                } else {
                    setStartPlace({});
                    setEndPlace({});
                    setWaypoints([]);
                }


            });

    }, [no]);


    const handleSearch = () => {
        setSearchPlaces([
            { type: "start", keyword: startPlace.name },
            ...waypoints.map((wp, i) => ({ type: `waypoint_${i}`, keyword: wp.name })),
            { type: "end", keyword: endPlace.name },
        ]);
    };

    const handleSubmit = () => {
        const updated = {
            title, content, region, season, bariType, locationType, ccType,
            courseList: courseList.filter(p => p?.name && p?.lat && p?.lng),
        };

        fetch(`/feed/${no}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        })
            .then(res => res.json())
            .then(data => {
                alert("수정 완료!");
                navigate(`/feed/${no}`, {
                    state: { backgroundLocation: { pathname: "/home" } },
                    replace: true, // ✅ 현재 주소를 바꾸지 않음
                });
            });

    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>게시글 수정</Typography>

            <TextField fullWidth label="제목" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
            <TextField fullWidth multiline rows={4} label="내용" value={content} onChange={(e) => setContent(e.target.value)} sx={{ mb: 2 }} />

            {/* 드롭다운들 */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>

                <Select value={region} onChange={(e) => setRegion(e.target.value)} displayEmpty size="small" fullWidth>
                    <MenuItem value="" disabled>지역 선택</MenuItem>
                    <MenuItem value="seoul">서울특별시</MenuItem>
                    <MenuItem value="busan">부산광역시</MenuItem>
                    <MenuItem value="daegu">대구광역시</MenuItem>
                    <MenuItem value="incheon">인천광역시</MenuItem>
                    <MenuItem value="gwangju">광주광역시</MenuItem>
                    <MenuItem value="daejeon">대전광역시</MenuItem>
                    <MenuItem value="ulsan">울산광역시</MenuItem>
                    <MenuItem value="gyeonggi">경기도</MenuItem>
                    <MenuItem value="gangwon">강원도</MenuItem>
                    <MenuItem value="chungbuk">충청북도</MenuItem>
                    <MenuItem value="chungnam">충청남도</MenuItem>
                    <MenuItem value="jeonbuk">전라북도</MenuItem>
                    <MenuItem value="jeonnam">전라남도</MenuItem>
                    <MenuItem value="gyeongbuk">경상북도</MenuItem>
                    <MenuItem value="gyeongnam">경상남도</MenuItem>
                    <MenuItem value="jeju">제주특별자치도</MenuItem>
                </Select>
                <Select value={season} onChange={(e) => setSeason(e.target.value)} displayEmpty size="small" fullWidth>
                    <MenuItem value="" disabled>계절 선택</MenuItem>
                    <MenuItem value="spring">봄</MenuItem>
                    <MenuItem value="summer">여름</MenuItem>
                    <MenuItem value="fall">가을</MenuItem>
                    <MenuItem value="winter">겨울</MenuItem>
                </Select>
                <Select value={bariType} onChange={(e) => setBariType(e.target.value)} displayEmpty size="small" fullWidth>
                    <MenuItem value="" disabled>바리 선택</MenuItem>
                    <MenuItem value="night">밤바리</MenuItem>
                    <MenuItem value="oneday">당일바리</MenuItem>
                    <MenuItem value="twoday">1박2일</MenuItem>
                    <MenuItem value="etc">기타</MenuItem>
                </Select>
                <Select value={locationType} onChange={(e) => setLocationType(e.target.value)} displayEmpty size="small" fullWidth>
                    <MenuItem value="" disabled>장소 선택</MenuItem>
                    <MenuItem value="mountain">산/숲</MenuItem>
                    <MenuItem value="coastal">해안도로</MenuItem>
                    <MenuItem value="urban">도시</MenuItem>
                    <MenuItem value="straight">직선코스</MenuItem>
                    <MenuItem value="curve">곡선코스</MenuItem>
                    <MenuItem value="etc">기타</MenuItem>
                </Select>
                <Select value={ccType} onChange={(e) => setCcType(e.target.value)} displayEmpty size="small" fullWidth>
                    <MenuItem value="" disabled>바이크 cc</MenuItem>
                    <MenuItem value="125">125cc</MenuItem>
                    <MenuItem value="quarter">쿼터급 (125~400cc)</MenuItem>
                    <MenuItem value="middle">미들급 (400~900cc)</MenuItem>
                    <MenuItem value="liter">리터급</MenuItem>
                </Select>
            </Box>


            {/* 코스 공유 영역 */}
            <Typography variant="h6" fontWeight="bold" mb={1}>코스 공유</Typography>

            <TextField fullWidth label="출발지" value={startPlace.name || ""} onChange={(e) => setStartPlace({ ...startPlace, name: e.target.value })} onFocus={() => setSelectedPlaceType("start")} sx={{ mb: 1 }} />

            {waypoints.map((wp, i) => (
                <TextField
                    key={i}
                    fullWidth
                    label={`경유지 ${i + 1}`}
                    value={wp.name || ""}
                    onChange={(e) => {
                        const updated = [...waypoints];
                        updated[i] = { ...updated[i], name: e.target.value };
                        setWaypoints(updated);
                    }}
                    onFocus={() => setSelectedPlaceType(`waypoint_${i}`)}
                    sx={{ mb: 1 }}
                />
            ))}

            <TextField fullWidth label="도착지" value={endPlace.name || ""} onChange={(e) => setEndPlace({ ...endPlace, name: e.target.value })} onFocus={() => setSelectedPlaceType("end")} sx={{ mb: 2 }} />

            <Button variant="outlined" onClick={handleSearch} sx={{ mb: 3 }}>장소 검색</Button>

            <Box sx={{ width: "100%", height: 300, mb: 3 }}>
                <KakaoMap
                    searchPlaces={searchPlaces}
                    selectedPlaceType={selectedPlaceType}
                    onSelectPlace={(placeType, placeObj) => {
                        if (placeType === "start") setStartPlace(placeObj);
                        else if (placeType?.startsWith("waypoint_")) {
                            const index = Number(placeType.split("_")[1]);
                            const updated = [...waypoints];
                            updated[index] = placeObj;
                            setWaypoints(updated);
                        } else if (placeType === "end") setEndPlace(placeObj);

                        setCourseList((prev) => {
                            const index =
                                placeType === "start" ? 0 :
                                    placeType === "end" ? waypoints.length + 1 :
                                        Number(placeType.split("_")[1]) + 1;

                            const updated = [...prev];
                            updated[index] = placeObj;
                            return updated;
                        });
                    }}
                />
            </Box>

            <Box textAlign="right">
                <Button variant="contained" onClick={handleSubmit}>수정 완료</Button>
            </Box>
        </Box>
    );
}

export default FeedEdit;
