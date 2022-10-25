# Getting Started with my GitHub Repository Search Tool

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Instructions

1. Copy and paste your Github Token into axiosConfig in Header.js
2. Use the search bar and language filter to create a query press the search button!

# Project Thoughts

It was a good project to assess my skills when handling API information. I was attempting to use a new state management library called 'Zustand' so that I could break my data up into more components, however I spent too much time on that and decided to proceed with local state instead. I used TailwindCSS over styled components as tailwind is really fast and easy when playing with styling on the fly since I didn't have a UI design to follow. I could have added a "loading phase" to my project since the API requests take a while so would have been a good UX addition. One regret I had was not nesting my inputs together. This means that pressing enter on the keyboard on the search bar does not trigger the axios request. This is a relatively easy fix which would include wrapping my search bar and filters in a form rather than seperated out. I would have also added pagination so I could display more than 30 results.

I could not find the README.md information from the single API request. I was not sure on whether I was expected to call another endpoint, or scrapr the README page instead. If it was more clear, I would have most likely created a pop-up modal on the "Read More" section of the RepoInformationCard to display the text and images. I just passed the data as props as a placeholder.
