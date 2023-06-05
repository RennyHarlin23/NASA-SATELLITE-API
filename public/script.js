if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
        try {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const timestamp = Date.now();

            const options = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify({ lat, lon, timestamp }),
            }

            const post_data = await fetch('/', options);
            console.log(post_data);
            const response = await post_data.json();
            document.querySelector('img').src = response;
            console.log(response);
        }
        catch (err) {
            console.log(err);
            document.querySelector('h1').textContent = "error";
        }
    })
} else {
    console.log("location does not exist")
}

