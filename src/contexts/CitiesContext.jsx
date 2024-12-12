/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer, useState } from "react"

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:9000';

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
}

function reducer(state, action) {
  switch(action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true
      };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload
      };
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload
      }
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload]
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload)
      };
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.paload
      }
    default:
      throw new Error('unknown action type')
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});


  const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState)

  async function fetchCities() {
    dispatch({type: 'loading'})

    try {
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      dispatch({type: 'cities/loaded', payload: data})
    } catch (error) {
      dispatch({type: 'rejected', payload: 'There was an error fetching data'})
      console.log("error", error)
    }
  }

  async function getCity(id) {
    dispatch({type: 'loading'})

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({type: 'city/loaded', payload: data})
    } catch (error) {
      dispatch({type: 'rejected', payload: 'There was an error fetching data'})
      console.log("error", error)
    }
  }

  async function createCity(newCity) {
    dispatch({type: 'loading'})

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      dispatch({type: 'city/created', payload: data})
    } catch (error) {
      dispatch({type: 'rejected', payload: 'There was an error creating data'})
      console.log("error", error)
    }
  }

  async function deleteCity(id) {
    dispatch({type: 'loading'})

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await res.json();
      dispatch({type: 'city/deleted', payload: id})
    } catch (error) {
      dispatch({type: 'rejected', payload: 'There was an error deleting data'})
      console.log("error", error)
    }
  }

  useEffect(function() {
    fetchCities()
  }, [])

  return (
    <CitiesContext.Provider value={{
      cities,
      isLoading,
      currentCity,
      getCity,
      createCity,
      deleteCity
    }}>
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("CitiesContext was used outside of the CitiesProvider")
  return context;
}

export { CitiesProvider, useCities }
