let movieCollection = document.querySelector("#movies-container")
let movieNav = document.querySelector("#nav-bar")
let movieNavButtons = document.querySelectorAll(".clickables")
let currentPage = document.querySelector("#current-page")
let newMovieForm = document.querySelector("#user-input")
let genreSelect = document.querySelector("#genreId")
let createNewMovieForm = document.querySelector(".add-a-movie")
let titleInput = document.querySelector("#new-title")
let posterInput = document.querySelector("#new-poster")
let trailerInput = document.querySelector("#new-trailer")
let globalGenres = []
let newMovieAdd = false


function populatePage(){fetch("http://localhost:3000/movies")
    .then(res => res.json())
    .then(function(moviesArr){
        movieCollection.innerHTML = " "
        moviesArr.forEach(function(movieObject){
           turnMovieToPosterEntry(movieObject)
        })
    })}


populatePage()

    function turnMovieToPosterEntry(movie){
        let movieEntryDiv = document.createElement("div")
        movieEntryDiv.className = "entry"

        let movieTitleH2 = document.createElement("h2")
        movieTitleH2.innerText = movie.title

        let movieImage = document.createElement("img")
        movieImage.src = movie.poster
        movieImage.className = "posters"
        movieImage.alt = movie.title

        let movieTrailer = document.createElement("iframe")
        movieTrailer.src = movie.trailer
        movieTrailer.height = "600"
        movieTrailer.width = "900"
        movieTrailer.title = "trailer"

        let movieTrailerSource = document.createElement("source")
        movieTrailerSource.src = movie.trailer

        let movieViews = document.createElement("p")
        movieViews.innerText = `Views: ${movie.views}`

        let deleteButton = document.createElement("button")
        deleteButton.className = "delete-button"
        deleteButton.innerText = "X"


    
        movieEntryDiv.append(movieTitleH2, deleteButton, movieImage, movieViews) 
        movieCollection.append(movieEntryDiv)

        movieImage.addEventListener('click', function(evt){
           movieImage.remove()
           movieEntryDiv.append(movieTrailer)
    
        })

        deleteButton.addEventListener("click", function(evt){

            fetch(`http://localhost:3000/movies/${movie.id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(function(emptyObj){
                    movieEntryDiv.remove()
                })
        })
    
    }

    fetch("http://localhost:3000/genres?_embed=movies")
       .then(res => res.json())
       .then(function(genreArr){
           globalGenres = [...genreArr]
           genreArr.forEach(function(genreObj){
           turnGenreIntoButton(genreObj)
           turnGenreIntoOption(genreObj)
       })
    })
       function turnGenreIntoButton(genreObj){
           let genreSpan = document.createElement("span")
            genreSpan.className = "clickables"
            genreSpan.innerText = genreObj.name
            
            movieNav.append(genreSpan)

            let genreID = genreObj.id
            
            genreSpan.addEventListener("click", function(){

               

                fetch(`http://localhost:3000/genres/${genreID}/?_embed=movies`)
                .then(res => res.json())
                .then(function(genreObj){
                    movieCollection.innerHTML = " "
                    createNewMovieForm.style.display = "none"
                    let moviesInSpecificGenre = genreObj.movies

                      moviesInSpecificGenre.forEach(function(movieObject) {
                        turnMovieToPosterEntry(movieObject)


                       
                    })

                   

                    
                })

            })

          
        }

 let allMovies = document.querySelector(".clickables")
 
 allMovies.addEventListener('click', function(){
 populatePage()

 createNewMovieForm.style.display = "block"

 }
 
 )

 movieNavButtons.forEach(item => {
    item.addEventListener('click', function(){
        console.log(item)
      currentPage.innerText = item.innerText
        })
    })

    function populatePage(){fetch("http://localhost:3000/movies")
    .then(res => res.json())
    .then(function(moviesArr){
        movieCollection.innerHTML = " "
        moviesArr.forEach(function(movieObject){
           turnMovieToPosterEntry(movieObject)
        })
    })}

    function turnGenreIntoOption(genreObj){
        let genreOption = document.createElement("option")
        genreOption.innerText = genreObj.name
        genreOption.value = genreObj.id

        genreSelect.append(genreOption)
    }


    createNewMovieForm.addEventListener("submit", function(evt){
        evt.preventDefault()
        let newMovieTitle = titleInput.value
        let newMoviePoster = posterInput.value
        let newMovieTrailer = trailerInput.value
        let newMoviesGenre = genreSelect.value
        fetch("http://localhost:3000/movies", {

        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({
            title: newMovieTitle,
            poster: newMoviePoster,
            trailer: newMovieTrailer,
            views: 0,
            genreId: parseInt(newMoviesGenre)

        })
        })
        .then(res => res.json())
        .then(function(newMovie){

           let foundGenre = globalGenres.find(function(genrePojo){
                return genrePojo.id === parseInt(newMoviesGenre)

            })

            let copyOfMovie = [...foundGenre.movies, newMovie]
// set found genres (genre found on line 145) movies to be the copy of movie
                foundGenre.movies = copyOfMovie
                
                turnMovieToPosterEntry(newMovie)
        })
    })



    