function fetchingMovie() {

// Declaring Variables
    let searchLanding = document.querySelector('.search-landing'),
        btnLanding = document.querySelector('.btn-landing'),
        landing = document.querySelector('.landing'),
        movieTitle =  document.querySelector('.title-cont p:first-child'),
        movieType = document.querySelector('.title-cont p:last-child'),
        moviePoster = document.querySelector('.body .img-container img'),
        movieDesc = document.querySelector('.body .movie-desc'),
        actorsCont = document.querySelector('.actors-cont'),
        movieDirec = document.querySelector('.body .director'),
        screenWriter = document.querySelector('.body .screen-writer'),
        movieAwards = document.querySelector('.body .awards'),
        imdbRate = document.querySelector('.body .imdb span'),
        rottenRate = document.querySelector('.body .rotten span'),
        errorCont = document.querySelector('.error-cont'),
        searchBtn = document.querySelector('.search-btn'),
        searchInput = document.querySelector('.search-input');

// Fetching Data And Put It In Variable
        async function fetchingApi() {

            let movieResp = await fetch(`https://www.omdbapi.com/?apikey=37ad1008&t=${searchInput.value || searchLanding.value}`);
            let movieData = await movieResp.json();

            if(movieData.Response === 'True') {

// Removing The Landing Page
            landing.remove();

// Putting Data In The Variable
             movieTitle.innerHTML = movieData.Title;
             movieType.innerHTML = movieData.Genre;
             moviePoster.setAttribute('src',`${movieData.Poster}`);
             movieDesc.innerHTML = movieData.Plot;
             movieDirec.innerHTML = movieData.Director;
             screenWriter.innerHTML = movieData.Writer;
             movieAwards.innerHTML = movieData.Awards;
             imdbRate.innerHTML = `${movieData.imdbRating} / 10` ;
             rottenRate.innerHTML = movieData.Ratings.length > 1 ? movieData.Ratings[1].Value : 'Not Found';

// Countiong Actor Length & Creating <p> For Each Actor

             let actors = movieData.Actors.split(',');
             actorsCont.innerHTML = ''; 
             actors.forEach(actor => {
                 let x = document.createElement('p');
                 x.innerHTML = actor;
                 x.className = 'h6 text-primary';
                 actorsCont.appendChild(x)
             })

// If There Is No Data Put None Instead Of N/A
            let statusAry = [movieTitle,movieType,movieDesc,movieDirec,screenWriter,movieAwards];
            statusAry.forEach(elm => {
                elm.innerHTML === 'N/A'? elm.innerHTML ='None' : '';
            })

// Display Error If The Response Didnt Resolve
            }
            else {
                errorCont.style.display = 'flex';
            }

        }
        searchBtn.addEventListener('click', fetchingApi)
        btnLanding.addEventListener('click',fetchingApi)

}

fetchingMovie()

// Error Handling
const errorBtn = document.querySelector('.error-btn');
errorBtn.addEventListener('click', errorHandling)
function errorHandling() {
    const errorCont = document.querySelector('.error-cont');
    errorCont.style.display = 'none'
}