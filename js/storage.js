function removeFromStorage(e, imdbID){
  const films = JSON.parse(localStorage.getItem('films') || "[]")
  films.map( film => {
    if(film['imdbID'] == imdbID){
      films.splice(films.indexOf(film), 1)
    }
  })
  localStorage.setItem('films', JSON.stringify(films))
  new Film().renderFilmsToFavorites()
}

const insertToStorage = options => {
  const films = JSON.parse(localStorage.getItem('films') || "[]")
  const button = document.querySelector(`.list-films .fav[data-id="${options.imdbID}"]`)
  const buttonFav = document.querySelector(`.favorites .fav[data-id="${options.imdbID}"]`)
  const d2Button = document.querySelector('.display-2 .fav')
  for(let film of films){
    if(film['imdbID'] == options.imdbID){
      removeFromStorage(null, options.imdbID)
      button.classList.remove('fav-click')
      buttonFav.classList.remove('fav-click')
      return
    }
  }
  films.push(options)
  try {
    localStorage.setItem('films', JSON.stringify(films))
    button !== null ? button.classList.add('fav-click') : ''
    d2Button.classList.add('fav-click')
    new Film().renderFilmsToFavorites()
  } catch (error) {
    alert('Память заполнена.')
  }
}