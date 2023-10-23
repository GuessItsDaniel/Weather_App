'use strict';

import { fetchData } from "./api.js";

/**
 * Add event listener on multiple elements
 * @param {NodeList} elements Elements node array
 * @param {string} eventType Event Type e.g. : "click", "mouseover"
 * @param {function} callback Callback function
 */

const addEventOnElements = function(elements, eventType, callback){
    for (const element of elements) element.addEventListener(eventType,
        callback);
}

/**
 * Toggle search in mobile devices
 */

const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const toggleSearch = () => searchView.classList.toggle("active");
addEventOnElements(searchTogglers, "click", toggleSearch);

/**
 * SEARCH INTEGRATION
 */

const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;
const searchTimeoutDuration = 500;

searchField.addEventListener("input", function (){

    searchTimeout ?? clearTimeout(searchTimeout);

    if (!searchField.value) {
        searchResult.classList.remove("active");
        searchResult.innerHTML = "" ;
        searchField.classList.remove("searching");
    } else {
        searchField.classList.add("searching");
    }

    if (searchField.value) {
        searchTimeout = setTimeout(()=>{
            fetchData(url.geo(searchField.value), function(locations){
                //2:17:16 Real-time Weather App Using Vanilla JavaScript and API
            })
        }, searchTimeoutDuration);
    }
});