const createList = array => {
  const listFilms = document.createElement('div')
  listFilms.classList.add('list-films')

  array.map( item => {
    const itemFilm = document.createElement('div')
    const img = document.createElement('img')
    const title = document.createElement('p')

    img.alt = ''
    if(item.Poster !== 'N/A'){
      img.src = item.Poster
    } else {
      img.alt = 'Нет постера'
    }
    title.innerHTML = item.Title
    itemFilm.classList.add('list-item')
    itemFilm.appendChild(img)
    itemFilm.appendChild(title)
    listFilms.appendChild(itemFilm)
  })

  document.body.appendChild(listFilms)
}

const removeUnnecessaryElements = selector => {
  const element = document.querySelector(selector)
  if(element) document.body.removeChild(element)
}
