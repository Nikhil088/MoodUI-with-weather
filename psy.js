function setMood(mood) {
  resetMood(); // Clear previous mood

  const moodClass = `mood-${mood}`;
  document.body.classList.add(moodClass);

  const quoteEl = document.getElementById("quote");
  let quoteText = "";

  switch (mood) {
    case "happy":
      quoteText = "Keep smiling. It looks good on you!";
      break;
    case "sad":
      quoteText = "It's okay to feel blue sometimes. You're not alone.";
      break;
    case "anxious":
      quoteText = "Breathe in, breathe out. One step at a time.";
      break;
    case "motivated":
      quoteText = "You’ve got this. Let’s conquer the day!";
      break;
    default:
      quoteText = "How are you feeling today?";
  }

  quoteEl.textContent = quoteText;
}

function resetMood() {
  // Remove all mood classes
  document.body.className = document.body.className
    .split(" ")
    .filter((cls) => !cls.startsWith("mood-"))
    .join(" ");

  // Reset quote
  document.getElementById("quote").textContent = "How are you feeling today?";
}

// Time-based night mode
window.onload = function () {
  const hour = new Date().getHours();
  if (hour >= 20 || hour < 6) {
    document.body.classList.add("night-mode");
    document.getElementById("greeting").textContent =
      "Good Evening, and welcome to MoodUI";
  }
};

const weatherBox = document.getElementById("weather");
const API_KEY = "179a0710558d47369c8205931252304";

function fetchWeather() {
  // Get user's location
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
        );
        const data = await res.json();

        const temp = data.current.temp_c;
        const desc = data.current.condition.text;
        const icon = data.current.condition.icon;
        const city = data.location.name;

        weatherBox.innerHTML = `
        <p>📍 Weather in <strong>${city}</strong></p>
        <p><img src="${icon}" alt="${desc}"> ${desc}, <strong>${temp}°C</strong></p>
      `;
      } catch (err) {
        console.error("Weather fetch failed", err);
        weatherBox.textContent = "Couldn't fetch weather 😔";
      }
    },
    () => {
      weatherBox.textContent = "Location access denied 🚫";
    }
  );
}

fetchWeather();
