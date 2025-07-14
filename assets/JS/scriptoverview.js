const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWJhYmMxYWY3NDZkYThkODY4YTg4Y2QxODQ1ZjhkYiIsIm5iZiI6MTc1MTk1OTc0Ni40MTkwMDAxLCJzdWIiOiI2ODZjYzhjMmYwNTdhYmE5MWFjZWViODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.x4JC6-fgDB1IJJkvWd1ShSQEqUJUhOJuigB2gezN8uk'
    }
};

//find the id in the url
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");



fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    .then(res => res.json())
    .then(data => {


        console.log(data);
        document.getElementById("title").innerText = data.title;
        document.getElementById("releaseDate").innerText = data.release_date;
        document.getElementById("voteAverage").innerText = data.vote_average;
        document.getElementById("overview").innerText = data.overview;
        document.getElementById("poster").src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        document.getElementById("pgRating").innerText = data.adult ? "18+" : "PG";

    })
    .catch(err => console.error(err));

// Cast fetch
fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
    .then(res => res.json())
    .then(data => {
        const castEl = document.getElementById("cast");
        data.cast.slice(0, 6).forEach(actor => {
            castEl.innerHTML += `
        <div class="text-center">
          <img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" alt="${actor.name}" class="img-fluid">
          <p><strong>${actor.name}</strong><br><em>${actor.character}</em></p>
        </div>
      `;
        });
    });