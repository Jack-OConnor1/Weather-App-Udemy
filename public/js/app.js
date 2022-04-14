const weather_form = document.querySelector("form");
const search = document.querySelector("input");
const message_1 = document.querySelector("#message-1");
const message_2 = document.querySelector("#message-2");

message_1.textContent = "This text, loading message and weather info are set using javascript.";

weather_form.addEventListener("submit", (e) => {
    e.preventDefault();

    message_1.textContent = "Loading...";
    message_2.textContent = "";

    fetch(`http://localhost:3000/weather?address=${search.value}`)
    .then((response) => {
        return response.json();
    })
    .then((weather_data) => {
        if (weather_data.error) {
            message_1.textContent = weather_data.error;
        } else {
            message_1.textContent = weather_data.location;
            message_2.textContent = weather_data.description;
        }
        
    })
});