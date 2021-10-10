var url_api = "http://localhost:8000/api/v1/titles/"
var url_best_movies = url_api + "?format=json&sort_by=-imdb_score"

// Fetch the api and return the promise
function callFetch(url) {
	return fetch(url)
	.then(response => {return response.json();})
	.catch(err => console.log("Problem with fetch:" + err));
}

// Call callFetch and get the best movie url and call showBestMovie
 function getBestMovieUrl(url, id) {
	bestMovies = callFetch(url)
	console.log(bestMovies);
    bestMovies.then(value => {
		console.log(value.results[id].url);
        showBestMovie(value.results[id].url);
    });
}

// Show the data for the best movie
function showBestMovie(url) {
	bestMovieData = callFetch(url);
    bestMovieData.then(movie => {
		console.log(movie);

		document.querySelector('.best_movie_poster').innerHTML = `<img src=${movie.image_url}></img>`
		document.querySelector('.best_movie_title').innerHTML = `<h2>${movie.title}</h2>`
		document.querySelector('.best_movie_summary').innerHTML = `<p>${movie.description}</p>`

		document.getElementById("myBtn").addEventListener("click", function() {
		showModal(movie, "");
	   });		
    });
}

// Call getBestMovieUrl
getBestMovieUrl(url_best_movies, 0)

// Call callFetch and get the movie url and call showMoviePoster
 function getMovieUrl(page_fetch, id_fetch, category, id_selec) {
	let url = url_api + "?format=json&genre=" + category +"&page=" + page_fetch +  "&sort_by=-imdb_score"
	movies = callFetch(url)
	console.log(movies);
    movies.then(value => {
		console.log(value.results[id_fetch].url);
        showMoviePoster(value.results[id_fetch].url, category, id_selec);
    });
}

// Show the poster for a movie
function showMoviePoster(url, category, id_selec) {
	movieData = callFetch(url);
    movieData.then(movie => {
		console.log(movie);
		let selector = ".movie_category_" + category + " .movie_item_" + id_selec
		let movieImage0 = document.querySelector(selector)
		movieImage0.innerHTML = `<img src=${movie.image_url}></img>`
		
		movieImage0.addEventListener("click", function() {
		showModal(movie, movieImage0);
		});
    });
}

// Call getMovieUrl for 4 categories and 2 pages
function getMovieCategory(category) {
	getMovieUrl(1, 0, category, 0)
	getMovieUrl(1, 1, category, 1)
	getMovieUrl(1, 2, category, 2)
	getMovieUrl(1, 3, category, 3)
	getMovieUrl(1, 4, category, 4)
	getMovieUrl(2, 0, category, 5)
	getMovieUrl(2, 1, category, 6)
}

// Call getMovieUrl
let category_list = ["", "action", "comedy", "family"]
for (let category of category_list) {getMovieCategory(category);}

function showModal(movie, movieImage0) {
	let modal = document.getElementById("myModal");
	let btn = document.getElementById("myBtn");
	let span = document.getElementsByClassName("close")[0];
	
	modal.style.display = "block";
	
	btn.onclick = function() {modal.style.display = "block";}
	
	movieImage0.onclick = function() {modal.style.display = "block";}

	span.onclick = function() {modal.style.display = "none";}

	window.onclick = function(event) {if (event.target == modal) {modal.style.display = "none";}}
	
	document.querySelector('.movie_poster').innerHTML = `<img src=${movie.image_url}></img>`
	document.querySelector('.movie_title').innerHTML = `<h2>${movie.title}</h2>`
	document.querySelector('.movie_summary').innerHTML = `<p>${movie.description}</p>`
	document.querySelector('.movie_genres').innerHTML = `<p>Genres: ${movie.genres}</p>`
	document.querySelector('.movie_actors').innerHTML = `<p>Acteurs: ${movie.actors}</p>`
	document.querySelector('.movie_directors').innerHTML = `<p>Réalisateurs: ${movie.directors}</p>`
	document.querySelector('.movie_countries').innerHTML = `<p>Pays: ${movie.countries}</p>`
	document.querySelector('.movie_rated').innerHTML = `<p>Note: ${movie.avg_vote}</p>`
	document.querySelector('.imdb_score').innerHTML = `<p>IMDB: ${movie.imdb_score}</p>`
	document.querySelector('.movie_duration').innerHTML = `<p>Durée: ${movie.duration}'</p>`
	document.querySelector('.date_published').innerHTML = `<p>Sortie: ${movie.date_published}</p>`
	if (movie.worldwide_gross_income=== null){
		document.querySelector('.movie_income').innerHTML = `<p>Recettes: inconnue </p>`
		} else {document.querySelector('.movie_income').innerHTML = `<p>Recettes: ${movie.worldwide_gross_income} USD</p>`};
}

// Scroll Functionality
var scrollAmountlist = [0, 0, 0, 0];

function sliderScroll(movie_category, side) {
	let i;
	if (movie_category === "movie_category_"){i = 0;} 
	else if (movie_category === "movie_category_action"){i = 1;}
	else if (movie_category === "movie_category_comedy"){i = 2;}
	else if (movie_category === "movie_category_family"){i = 3;}
	
	let scrollAmount = scrollAmountlist[i];
	let switchLeftButton = document.getElementsByClassName("switchLeftButton")[i];
	let switchRightButton = document.getElementsByClassName("switchRightButton")[i];
	let scrollPerClick = 182 + 8;
	let slider_select = "."+movie_category+" .content_wrapper";
	let sliders = document.querySelector(slider_select);
	console.log(movie_category);

	if (side === "left") {
		sliders.scrollTo({top: 0, left: (scrollAmount -= scrollPerClick), behavior: "smooth"});
		if (scrollAmount < 0) {scrollAmount = 0;}
	} else if (side === "right") {
		if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
			sliders.scrollTo({top: 0, left: (scrollAmount += scrollPerClick), behavior: "smooth"});
		}
	}

	scrollAmountlist[i] = scrollAmount

	console.log("Scroll Amount: ", scrollAmount);
	console.log(sliders.scrollWidth - sliders.clientWidth);
	
	if (scrollAmount === 0) {switchLeftButton.style.visibility = "hidden";} 
	else if (scrollAmount != 0 && scrollAmount < sliders.scrollWidth - sliders.clientWidth) {
		switchLeftButton.style.visibility = "visible";
		switchRightButton.style.visibility = "visible";
	} else if (scrollAmount >= sliders.scrollWidth - sliders.clientWidth) {switchRightButton.style.visibility = "hidden";}
}
