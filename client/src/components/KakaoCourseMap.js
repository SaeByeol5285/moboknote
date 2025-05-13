import React, { useEffect, useRef } from "react";

function KakaoCourseMap({ courseList }) {
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const polylineRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=169f77e98308a55fbb792d9f31ef9adf&autoload=false";
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    const container = document.getElementById("course-map");
                    const map = new window.kakao.maps.Map(container, {
                        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                        level: 7,
                    });
                    mapRef.current = map;

                    if (courseList?.length) drawCourse(courseList);
                });
            }
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);
    useEffect(() => {
        if (window.kakao?.maps && mapRef.current && courseList?.length) {
            drawCourse(courseList);
        }
    }, [courseList]);

    const drawCourse = (points) => {
        if (!mapRef.current || points.length === 0) return;

        if (polylineRef.current) polylineRef.current.setMap(null);
        markersRef.current.forEach((m) => m.setMap(null));
        markersRef.current = [];

        const coords = points.map(p =>
            new window.kakao.maps.LatLng(parseFloat(p.latitude), parseFloat(p.longitude))
        );

        drawPolyline(coords);
        drawMarkersWithLabels(coords);
        fitMapToBounds(coords);
    };

    const drawPolyline = (coords) => {
        if (coords.length >= 2) {
            const polyline = new window.kakao.maps.Polyline({
                path: coords,
                strokeWeight: 4,
                strokeOpacity: 0.9,
                strokeStyle: "solid",
                strokeColor: "#007BFF",
            });
            polyline.setMap(mapRef.current);
            polylineRef.current = polyline;
        }
    };

    const drawMarkersWithLabels = (coords) => {
        coords.forEach((pos, idx) => {
            let label = "";
            if (idx === 0) label = "출발";
            else if (idx === coords.length - 1) label = "도착";
            else label = `${idx}`;

            const content = `
                <div style="
                    background: ${label === "출발" ? "#2E8B57" : label === "도착" ? "#C0392B" : "#34495E"};
                    color: white;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                    transform: translate(-50%, -100%);
                    white-space: nowrap;
                    box-shadow: 1px 1px 4px rgba(0,0,0,0.3);
                ">
                    ${label}
                </div>`;

            new window.kakao.maps.CustomOverlay({
                map: mapRef.current,
                position: pos,
                content,
                yAnchor: 1,
            });

            const marker = new window.kakao.maps.Marker({
                map: mapRef.current,
                position: pos,
            });
            markersRef.current.push(marker);
        });
    };

    const fitMapToBounds = (coords) => {
        const bounds = new window.kakao.maps.LatLngBounds();
        coords.forEach((pos) => bounds.extend(pos));
        mapRef.current.setBounds(bounds);
    };

    return (
        <div
            id="course-map"
            style={{ width: "100%", height: "100%", borderRadius: "10px", overflow: "hidden" }}
        />
    );
}

export default KakaoCourseMap;
