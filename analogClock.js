const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

let lastSecond = -1; // Keeps track of the last second value

function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // This makes the second hand move smoothly
    const secondsDegrees = ((seconds + milliseconds / 1000) / 60) * 360 + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    // Check if the second hand has reached the 12 o'clock position (i.e., seconds == 0)
    if (seconds !== lastSecond) {
        // Update the minute hand and hour hand only when the second hand hits the top
        const minutes = now.getMinutes();
        const minutesDegrees = ((minutes / 60) * 360) + 90; // No seconds movement here
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

        const hours = now.getHours();
        const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90; // Use minute-based movement for hours
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }

    // Store the current second for the next iteration
    lastSecond = seconds;
}

setInterval(setDate, 16);  // Refreshes every 16ms (~60fps)
setDate();  // Initial call to set the clock immediately


// Code for adding hour and minute markings (unchanged from your previous code)
const clock = document.querySelector(".clock");

// Add hour markings
for (let i = 0; i < 12; i++) {
    const hourMark = document.createElement("div");
    hourMark.classList.add("marking");
    hourMark.style.transform = `rotate(${i * 30}deg) translate(0, -45%)`;
    clock.appendChild(hourMark);
}

// Adjust the hour markings
for (let i = 0; i < 12; i++) {
    const hourMark = document.createElement("div");
    hourMark.classList.add("adjustMarking");
    hourMark.style.transform = `rotate(${i * 30}deg) translate(0, -45%)`;
    clock.appendChild(hourMark);
}

// Add minute markings
for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
        const minuteMark = document.createElement("div");
        minuteMark.classList.add("minute-marking");
        minuteMark.style.transform = `rotate(${i * 6}deg) translate(0, -45%)`;
        clock.appendChild(minuteMark);
    }
}

// Adjust the minute markings
for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
        const minuteMark = document.createElement("div");
        minuteMark.classList.add("adjustMinuteMarking");
        minuteMark.style.transform = `rotate(${i * 6}deg) translate(0, -45%)`;
        clock.appendChild(minuteMark);
    }
}
