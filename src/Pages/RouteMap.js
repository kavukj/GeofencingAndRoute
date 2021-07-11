import React, { useContext, useEffect, useState } from 'react';
import { AssignContext } from '../Context/AssignContext';
import './Route.styles.css'

export const RouteMap = () => {
    const {location} = useContext(AssignContext);
    console.log(location)
    const H = window.H;
    const mapref = React.createRef(null);
    const platform = new H.service.Platform({
        apikey: 'vFPxJJZvb39eL7qxAhNy6wAeuLEPljd3xLdhyulOHrw'
    })
    const defaultLayers = platform.createDefaultLayers();
    const [map,setMap] = useState();

    React.useEffect(() => {
        if (!mapref.current) return;
        const mapOrigin = new H.Map(mapref.current, defaultLayers.vector.normal.map, {
            center: { lat: location.lat, lng: location.lng },
            zoom: 8,
            pixelRatio: window.devicePixelRatio || 1
        });
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(mapOrigin))
        var ui = H.ui.UI.createDefault(mapOrigin, defaultLayers);
        var mapSettings = ui.getControl('mapsettings');
        var zoom = ui.getControl('zoom');
        var scalebar = ui.getControl('scalebar');
        setMap(mapOrigin)
    }, [])

    useEffect(()=>{
        if(map && platform){
            map.setCenter({lat:location.lat,lng:location.lng})
        }
    },[location])

    useEffect(()=>{
        if(map && platform){
            map.addEventListener('tap', function(evt) {
                // Log 'tap' and 'mouse' events:
                console.log(evt.type, evt.currentPointer.type); 
            });
        }
    },[])


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

