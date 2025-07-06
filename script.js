// --- Game Data ---
const destinations = [
    {
        name: "Eiffel Tower",
        clue: "I stand tall and iron-clad, a beacon of romance, often lit up at night. Though some called me an eyesore, I'm now a symbol of French grandeur. Where am I?",
        answer: "Paris",
        image: "images/eiffel-tower.jpg" // Make sure to create an 'images' folder!
    },
    {
        name: "Grand Canyon",
        clue: "A silent sculptor, wind and river's might, carved me deep through ages, day and night. My hues shift with the sun, from red to gold. Where am I?",
        answer: "Arizona", // Or "Taj Mahal" or "India" - choose your preferred answer
        image: "images/grand-canyon.jpg"
    },
    {
        name: "Taj lake palace",
        clue: "On waters I serenely rest, a palace afloat. Of marble pure, my grandeur softly gleams, A royal dream, born of ancient kings' schemes. Where am I?",
        answer: "Udaipur", // Or "Taj Mahal" or "India" - choose your preferred answer
        image: "images/taj-lake-palace.jpg"
    },
    // {
    //     name: "Taj Mahal",
    //     clue: "Built for love, a marble dream, I shimmer white under the sun's gleam. My symmetry is flawless, my gardens serene, a jewel on the Yamuna's scene. Where am I?",
    //     answer: "Agra", // Or "Taj Mahal" or "India" - choose your preferred answer
    //     image: "images/taj-mahal.jpg"
    // },
    // {
    //     name: "Great Barrier Reef",
    //     clue: "Beneath the waves, a vibrant world I hide, with coral cities where colorful fish glide. I'm Earth's largest living structure, vast and deep. A natural wonder the ocean likes to keep. Where am I?",
    //     answer: "Australia", // Or "Great Barrier Reef"
    //     image: "images/great-barrier-reef.jpg"
    // },
    // {
    //     name: "Machu Picchu",
    //     clue: "High in the Andes, a lost city I reside, whispering tales of an ancient Inca tide. Clouds often kiss my stone-built terraces grand. A wonder unearthed in a mountain-filled land. Where am I?",
    //     answer: "Peru", // Or "Machu Picchu"
    //     image: "images/machu-picchu.jpg"
    // }
    // Add more destinations here!
    // Remember the last destination will lead to the birthday message.
];

const birthdayData = {
    image: "images/birthday.jpg", // A birthday cake, party scene, or personal photo!
    heading: "Happy Birthday Bhai!",
    message: "Just like this mini-adventure, keep travelling around the world, explore new places and live life to the fullest. Let the journey ahead be filled with more joy and peace. Happy Birthday, [Birthday Person's Name]!",
    // wishTestPrompt: "To unlock your special wish, fill in the blank:",
    // wishTestSentence: "May your year be filled with **______**, joy, and adventure!",
    // correctWishWord: "wonder", // The word they need to type in
    // finalWishMessage: "Absolutely! May your year truly be filled with **WONDER**, joy, and adventure. You deserve all the happiness in the world! Wishing you the happiest of birthdays! ❤️"
};

let currentDestinationIndex = 0;
let birthdayPersonsName = "[Birthday Person's Name]"; // <-- IMPORTANT: Customize this!

// --- Get DOM Elements ---
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const gameScreen = document.getElementById('game-screen');
const locationImage = document.getElementById('location-image');
const hintText = document.getElementById('hint-text');
const userGuessInput = document.getElementById('user-guess');
const submitGuessButton = document.getElementById('submit-guess');
const feedbackMessage = document.getElementById('feedback-message');
const currentLocationName = document.getElementById('current-location-name'); // For showing name after correct guess

const birthdayScreen = document.getElementById('birthday-screen');
const birthdayImage = document.getElementById('birthday-image');
const birthdayHeading = document.getElementById('birthday-heading');
const birthdayMessage = document.getElementById('birthday-message');
// const wishTestDiv = document.getElementById('wish-test');
// const wishInput = document.getElementById('wish-input');
// const revealWishButton = document.getElementById('reveal-wish-button');
// const finalWishMessage = document.getElementById('final-wish-message');

// --- Game Functions ---

function startGame() {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    currentDestinationIndex = 0;
    displayCurrentDestination();
}

function displayCurrentDestination() {
    if (currentDestinationIndex < destinations.length) {
        const currentDest = destinations[currentDestinationIndex];
        locationImage.src = currentDest.image;
        hintText.textContent = currentDest.clue;
        userGuessInput.value = ''; // Clear previous input
        feedbackMessage.textContent = ''; // Clear feedback
        currentLocationName.textContent = ''; // Clear name if previously shown
        userGuessInput.focus(); // Focus on the input field
    } else {
        // All destinations completed, show birthday screen
        showBirthdayScreen();
    }
}

function checkGuess() {
    const userGuess = userGuessInput.value.trim().toLowerCase();
    const correctAnswers = Array.isArray(destinations[currentDestinationIndex].answer)
        ? destinations[currentDestinationIndex].answer.map(ans => ans.toLowerCase())
        : [destinations[currentDestinationIndex].answer.toLowerCase()];

    if (correctAnswers.includes(userGuess)) {
        feedbackMessage.textContent = "Correct! Well done, my boy!";
        feedbackMessage.classList.remove('incorrect');
        feedbackMessage.classList.add('correct');
        currentLocationName.textContent = `You found the ${destinations[currentDestinationIndex].name}!`;
        // Delay before moving to the next
        setTimeout(() => {
            currentDestinationIndex++;
            displayCurrentDestination();
        }, 1500); // Wait 1.5 seconds before moving on
    } else {
        feedbackMessage.textContent = "Oops! That's not right son. Try again!";
        feedbackMessage.classList.remove('correct');
        feedbackMessage.classList.add('incorrect');
    }
}

function showBirthdayScreen() {
    gameScreen.classList.add('hidden');
    birthdayScreen.classList.remove('hidden');

    birthdayImage.src = birthdayData.image;
    birthdayHeading.textContent = birthdayData.heading;
    // Replace placeholder with actual name
    birthdayMessage.innerHTML = birthdayData.message.replace("[Birthday Person's Name]", "Kartikaya");

        // --- ADD CONFETTI HERE ---
    // Trigger a basic confetti burst
    confetti({
        particleCount: 100, // Number of confetti particles
        spread: 70,         // How wide the confetti spreads
        origin: { y: 0.6 } // Where the confetti originates from (bottom middle)
    });

    // You can also add a second, slightly delayed burst for a fuller effect
    setTimeout(() => {
        confetti({
            particleCount: 80,
            spread: 80,
            origin: { y: 0.5 }
        });
    }, 500); // 0.5 seconds later

    // Show the wish test section
    // wishTestDiv.classList.remove('hidden');
    // wishTestDiv.querySelector('p:first-child').textContent = birthdayData.wishTestPrompt;
    // wishTestDiv.querySelector('p:nth-child(2)').innerHTML = birthdayData.wishTestSentence;
    // wishInput.value = ''; // Clear previous input
    // finalWishMessage.classList.add('hidden'); // Hide final wish message initially
}

// function revealWish() {
//     const userWishWord = wishInput.value.trim().toLowerCase();
//     if (userWishWord === birthdayData.correctWishWord.toLowerCase()) {
//         finalWishMessage.textContent = birthdayData.finalWishMessage;
//         finalWishMessage.classList.remove('hidden');
//         revealWishButton.classList.add('hidden'); // Hide the button after revealing
//         wishInput.disabled = true; // Disable input
//     } else {
//         finalWishMessage.textContent = "Hmm, that's not the word I was thinking of. Try again!";
//         finalWishMessage.classList.remove('hidden');
//         finalWishMessage.style.color = '#dc3545'; // Red for incorrect
//     }
// }

// --- Event Listeners ---
startButton.addEventListener('click', startGame);
submitGuessButton.addEventListener('click', checkGuess);
userGuessInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// revealWishButton.addEventListener('click', revealWish);
// wishInput.addEventListener('keypress', (event) => {
//     if (event.key === 'Enter') {
//         revealWish();
//     }
// });

// Initial setup on page load (optional, you could just leave the start screen visible)
// displayCurrentDestination(); // This would bypass the start screen if uncommented