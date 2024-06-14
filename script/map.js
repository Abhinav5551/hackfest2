maptilersdk.config.apiKey = 'xThl9JAL6vdHLCgZdk5v';
const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: [85.300140, 27.700769],
    zoom: 14 
});

map.on('click', (e) => {
    console.log(e)
    const description = `<form id="submissionForm" style="width:600px;">
                            <div>
                              <p>Longitude:</p>
                              <input id="longitude" value="${e.lngLat.lng}" name="longitude"/>
                            </div>

                            <div>
                              <p>Latitude:</p>
                              <input id="latitude" value="${e.lngLat.lat}" name="latitude" />
                            </div>

                            <div>
                              <p>Description:</p>
                              <textarea id="description" placeholder="Description" rows="5" cols="50" name="description"></textarea>
                            </div>
                            <div>
                              <p>Upload a File:</p>
                              <input id="file_path" type="file" name="file">
                            </div>
                            <button type="button" onclick="submitForm()">Submit</button>
                        </form>`;
    new maptilersdk.Popup()
        .setLngLat(e.lngLat)
        .setHTML(description)
        .addTo(map);
});

function submitForm() {
    const longitude = document.getElementById("longitude").value;
    const latitude = document.getElementById("latitude").value;
    const description = document.getElementById("description").value;
    
    // Here you can perform any additional processing, such as sending the data to a server or saving it locally.

    // For demonstration, let's just show an alert indicating successful submission.
    alert("Submission successful!");
}
