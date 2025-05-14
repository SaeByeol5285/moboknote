import React, { useEffect, useRef } from "react";

function KakaoMap({ searchPlaces, selectedPlaceType, onSelectPlace }) {
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const polylineRef = useRef(null);
    const placesServiceRef = useRef(null);
    const selectedPlaceTypeRef = useRef(null);
    const overlaysRef = useRef([]);


    useEffect(() => {
        selectedPlaceTypeRef.current = selectedPlaceType;
    }, [selectedPlaceType]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=169f77e98308a55fbb792d9f31ef9adf&autoload=false&libraries=services";
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    const container = document.getElementById("map");
                    const options = {
                        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                        level: 7,
                    };
                    const map = new window.kakao.maps.Map(container, options);
                    mapRef.current = map;
                    placesServiceRef.current = new window.kakao.maps.services.Places();

                    window.kakao.maps.event.addListener(map, "click", function (mouseEvent) {
                        const latlng = mouseEvent.latLng;

                        const marker = new window.kakao.maps.Marker({
                            map: map,
                            position: latlng,
                        });
                        markersRef.current.push(marker);

                        const geocoder = new window.kakao.maps.services.Geocoder();
                        geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
                            if (status === window.kakao.maps.services.Status.OK) {
                                const address = result[0].address.address_name;
                                const type = selectedPlaceTypeRef.current;

                                onSelectPlace?.(type, {
                                    name: address,
                                    lat: latlng.getLat(),
                                    lng: latlng.getLng(),
                                });
                            }
                        });
                    });
                });
            }
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (!window.kakao || !window.kakao.maps || !mapRef.current || !searchPlaces?.length) return;

        markersRef.current.forEach((m) => m.setMap(null));
        markersRef.current = [];

        overlaysRef.current.forEach((o) => o.setMap(null));  // ✅ 오버레이 제거
        overlaysRef.current = [];


        if (polylineRef.current) polylineRef.current.setMap(null);

        const coordsArray = [];
        let resolved = 0;

        searchPlaces.forEach(({ type, keyword }, idx) => {
            if (!keyword || typeof keyword !== "string" || keyword.trim() === "") {
                resolved++;
                return;
            }

            placesServiceRef.current.keywordSearch(keyword, (data, status) => {
                if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
                    const place = data[0];
                    const pos = new window.kakao.maps.LatLng(place.y, place.x);
                    coordsArray[idx] = pos;

                    const marker = new window.kakao.maps.Marker({
                        map: mapRef.current,
                        position: pos,
                    });
                    markersRef.current.push(marker);

                    // ✅ 정확한 type 전달
                    onSelectPlace?.(type, {
                        name: place.place_name,
                        lat: parseFloat(place.y),
                        lng: parseFloat(place.x),
                    });

                } else {
                    const geocoder = new window.kakao.maps.services.Geocoder();
                    geocoder.addressSearch(keyword, (result, addrStatus) => {
                        if (addrStatus === window.kakao.maps.services.Status.OK && result.length > 0) {
                            const pos = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                            coordsArray[idx] = pos;

                            const marker = new window.kakao.maps.Marker({
                                map: mapRef.current,
                                position: pos,
                            });
                            markersRef.current.push(marker);

                            const address = result[0].address?.address_name || result[0].road_address?.address_name || keyword;

                            // ✅ 정확한 type 전달
                            onSelectPlace?.(type, {
                                name: address,
                                lat: parseFloat(result[0].y),
                                lng: parseFloat(result[0].x),
                            });
                        } else {
                            console.warn("❌ 주소 검색 실패:", keyword, addrStatus);
                        }

                        resolved++;
                        if (resolved === searchPlaces.length) {
                            drawPolyline(coordsArray);
                        }
                    });
                    return;
                }

                resolved++;
                if (resolved === searchPlaces.length) {
                    drawPolyline(coordsArray);
                }
            });
        });

        function drawPolyline(coordsArray) {
            const validCoords = coordsArray.filter(Boolean);
            if (validCoords.length > 0) {
                mapRef.current.setCenter(validCoords[0]);

                // 1. 폴리라인 생성
                if (validCoords.length >= 2) {
                    const polyline = new window.kakao.maps.Polyline({
                        path: validCoords,
                        strokeWeight: 4,
                        strokeColor: "#007bff",
                        strokeOpacity: 0.8,
                        strokeStyle: "solid",
                    });
                    polyline.setMap(mapRef.current);
                    polylineRef.current = polyline;
                }

                // 2. 마커마다 출발/번호/도착 표시 추가
                drawMarkersWithLabels(validCoords);
                fitMapToBounds(validCoords); // ✅ 줌 자동 조정 추가

            }
        }
        // ✅ 마커 위에 라벨 오버레이 추가 함수
        function drawMarkersWithLabels(coords) {
            coords.forEach((pos, idx) => {
                let label = "";
                if (idx === 0) label = "출발";
                else if (idx === coords.length - 1) label = "도착";
                else label = `${idx}`;

                // 커스텀 오버레이 HTML
                const content = `
                    <div style="
                        background: #C0392B;
                        color: white;
                        padding: 4px 8px;
                        border-radius: 12px;
                        font-size: 12px;
                        text-align: center;
                        transform: translate(-50%, -100%);
                        white-space: nowrap;
                        box-shadow: 1px 1px 4px rgba(0,0,0,0.3);
                    ">
                        ${label}
                    </div>
                    `;

                // 오버레이 생성
                const overlay = new window.kakao.maps.CustomOverlay({
                    map: mapRef.current,
                    position: pos,
                    content,
                    yAnchor: 1,
                });
                overlaysRef.current.push(overlay);


                // 선택적으로 마커도 함께 생성 (작은 점처럼)
                const marker = new window.kakao.maps.Marker({
                    map: mapRef.current,
                    position: pos,
                    title: label, // ✅ 마우스 오버 시 보여줄 텍스트
                });
                window.kakao.maps.event.addListener(marker, "click", () => {
                    alert(`${label} 지점 클릭됨`);
                });
                markersRef.current.push(marker);
            });
        }
        function fitMapToBounds(coords) {
            const bounds = new window.kakao.maps.LatLngBounds();
            coords.forEach((pos) => bounds.extend(pos));
            mapRef.current.setBounds(bounds);
        }
    }, [searchPlaces]);

    return (
        <div
            id="map"
            style={{ width: "100%", height: "300px", borderRadius: "10px", overflow: "hidden" }}
        />
    );
}

export default KakaoMap;
