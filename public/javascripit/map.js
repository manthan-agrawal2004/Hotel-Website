if(listing.geometry.coordinates.length==0){
    listing.geometry.coordinates.push(75.815025);
    listing.geometry.coordinates.push(26.9217);
}
mapboxgl.accessToken=mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center:listing.geometry.coordinates, 
    zoom: 9 // starting zoom
});
if(listing.geometry.coordinates.length==0){;
}

const marker1 = new mapboxgl.Marker({color:"red"})
        .setLngLat(listing.geometry.coordinates)//listing.geometry.coordinates
        .setPopup(
            new mapboxgl.Popup({offset:25}).setHTML(
                `<h3>${listing.title}</h3><p>Exact Location will be provided after booking</p>`
            )
        )
        .addTo(map);