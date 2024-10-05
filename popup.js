// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

// Function to get yesterday's date in YYYY-MM-DD format
function getYesterdayDate() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return yesterday.toISOString().slice(0, 10);
}

// Function to get tomorrow's date in YYYY-MM-DD format
function getTomorrowDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}

// Function to get a random time between 5:00 PM and 9:00 PM
function getRandomEveningTime() {
  const today = new Date();
  const randomHour = Math.floor(Math.random() * (21 - 17 + 1)) + 17; // Generates a random hour between 17 (5 PM) and 21 (9 PM)
  const randomMinute = Math.floor(Math.random() * 60); // Random minute between 0 and 59

  today.setHours(randomHour, randomMinute, 0, 0);
  return today;
}

// Function to format date into YYYY-MM-DD format
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to format time into 12-hour format with AM/PM
function format12HourTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

// Function to get a random amount in multiples of 10 between 10 and 200
function getRandomAmount() {
  const amounts = [];
  for (let i = 10; i <= 200; i += 10) {
    amounts.push(i);
  }
  const randomIndex = Math.floor(Math.random() * amounts.length);
  return amounts[randomIndex];
}

// Function to get random number of codes
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get today's data and times from localStorage or generate new ones
function getTodayData() {
  const today = getTodayDate();
  let storedData = JSON.parse(localStorage.getItem('dailyData'));

  // If stored data is available for today, use it
  if (storedData && storedData.date === today) {
    return storedData;
  }

  // If no data is found or it's a new day, generate new data
  const lastUpdateTime = getRandomEveningTime(); // Generate a random time between 5 PM and 9 PM for today's codes
  const nextUpdateTime = getRandomEveningTime(); // Generate random time between 5 PM and 9 PM for tomorrow's codes
  const codesToBeAdded = getRandomNumber(5, 20); // Random number of codes to be added
  const totalAmount = getRandomAmount(); // Random amount in multiples of 10 between 10 and 200

  const newData = {
    date: today,
    lastUpdate: lastUpdateTime,
    nextUpdate: nextUpdateTime,
    codesToBeAdded: codesToBeAdded,
    totalAmount: totalAmount
  };

  // Store the new data in localStorage
  localStorage.setItem('dailyData', JSON.stringify(newData));
  return newData;
}

// Function to update the add dates after the timer ends
function updateAddDates() {
  const today = getTodayDate();
  const tomorrow = getTomorrowDate();
  const nextUpdateTime = getRandomEveningTime();

  const newData = {
    date: today,
    lastUpdate: new Date(), // Update the last update to today
    nextUpdate: nextUpdateTime,  // Set the next update for tomorrow
    codesToBeAdded: getRandomNumber(5, 20), // New random codes for the next day
    totalAmount: getRandomAmount() // New random amount for the next giveaway
  };

  localStorage.setItem('dailyData', JSON.stringify(newData));

  // Update the UI with the new data
  const lastUpdateContainer = document.getElementById('lastUpdate');
  lastUpdateContainer.textContent = `Last codes added at: ${format12HourTime(newData.lastUpdate)}`;

  const datesContainer = document.getElementById('datesContainer');
  datesContainer.textContent = `Last add date: ${today} | Next add date: ${tomorrow}`;

  const nextUpdateTimeContainer = document.getElementById('nextUpdateTime');
  nextUpdateTimeContainer.textContent = `Next codes will be available at: ${format12HourTime(newData.nextUpdate)}`;
}

// Display the last update time, countdown to the next update, and giveaway details
document.addEventListener('DOMContentLoaded', function () {
  const todayData = getTodayData();

  const lastUpdateTime = new Date(todayData.lastUpdate);
  const nextUpdateTime = new Date(todayData.nextUpdate);

  // Show the last update time in 12-hour format
  const lastUpdateContainer = document.getElementById('lastUpdate');
  lastUpdateContainer.textContent = `Last codes added at: ${format12HourTime(lastUpdateTime)}`;

  // Show the exact time for the next update
  const nextUpdateTimeContainer = document.getElementById('nextUpdateTime');
  nextUpdateTimeContainer.textContent = `Next codes will be available at: ${format12HourTime(nextUpdateTime)}`;

  // Show the last and next update dates (Before timer ends: last date is yesterday, next date is today)
  const datesContainer = document.getElementById('datesContainer');
  const lastAddDate = getYesterdayDate(); // Last add date is yesterday
  const nextAddDate = getTodayDate(); // Next add date is today
  datesContainer.textContent = `Last add date: ${lastAddDate} | Next add date: ${nextAddDate}`;

  // Show the countdown timer for the next update
  const nextUpdateContainer = document.getElementById('nextUpdate');
  const countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = nextUpdateTime - now;

    if (timeRemaining > 0) {
      const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      nextUpdateContainer.textContent = `Next giveaway in: ${hours}h ${minutes}m ${seconds}s`;
    } else {
      clearInterval(countdownInterval);
      // After the timer ends, update the last and next add dates
      nextUpdateContainer.textContent = "New codes are now available! Visit www.freegiftzone.com to get them.";
      updateAddDates(); // Update the add dates and reset the countdown for tomorrow
    }
  }, 1000);

  // Show the number of codes and amount in the next giveaway
  const giveawayDetailsContainer = document.getElementById('giveawayDetails');
  giveawayDetailsContainer.textContent = `In the next giveaway: ${todayData.codesToBeAdded} codes worth ₹${todayData.totalAmount}`;

  // Display a message for users to visit the website as plain text (not a link)
  const visitMessage = document.getElementById('visitMessage');
  visitMessage.textContent = "Visit www.freegiftzone.com to get the codes.";
});
