const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

let lastSecond = -1; // Tracks the last second value
let isPausing = false; // Controls the pause behavior

// Wiggle effect function
const wiggleEffect = (element, baseDegrees) => {
    const wiggleFrames = [
        { transform: `rotate(${baseDegrees}deg)` },
        { transform: `rotate(${baseDegrees - 2}deg)` },
        { transform: `rotate(${baseDegrees + 2}deg)` },
        { transform: `rotate(${baseDegrees}deg)` }
    ];

    const wiggleTiming = {
        duration: 300, // 300ms for wiggle effect
        iterations: 1, // Only wiggle once
    };

    element.animate(wiggleFrames, wiggleTiming);
};

function initializeClock() {
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // Set the initial positions for the minute and hour hands
    const initialMinuteDegrees = (minutes / 60) * 360 + 90;
    const initialHourDegrees = (hours / 12) * 360 + ((minutes / 60) * 30) + 90;

    minuteHand.style.transform = `rotate(${initialMinuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${initialHourDegrees}deg)`;
}

function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // Calculate the total elapsed time (faster than real-time: 58 seconds)
    const elapsed = (seconds + milliseconds / 1000);
    const adjustedElapsed = (elapsed / 58) * 60; // Adjust for faster movement

    if (isPausing) {
        secondHand.style.transform = `rotate(90deg)`; // Pause at the top
        return; // Stop updating during the pause
    }

    // Remove transition when updating dynamically for the second hand
    secondHand.style.transition = "none";

    // Move the second hand dynamically
    const secondsDegrees = (adjustedElapsed / 60) * 360 + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    // When the second hand reaches the top
    if (elapsed >= 58 && lastSecond < 58) {
        isPausing = true;

        // Move the minute and hour hands at the top
        const minutesDegrees = ((minutes + 1) / 60) * 360 + 90; // +1 for the new minute
        const hoursDegrees = ((hours / 12) * 360) + (((minutes + 1) / 60) * 30) + 90;

        setTimeout(() => {
            // Update minute and hour hands after pause
            minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
            hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

            // Trigger the wiggle effect for both hands
            wiggleEffect(minuteHand, minutesDegrees);
            wiggleEffect(hourHand, hoursDegrees);

            isPausing = false; // Resume after the pause
        }, (60 - elapsed) * 1000); // Pause for the remaining time of the minute
    }

    lastSecond = elapsed; // Update the last second value
}

// Initialize clock hands
initializeClock();
setInterval(setDate, 16); // Refresh every 16ms (~60fps)
setDate(); // Initial call to set the clock immediately

// Add hour and minute markings (unchanged from your code)
const clock = document.querySelector('.clock');

// Add hour markings
for (let i = 0; i < 12; i++) {
    const hourMark = document.createElement('div');
    hourMark.classList.add('marking');
    hourMark.style.transform = `rotate(${i * 30}deg) translate(0, -45%)`;
    clock.appendChild(hourMark);
}

// Adjust the hour markings
for (let i = 0; i < 12; i++) {
    const hourMark = document.createElement('div');
    hourMark.classList.add('adjustMarking');
    hourMark.style.transform = `rotate(${i * 30}deg) translate(0, -45%)`;
    clock.appendChild(hourMark);
}

// Add minute markings
for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
        const minuteMark = document.createElement('div');
        minuteMark.classList.add('minute-marking');
        minuteMark.style.transform = `rotate(${i * 6}deg) translate(0, -45%)`;
        clock.appendChild(minuteMark);
    }
}

// Adjust the minute markings
for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
        const minuteMark = document.createElement('div');
        minuteMark.classList.add('adjustMinuteMarking');
        minuteMark.style.transform = `rotate(${i * 6}deg) translate(0, -45%)`;
        clock.appendChild(minuteMark);
    }
}
