import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import KakaoMap from "../components/KakaoMap";
import { useNavigate } from "react-router-dom";


function FeedWrite() {
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
    const [courseList, setCourseList] = useState([]);
    const [searchPlaces, setSearchPlaces] = useState([]);
    const [selectedPlaceType, setSelectedPlaceType] = useState(null);

    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(prev => prev.filter((_, i) => i !== indexToRemove));
    };


    const handleSearch = () => {
        setSearchPlaces([
            { type: "start", keyword: startPlace.name },
            ...waypoints.map((wp, i) => ({ type: `waypoint_${i}`, keyword: wp.name })),
            { type: "end", keyword: endPlace.name },
        ]);
    };

    const handleSubmit = () => {
        const feedData = {
            title,
            content,
            region,
            season,
            bariType,
            locationType,
            ccType,
            courseList: courseList.filter(p => p?.name && p?.lat && p?.lng),
        };

        // 게시글 등록 → 이미지 업로드
        fetch("/feed", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(feedData),
        })
            .then(res => res.json())
            .then(data => {
                console.log("insertId===>", data.insertId);
                const feedNo = data.insertId;

                // 🔽 이미지 업로드
                const formData = new FormData();
                images.forEach(file => formData.append("files", file));
                formData.append("feed_no", feedNo);

                return fetch("/feed/upload", {
                    method: "POST",
                    body: formData,
                });
            })
            .then(res => res.json())
            .then(uploadResult => {
                console.log("✅ 업로드 완료:", uploadResult);
                alert("게시물 등록 완료!");
                navigate("/home");
            })
            .catch(err => {
                console.error("⛔ 오류 발생:", err);
            });
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>새 게시물 만들기</Typography>
            <Box sx={{ maxWidth: "800px", width: "100%", margin: "0 auto", p: 4 }}>
                {/* 선택 드롭다운 */}
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

                {/* 코스 공유 */}
                <Typography variant="h6" fontWeight="bold" mb={1}>1. 코스공유</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <TextField
                        label="출발지"
                        size="small"
                        value={startPlace?.name || ""}
                        onChange={(e) => setStartPlace({ ...startPlace, name: e.target.value })}
                        onFocus={() => setSelectedPlaceType("start")}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    {waypoints.map((wp, idx) => (
                        <TextField
                            key={idx}
                            label={`경유지 ${idx + 1}`}
                            size="small"
                            value={wp?.name || ""}
                            onChange={(e) => {
                                const updated = [...waypoints];
                                updated[idx] = { ...updated[idx], name: e.target.value };
                                setWaypoints(updated);
                            }}
                            onFocus={() => setSelectedPlaceType(`waypoint_${idx}`)}
                        />
                    ))}
                    <Button onClick={() => setWaypoints([...waypoints, { name: "", lat: null, lng: null }])}>
                        경유지 추가
                    </Button>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <TextField
                        label="도착지"
                        size="small"
                        value={endPlace?.name || ""}
                        onChange={(e) => setEndPlace({ ...endPlace, name: e.target.value })}
                        onFocus={() => setSelectedPlaceType("end")}
                    />

                    <Button variant="outlined" onClick={handleSearch}>검색</Button>
                </Box>

                {/* 지도 API */}
                <Box sx={{ width: "100%", height: 300, mb: 3 }}>
                    <KakaoMap
                        searchPlaces={searchPlaces}
                        selectedPlaceType={selectedPlaceType}
                        onSelectPlace={(placeType, placeObj) => {
                            if (placeType === "start") {
                                setStartPlace(placeObj);
                            } else if (placeType?.startsWith("waypoint_")) {
                                const index = Number(placeType.split("_")[1]);
                                const updated = [...waypoints];
                                updated[index] = placeObj;
                                setWaypoints(updated);
                            } else if (placeType === "end") {
                                setEndPlace(placeObj);
                            }

                            setCourseList((prev) => {
                                const index =
                                    placeType === "start"
                                        ? 0
                                        : placeType === "end"
                                            ? waypoints.length + 1
                                            : Number(placeType.split("_")[1]) + 1;

                                const updated = [...prev];
                                updated[index] = placeObj;
                                return updated;
                            });
                        }}
                    />
                </Box>

                {/* 제목 */}
                <Typography variant="h6" fontWeight="bold" mb={1}>2. 제목 (선택)</Typography>
                <TextField
                    fullWidth
                    placeholder="제목 입력"
                    sx={{ mb: 3 }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* 설명 */}
                <Typography variant="h6" fontWeight="bold" mb={1}>3. 설명</Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="코스 설명을 입력해주세요."
                    sx={{ mb: 3 }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                {/* 파일 업로드 */}
                <Typography variant="h6" fontWeight="bold" mb={1}>4. 첨부파일</Typography>
                {/* 이미지 미리보기 */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
                    {images.map((img, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                width: 100,
                                height: 100,
                                borderRadius: 2,
                                overflow: "hidden",
                                border: "1px solid #ccc",
                            }}
                        >
                            <img
                                src={URL.createObjectURL(img)}
                                alt={`preview-${index}`}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <IconButton
                                onClick={() => handleRemoveImage(index)}
                                sx={{
                                    position: "absolute",
                                    top: 4,
                                    right: 4,
                                    backgroundColor: "#000",
                                    color: "#fff",
                                    width: 24,
                                    height: 24,
                                    "&:hover": { backgroundColor: "#333" },
                                }}
                            >
                                <CloseIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
                {/* 숨긴 파일 선택 input */}
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setImages(files);
                    }}
                />

                {/* 커스텀 버튼으로 대체 */}
                <Button
                    variant="outlined"
                    onClick={() => document.getElementById("fileInput").click()}
                >
                    파일 선택
                </Button>


                <Box textAlign="right">
                    <Button variant="contained" onClick={handleSubmit}>게시</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default FeedWrite;
