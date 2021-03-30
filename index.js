let movieCollection = document.querySelector("#movies-container")
let movieNav = document.querySelector("#nav-bar")
let movieNavButtons = document.querySelectorAll(".clickables")

console.log(movieNavButtons)

fetch("http://localhost:3000/movies")
    .then(res => res.json())
    .then(function(moviesArr){
        moviesArr.forEach(function(movieObject){
           turnMovieToPosterEntry(movieObject)
        })
    })

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


 movieNavButtons.forEach(item => {
    item.addEventListener('click', function(){
       console.log(item)
        })
    })