# freegiftzone
It looks like you have provided all the essential files for your **Giveaway Countdown Tracker** Chrome extension, which includes JavaScript, HTML, CSS, and the manifest file. Now, here’s the full **README.md** for your GitHub repository that explains everything and includes the backlink.

---

# Giveaway Countdown Tracker - Chrome Extension

The **Giveaway Countdown Tracker** is a Chrome extension that helps users track the exact time for daily giveaways. It provides a countdown to the next giveaway and shows when the next set of codes will be available, specifically between **5 PM and 9 PM**.

## Features
- Provides a countdown to the next giveaway.
- Shows the exact time for the next code drop between 5 PM and 9 PM.
- Updates daily, showing the number of codes and total giveaway amount.
- Simple and user-friendly interface for easy use.

## How It Works
The extension uses JavaScript to generate a random time between 5 PM and 9 PM for the next set of codes. It automatically updates the time every day, so users can stay on track with the latest giveaways. LocalStorage is used to store the daily data, ensuring smooth functionality without the need for constant updates.

## Installation
1. Download or clone the repository to your local machine.
2. Open Chrome and go to **chrome://extensions/**.
3. Enable **Developer Mode** by toggling the switch in the top right.
4. Click on **Load unpacked** and select the folder where you have downloaded the extension files.
5. The extension will be installed and visible in the browser.

## Technologies Used
- **HTML** for structuring the popup interface.
- **CSS** for styling the countdown display and other elements.
- **JavaScript** for dynamic content updates, time tracking, and data storage.
- **Manifest v3** for defining the Chrome extension structure and behavior.

## File Structure
Here’s a quick look at the key files used in this project:

- `popup.html`: The main HTML file for the extension’s popup.
- `popup.js`: Contains JavaScript logic for tracking and updating the giveaway countdown.
- `background.js`: A simple background script to register the service worker.
- `manifest.json`: The configuration file for the extension.

## How to Use
- Click on the extension icon in your Chrome toolbar to open the popup.
- View the countdown to the next giveaway and see when the next codes will be available.
- Keep track of the number of codes and total amount available in the next giveaway.

## Giveaway Details
Each day, the extension randomly generates:
- The exact time between **5 PM and 9 PM** when the codes will be available.
- The number of codes to be released (between 5 and 20).
- The total amount for the giveaway (in multiples of ₹10, ranging from ₹10 to ₹200).

## Contributing
If you’d like to contribute to the project, feel free to submit pull requests or issues on GitHub. We welcome feedback and suggestions to improve the extension!

## Learn More
For more information and to grab daily giveaway codes, visit:  
[Free Gift Zone](https://www.freegiftzone.com)

---

This **README** explains the functionality, usage, and installation of your Chrome extension. It also includes the backlink to your site. You can upload this README along with your files on GitHub.
