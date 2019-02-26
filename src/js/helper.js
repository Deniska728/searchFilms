export function removeFromStorage(e, imdbID){
  const films = JSON.parse(localStorage.getItem('films') || "[]")
  films.map( film => {
    if(film['imdbID'] == imdbID){
      films.splice(films.indexOf(film), 1)
    }
  })
  localStorage.setItem('films', JSON.stringify(films))
}


