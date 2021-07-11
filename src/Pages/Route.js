import React, { useContext } from 'react';
import './Route.styles.css'
import { RouteMap } from './RouteMap';
import { AssignContext } from '../Context/AssignContext';
import { render } from '@testing-library/react';

export const Route = () => {
    const { changeLocation } = useContext(AssignContext);

    const handleChange = (e) => {
        if (e.target.value === 'Location 1') {
            changeLocation({ lat: 28.5555, lng: 71.254865 })
        }
        if (e.target.value === 'Location 2') {
            changeLocation({ lat: 58.5555, lng: 71.254865 })
        }
        if (e.target.value === 'Location 3') {
            changeLocation({ lat: 15.5555, lng: 75.254865 })
        }
        if (e.target.value === 'Location 4') {
            changeLocation({ lat: 20.5555, lng: 76.254865 })
        }
        if (e.target.value === 'Location 5') {
            changeLocation({ lat: 40.5555, lng: 71.254865 })
        }
        if (e.target.value === 'Location 6') {
            changeLocation({ lat: 29.5555, lng: 60.254865 })
        }

    }
    return (
        <div className="root">
            {alert("Development in progress")}
            <div className="dropdown">
                <span className="label">Move to a Location </span>
                <select className="options" onChange={handleChange}>
                    <option value="Location 1">Location 1</option>
                    <option value="Location 2">Location 2</option>
                    <option value="Location 3">Location 3</option>
                    <option value="Location 4">Location 4</option>
                    <option value="Location 5">Location 5</option>
                    <option value="Location 6">Location 6</option>
                </select>
            </div>
            <h6 className="note">(Select Multiple points on marker to create a route)</h6>
            <RouteMap />
        </div>
    )
}

