const getFilms = async url => { 
  const responce = await fetch(url, { method: 'GET'})
  const films = await responce.json()
  return films
}

const embeded = url => {
  getFilms(url)
    .then( result => {
      if(result.Response === "False") throw new Error('Ничего не найдено')
      textError.innerHTML = ''
      createList(result.Search)
    })
    .catch( error => {
      filmContainer.innerHTML = ''
      textError.innerHTML = error
    })
}