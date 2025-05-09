import React, { useEffect, useRef } from "react";

function KakaoMap({ searchPlaces, selectedPlaceType, onSelectPlace }) {
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const polylineRef = useRef(null);
    const placesServiceRef = useRef(null);
    const selectedPlaceTypeRef = useRef(null);

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

        if (polylineRef.current) polylineRef.current.setMap(null);

        const coordsArray = [];
        let resolved = 0;

        searchPlaces.forEach((keyword, idx) => {
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

                    const type = selectedPlaceTypeRef.current;
                    onSelectPlace?.(type, {
                        name: place.place_name,
                        lat: parseFloat(place.y),
                        lng: parseFloat(place.x),
                    });
                } else {
                    const geocoder = new window.kakao.maps.services.Geocoder();
                    geocoder.addressSearch(keyword, (result, addrStatus) => {
                        console.log("📍 keyword:", keyword);
                        console.log("📦 result:", result);
                        console.log("📋 addrStatus:", addrStatus);
                    
                        if (addrStatus === window.kakao.maps.services.Status.OK && result.length > 0) {
                            console.log("✅ 주소 변환 성공", result[0]);
                    
                            const pos = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                            coordsArray[idx] = pos;
                    
                            const marker = new window.kakao.maps.Marker({
                                map: mapRef.current,
                                position: pos,
                            });
                            markersRef.current.push(marker);
                    
                            const type = selectedPlaceTypeRef.current;
                            const address = result[0].address?.address_name || result[0].road_address?.address_name || keyword;
                    
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
            }
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
