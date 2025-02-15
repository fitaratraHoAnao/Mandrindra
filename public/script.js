async function fetchAPI(endpoint) {
    const response = await fetch(endpoint);
    const data = await response.json();
    document.getElementById('response').innerText = JSON.stringify(data, null, 2);
}
