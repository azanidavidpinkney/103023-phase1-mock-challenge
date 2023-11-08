// your code here

document.addEventListener("DOMContentLoaded", () => {
    getAllCakes();
});

const cakesAPI = "http://localhost:3000/cakes";
let cakeList = [];

const cakeNav = document.getElementById("cake-list");
const cakeDetail = document.getElementById("cake-details");
const cakeReviews = document.getElementById("review-list");
const reviewForm = document.getElementById("review-form");
const reviewInput = document.getElementById("review");

function getAllCakes() {
    fetch(cakesAPI)
    .then(response => response.json())
    .then(cakes => {
        cakeList = cakes;
        renderCakes(cakes);
        getCakeDetails(cakes[0].id); // fetch the first cake's details for then the page loads
    });
};

function renderCakes(cakes) {
    cakeNav.innerHTML = ` `;
    cakes.forEach(renderCake);
};

// Render each cake into the header by inserting each into the nav list + defining the action for a click on each of these list items
function renderCake(cake) {
    const li = document.createElement('li')
    li.textContent = cake.name;
    li.addEventListener('click', () => getCakeDetails(cake.id));
    cakeNav.appendChild(li);
};

getAllCakes();

// fetch the details of a single cake from the API
function getCakeDetails(id) {
    fetch(`${cakesAPI}/${id}`)
    .then(response => response.json())
    .then(cake => displayCakeDetails(cake));
};

// display the retrieved details of each cake
function displayCakeDetails(cake) {
    document.getElementById('cake-name').textContent = cake.name;
    document.getElementById('cake-image').src = cake.image_url
    document.getElementById('cake-description').textContent = cake.description;

    cakeReviews.innerHTML = ` `;
    cake.reviews.forEach(review => {
        const li = document.createElement('li')
        li.textContent = review;
        cakeReviews.appendChild(li);
    });
};

// Adds event listener to Review Submit form and creates/adds new values for each review submitted

reviewForm.addEventListener('submit', postNewReview);

function postNewReview(e) {
    e.preventDefault();
    const review = reviewInput.value;
    const li = document.createElement('li');
    li.textContent = review;
    cakeReviews.appendChild(li);
    reviewInput.value = ``;
};
