$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
        
    });
});

function getMovies(searchText){
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=86068eae&s='+searchText)
    .then((response) => {
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `<div class="col-md-3 mb-5">
                        <div class="card text-center">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div> 
                       </div>`;
        });
      $('#movies').html(output); 
    })
    .catch((err) => {
        console.log(err);
    });

}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;

}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com/?apikey=86068eae&i='+movieId)
    .then((response) => {
        let movie = response.data;

        let output = `
        <div class="card">
            <div class="card-body">
            <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster}" class="img-thumbnail">
            </div>
            <div class="col-md-8">
                <h4 class="text-center">${movie.Title}</h4>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div>
                <h3>Plot</h3>
                ${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" traget="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-default">Go Back To Search</a>
            </div>
        </div>
            </div>
        </div>    `;
        $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

