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
        
        document.getElementById("banner").style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${data.backdrop_path}')`;


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

    //trailer fetch
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(data => {
    const trailer = data.results.find(video =>
      video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer) {
      const trailerKey = trailer.key;
      const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;

      document.getElementById("trailer").innerHTML = `
        <div class="ratio ratio-16x9">
          <iframe src="${trailerUrl}" title="Movie Trailer" allowfullscreen></iframe>
        </div>
      `;
    } else {
      document.getElementById("trailer").innerHTML = `<p>No trailer available.</p>`;
    }
  })
  .catch(err => console.error(err));

  //fetch for pg rating
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates`, options)
  .then(res => res.json())
  .then(data => {
    const usRelease = data.results.find(r => r.iso_3166_1 === "US");
    const rating = usRelease?.release_dates[0]?.certification;

    document.getElementById("pgRating").innerText = rating || "Not Rated";
  })
  .catch(err => console.error("Failed to load US rating:", err));
