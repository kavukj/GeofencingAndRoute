import React, { useContext, useEffect, useState } from 'react';
import { AssignContext } from '../Context/AssignContext';
import './Route.styles.css'

export const RouteMap = () => {
    const { location , route , changeRoute } = useContext(AssignContext);
    const H = window.H;
    const mapref = React.createRef(null);
    const platform = new H.service.Platform({
        apikey: 'vFPxJJZvb39eL7qxAhNy6wAeuLEPljd3xLdhyulOHrw'
    })
    const defaultLayers = platform.createDefaultLayers();
    const [map, setMap] = useState();
    const [group, setGroup] = useState();
    var linestring = new H.geo.LineString();

    React.useEffect(() => {
        if (!mapref.current) return;
        const mapOrigin = new H.Map(mapref.current, defaultLayers.vector.normal.map, {
            center: { lat: location.lat, lng: location.lng },
            zoom: 8,
            pixelRatio: window.devicePixelRatio || 1
        });

        var ui = H.ui.UI.createDefault(mapOrigin, defaultLayers);
        setMap(mapOrigin)
    }, [])

    useEffect(() => {
        if (map && platform) {
            map.setCenter({ lat: location.lat, lng: location.lng })
        }
    }, [location])

    useEffect(() => {
        if (map && platform) {
            var markerGroup = new H.map.Group()
            map.addObject(markerGroup)
            var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
            map.addEventListener('tap', function (evt) {
                var coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY)
            
                var marker = new H.map.Marker({ lat: coord.lat, lng: coord.lng })
                markerGroup.addObject(marker)
                linestring.pushPoint({
                    lat: coord.lat,
                    lng: coord.lng
                })
            });
            map.addEventListener('dbltap', function (evt) {
                var polyline = new H.map.Polyline(linestring, {
                    style: {
                        lineWidth: 4
                    }
                })
                markerGroup.removeObjects(markerGroup.getObjects())
                map.addObject(polyline)

                var svgCircle = '<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                    '<circle cx="10" cy="10" r="7" fill="transparent" stroke="red" stroke-width="4"/>' +
                    '</svg>'
                var verticeGroup = new H.map.Group({
                    visibility: false
                }),
                    mainGroup = new H.map.Group({
                        volatility: true, // mark the group as volatile for smooth dragging of all it's objects
                        objects: [polyline, verticeGroup]
                    }),
                    polylineTimeout;

                // ensure that the polyline can receive drag events
                polyline.draggable = true;

                // create markers for each polyline's vertice which will be used for dragging
                polyline.getGeometry().eachLatLngAlt(function (lat, lng, alt, index) {
                    var vertice = new H.map.Marker(
                        { lat, lng },
                        {
                            icon: new H.map.Icon(svgCircle, { anchor: { x: 10, y: 10 } })
                        }
                    );
                    vertice.draggable = true;
                    vertice.setData({ 'verticeIndex': index })
                    verticeGroup.addObject(vertice);
                });

                // add group with polyline and it's vertices (markers) on the map
                map.addObject(mainGroup);

                // event listener for main group to show markers if moved in with mouse (or touched on touch devices)
                mainGroup.addEventListener('pointerenter', function (evt) {
                    if (polylineTimeout) {
                        clearTimeout(polylineTimeout);
                        polylineTimeout = null;
                    }

                    // show vertice markers
                    verticeGroup.setVisibility(true);
                }, true);

                // event listener for main group to hide vertice markers if moved out with mouse (or released finger on touch devices)
                // the vertice markers are hidden on touch devices after specific timeout
                mainGroup.addEventListener('pointerleave', function (evt) {
                    var timeout = (evt.currentPointer.type == 'touch') ? 1000 : 0;

                    // hide vertice markers
                    polylineTimeout = setTimeout(function () {
                        verticeGroup.setVisibility(false);
                    }, timeout);
                }, true);

                // event listener for vertice markers group to change the cursor to pointer if mouse position enters this group
                verticeGroup.addEventListener('pointerenter', function (evt) {
                    document.body.style.cursor = 'pointer';
                }, true);

                // event listener for vertice markers group to change the cursor to default if mouse leaves this group
                verticeGroup.addEventListener('pointerleave', function (evt) {
                    document.body.style.cursor = 'default';
                }, true);

                // event listener for vertice markers group to resize the geo polyline object if dragging over markers
                verticeGroup.addEventListener('drag', function (evt) {
                    var pointer = evt.currentPointer,
                        geoLineString = polyline.getGeometry(),
                        geoPoint = map.screenToGeo(pointer.viewportX, pointer.viewportY);

                    // set new position for vertice marker
                    evt.target.setGeometry(geoPoint);

                    // set new position for polyline's vertice
                    geoLineString.removePoint(evt.target.getData()['verticeIndex']);
                    geoLineString.insertPoint(evt.target.getData()['verticeIndex'], geoPoint);
                    polyline.setGeometry(geoLineString);

                    // stop propagating the drag event, so the map doesn't move
                    evt.stopPropagation();
                }, true);
                changeRoute(polyline)
                uploadRoute()
            })
        }
    }, [map])

    const uploadRoute = () => {
        if(route){

        }
    }


    return (
        <div className="map"
            ref={mapref}
            style={{
                width: "100%",
                height: "72vh",
                position: "relative",

            }}>
        </div>
    )
}

