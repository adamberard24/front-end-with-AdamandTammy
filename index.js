let movieCollection = document.querySelector("#movies-container")
let movieNav = document.querySelector("#nav-bar")
let movieNavButtons = document.querySelectorAll(".clickables")
let currentPage = document.querySelector("#current-page")
let newMovieForm = document.querySelector("#user-input")
let genreSelect = document.querySelector("#genreId")

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

        let movieViews = document.createElement("p")
        movieViews.innerText = `Views: ${movie.views}`

        let deleteButton = document.createElement("button")
        deleteButton.className = "delete-button"
        deleteButton.innerText = "X"


        //let movieTrailer = document.createElement("iframe")
        //movieTrailer.src = movie.trailer
    
        movieEntryDiv.append(deleteButton, movieTitleH2, movieImage, movieViews) //movieTrailer)
        movieCollection.append(movieEntryDiv)
    }

    fetch("http://localhost:3000/genres?_embed=movies")
       .then(res => res.json())
       .then(function(genreArr){
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
                currentPage.innerText = genreObj.name
                fetch(`http://localhost:3000/genres/${genreID}/?_embed=movies`)
                .then(res => res.json())
                .then(function(genreObj){
                    movieCollection.innerHTML = " "
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