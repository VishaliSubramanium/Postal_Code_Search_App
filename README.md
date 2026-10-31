#  Pincode Lookup App

A lightweight, responsive web application built with vanilla JavaScript that allows users to instantly look up details of Indian postal codes using the Indian Postal Pincode API (https://api.postalpincode.in/). 


##  Features

- **Instant Pincode Lookup:** Enter any valid 6-digit Indian postal code to fetch comprehensive post office details.
- **Real-time Filtering:** Filter the retrieved post office results dynamically as you type in the search/filter box.
- **Custom Loading Spinner:** Clean visual feedback while fetching asynchronous data from the API.
- **Robust Error Handling:** 
  - Validates input length (ensures exactly 6 digits).
  - Handles invalid or non-existent pincodes gracefully.
  - Displays a custom `"Couldn’t find the postal data you’re looking for…"` message when search filters return no results.
- **Responsive UI:** Clean, modern grid layout designed for seamless use across different devices.


##  Tech Stack

- **HTML5** – Semantic markup structure
- **CSS3** – Styling, CSS variables, Flexbox & CSS Grid, and custom animations
- **JavaScript (ES6+)** – DOM manipulation, Async/Await API requests, and real-time event handling
