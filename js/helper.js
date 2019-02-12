let filmContainer = document.querySelector('.list-films')
const img = document.querySelector('.display-2-body > img')
const p = document.querySelector('.display-2-body p')
const h3 = document.querySelector('.display-2-body h3')
const genre = document.querySelector('.display-2-body .genre')
const rating = document.querySelector('.rating')
const textError = document.querySelector('.display-1 > p')
const header = document.querySelector('.display-2-header')
const buttonExit = document.querySelector('.exit')

const createList = array => {
  filmContainer.innerHTML = ''
  array.map( item => {
    filmContainer.appendChild(new Film(item).render())
  })
}

const createFilm = options => {
  const { Poster, Title, Year, Plot, Genre, imdbRating } = options

  const buttonFav = document.querySelector('.display-2-header button.fav')
  buttonFav ? header.removeChild(buttonFav) : ''

  const favor = document.createElement('button')
  favor.classList.add('fav')
  favor.innerHTML = '♥'
  favor.addEventListener('click', e => insertToStorage(options))
  header.appendChild(favor)
  img.src = Poster !== 'N/A' ? Poster : './img/notfound.png'
  p.innerHTML = `<span class="bold">Description:</span> ${Plot}`
  h3.innerHTML = `${Title}(${Year})`
  genre.innerHTML = `<span class="bold">Genre:</span> ${Genre}`
  rating.innerHTML = `<span class="bold">IMDb rating:</span> ${imdbRating}`
}

const openFilm = (e, imdbID) => {
  e.preventDefault()
  Api.getFilms(`?i=${imdbID}`)
  .then( result => {
    createFilm(result)
    document.querySelector('.display-1').style.display = 'none'
    document.querySelector('.display-2').style.display = 'block'
  })
}

const clickToExit = () => {
  document.querySelector('.display-1').style.display = 'block'
  document.querySelector('.display-2').style.display = 'none'
}
buttonExit.addEventListener('click', clickToExit)


