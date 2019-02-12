function removeFromStorage(e, imdbID){
  const films = JSON.parse(localStorage.getItem('films') || "[]")
  for(let film of films){
    if(film['imdbID'] == imdbID){
      films.splice(films.indexOf(film), 1)
    }
  }
  for(let film of films){
    if(film['imdbID'] == imdbID){
      films.splice(films.indexOf(film), 1)
    }
  }
  localStorage.setItem('films', JSON.stringify(films))
  renderFilmsToFavorites()
}

const insertToStorage = options => {
  const films = JSON.parse(localStorage.getItem('films') || "[]")
  for(let film of films){
    if(film['imdbID'] == options.imdbID){
      removeFromStorage(null, options.imdbID)
      return
    }
  }
  films.push(options)
  try {
    localStorage.setItem('films', JSON.stringify(films))
    renderFilmsToFavorites()
  } catch (error) {
    alert('Память заполнена.')
  }
}