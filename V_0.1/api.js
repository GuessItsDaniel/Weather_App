'use strict';

const apiKey ="61347040a749344a97dc531e11ab32fc";

/**
 * Fetch data from server
 * @param {string} URL API url
 * @param {function} callback callback?
 */


export const fetchData = function(URL, callback) {
    fetch(`${URL}&appid={api_key}`)
    .then(res => res.json())
    .then(data => callback(data));
 }

 export const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`
    },
    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`
    },
 

 reversGeo(lat, lon) {
    return `http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`
 },

 /**
 * @param {string} query Search query e.g.: "London" or "Singapore"
 **/
 geo(query) {
    return `https://api.openweathermap.org/data/geo/1.0/direct?q=${query}&limit=5`
 }
}