'use strict';

const api = "OnObdX5SThnmThQpQ8u4EgaLmdzHmMiYsf6W99eP";
const searchURL = "https://developer.nps.gov/api/v1/parks?";

//function to format query parameters
function formatQueryParams(params) {
    const items = Object.keys(params).map(key => `${encodeURIComponent(key)}=
    ${encodeURIComponent(params[key])}`)
    return items.join('&');
}

//function to get list of parks
function getParks(state, quantity) {
    const params = {
        stateCode: state,
        limit: quantity        
    };
    
    const queryString = formatQueryParams(params)
    const url = searchURL + queryString + "&api_key=" + api;

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => alert("Something went wrong"));
}

//function to make the Find Parks button work
function searchButton() {
    $("form").submit(function(event) {
        event.preventDefault();
        let state = $("#state").val();
        let quantity = $("#quantity").val();
        getParks(state, quantity);
    })
}

//function to display results
function displayResults(responseJson) {
    $(".results").empty();
    for (let i=0; i<responseJson.data.length; i++) {
        $(".results").append(`<li><h1>${responseJson.data[i].fullName}</h1></li>
                              <li><p>Description:</p>${responseJson.data[i].description}</li>
                              <li><p>Visit website: <a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a></p>
                              <li><p>Physical Address:</p></li>
                              <li>${responseJson.data[i].addresses[0].line1}</li>
                              <li>${responseJson.data[i].addresses[0].line2}</li>
                              <li>${responseJson.data[i].addresses[0].line3}</li>
                              <li>${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</li>`);
    };
}

searchButton();