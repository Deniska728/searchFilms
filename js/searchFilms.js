const form = document.querySelector('form')

const handleSubmit = e => {
  e.preventDefault()
  const search = document.querySelector('[type="search"]')
  let value = search.value.trim()

  value.toLowerCase()

  if(value){
    let valueArray = value.split(' ')

    if(valueArray.length > 1){
      let valueStr = valueArray.join('+')
      embeded(`http://www.omdbapi.com/?s=${valueStr}&apikey=d5677312`)
    } else {
      embeded(`http://www.omdbapi.com/?s=${value}&apikey=d5677312`)
    }

  } else {
    console.log('Не введено значение');
  }
}

form.addEventListener('submit', handleSubmit)
