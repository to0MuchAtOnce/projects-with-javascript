const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// + CHANGES A STRING TO A NUMBER
let ticketPrice = +movieSelect.value;

// SAVE SELECTED MOVIE INDEX AND PRICE
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// UPDATE TOTAL AND COUNT
function updateSelectedCountAndTotal() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // COPY SELECTED SEATS INTO ARR
  // MAP THROUGH ARR
  // RETURN A NEW ARR OF INDEXES
  // THE LINE OF CODE BELLOW DOES ALL OF THESE THINGS
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // SAVE TO LOCAL STORAGE
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//GET DATA FROM LOCAL STORAGE AND POPULATE UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedMovieIndex = selectedMovieIndex;
  }
}

// MOVIE SELECT EVENT
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCountAndTotal();
});

// SEAT CLICK EVENT
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCountAndTotal();
  }
});
// INITIAL COUNT AND TOTAL SET
updateSelectedCountAndTotal();
