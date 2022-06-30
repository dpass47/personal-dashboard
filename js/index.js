const authorText = document.querySelector(".author-text");

function getCurrentTime() {
	const date = new Date();
	document.querySelector(".time").textContent = date.toLocaleTimeString(
		"en-us",
		{
			timeStyle: "short",
		}
	);
}

setInterval(getCurrentTime, 1000);

fetch(
	"https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
	.then((res) => res.json())
	.then((data) => {
		document.body.style.backgroundImage = `url(${data.urls.full})`;
		authorText.textContent = `By: ${data.user.name}`;
	})
	.catch((err) => {
		console.log(err);
		document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1446034295857-c39f8844fad4?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTUxODQxNDE&ixlib=rb-1.2.1&q=80)`;
		authorText.textContent = `By: Vadim Sherbakov`;
	});

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
	.then((res) => {
		if (!res.ok) {
			throw Error("Something went wrong");
		}
		return res.json();
	})
	.then((data) => {
		document.querySelector(
			".crypto"
		).innerHTML = `<img src="${data.image.small}">
                    <p>${data.localization.en}</p>
                    <p>🎯: $${data.market_data.current_price.usd}</p>
                    <p>👆 : $${data.market_data.high_24h.usd}</p>
                    <p>👇: $${data.market_data.low_24h.usd}</p>`;
	})
	.catch((err) => console.log(err));

navigator.geolocation.getCurrentPosition((position) => {
	fetch(
		`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${[
			position.coords.latitude,
		]}&lon=${position.coords.longitude}&units=imperial`
	)
		.then((res) => {
			if (!res.ok) {
				throw Error("Weather data not available");
			}
			return res.json();
		})
		.then((data) => {
			document.querySelector(
				".weather"
			).innerHTML = `<img src=http://openweathermap.org/img/wn/${
				data.weather[0].icon
			}@2x.png>
										<p class="weather-temp">${Math.round(data.main.temp)}°F</p>
										<p class="weather-city">${data.name}</p>`;
		})
		.catch((err) => console.error(err));
});

fetch("https://api.goprogram.ai/inspiration")
	.then((res) => {
		if (!res.ok) {
			throw Error("Can't get quote");
		}
		return res.json();
	})
	.then((data) => {
		document.querySelector(
			".quote"
		).textContent = `"${data.quote}" - ${data.author}`;
	});
