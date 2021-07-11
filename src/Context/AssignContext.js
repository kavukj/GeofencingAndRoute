import React, { useState, createContext } from 'react';

/*const initialContext = {
    val:null,
    setVlaue: () => { }
}

This our actual context which will be used in other files
export const AssignContext = createContext(initialContext);

This contains two components, provder to set the values and consumer to enable use of those values.
const {Provider, Consumer } = AssignContext;

const ContextProvider = ({children}) => {
    const [value,setVlaue]=({
        val:null,
    })

    const setVal = () => {
        setVlaue({
            ...value,
            val:null
        })
    }

    return(
        <Provider value={{
            ...value,
            setVlaue
        }}
        >
        This children refers to our whole application which we wrap in App.js files
         and wrapping it here inside provider will allow those children to use values in provider.
            {children}
        </Provider>
    )
}

export const ContextConsumer =  Consumer;
export default AssignContext*/

export const AssignContext = createContext({
    location:"Terminal1",
    route:null,
    changeLocation: () => {},
    changeRoute: () => {}
})

const {Provider, Consumer} = AssignContext

const ContextProvider = ({children}) => {
    const [location, setLocation] = useState({lat:28.5555,lng:71.254865});
    const [route,setRoute] = useState(null);
    const changeLocation = (loc) => {
        setLocation(loc)
    }
    const changeRoute = (routeGeofence) => {
        setRoute(routeGeofence)
    }
    return(
        <Provider value={{
            location,
            route,
            changeLocation,
            changeRoute
        }}>
            {children}
        </Provider>
    )
}

export const ContextConsumer = Consumer;


export default ContextProvider;