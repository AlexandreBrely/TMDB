const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWJhYmMxYWY3NDZkYThkODY4YTg4Y2QxODQ1ZjhkYiIsIm5iZiI6MTc1MTk1OTc0Ni40MTkwMDAxLCJzdWIiOiI2ODZjYzhjMmYwNTdhYmE5MWFjZWViODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.x4JC6-fgDB1IJJkvWd1ShSQEqUJUhOJuigB2gezN8uk'
    }
};

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        document.getElementById("banner").style.backgroundImage =`url('https://image.tmdb.org/t/p/w1280${data.results[0].backdrop_path}')`

        for (let i = 0; i < 20; i++) {

            

            document.getElementById("boxOffice").innerHTML +=
                //  <a href="overview.hmtl???${}">

                ` <div class="col-md-3 col-6">
                <div class="cards h-100 rounded border border-primary-subtle shadow">

                <img class="img-fluid" src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}.jpg" alt="Affiche de ${data.results[i].title}">

                <p id="title" class="fw-bold fs-4 text-center">${data.results[i].title}</p>


                <div class="mt-auto">
                  <p id="date" class="">Date de sortie: ${data.results[i].release_date}</p>
                  <p id="vote" class="">Note moyenne: ${data.results[i].vote_average}</p>
                </div>
            </div>
            </div>
             `
            // </a>
        }
    })












    .catch(err => console.error(err));