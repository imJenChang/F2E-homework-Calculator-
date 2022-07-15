const keyboard = document.querySelector('.keys')
const show = document.querySelector('.output-current')
const storage = document.querySelector('.output-previous')
let calStr = ''
let arr = []

keyboard.addEventListener('click', pressKeyboard)

function pressKeyboard(e) {
  const str = e.target.textContent
  switch (str) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
    case '00':
      if (calStr === '0') {
        calStr = ''
        calStr += str
      } else if (calStr === '00') {
        calStr = ''
        calStr += str
      } else {
        calStr += str
      }
      updateShow()
      updateStorage()
      break
    case '+':
    case '-':
    case '×':
    case '÷':
      arr.push(calStr)
      if (str === '×') {
        arr.push('*')
      } else if (str === '÷') {
        arr.push('/')
      } else {
        arr.push(str)
      }
      calStr = ''
      updateShow()
      updateStorage()
      break
    case '=':
      if (isNaN(Number(arr[arr.length - 1])) && calStr == '') {
        arr.pop()
      } else {
        arr.push(calStr)
        calStr = ''
      }
      let arrAnswer = eval(arr.join('')).toPrecision(12)
      let answer = parseFloat(arrAnswer)
      updateShow(answer)
      updateStorage()
      break
    case 'AC':
      arr = []
      calStr = ''
      storage.innerHTML = '0'
      show.innerHTML = '0'
      break
    case '⌫':
      if (calStr === '') {
        arr.pop()
      } else {
        calStr = calStr.substring(0, calStr.length - 1)
      }
      updateShow()
      updateStorage()
      break
    case '.':
      if (calStr === '') {
        calStr = '0.'
      } else if (!calStr.includes('.')) {
        calStr += '.'
      }
      updateShow()
      updateStorage()
      break
    default:
      break
  }
}

function addComma(data) {
  if (data.includes('.')) {
    return data.replace(/\d(?=(?:\d{3})+\b\.)/g, '$&,')
  } else {
    return data.replace(/\d(?=(?:\d{3})+\b)/g, '$&,')
  }
}

function updateShow(answer) {
  let showText = ''
  if (typeof answer === 'undefined') {
    showText = addComma(calStr)
  } else {
    showText = addComma(answer.toString())
  }
  show.innerHTML = showText
}

function updateStorage() {
  let commaArr = arr.slice()
  let storageText = ''
  for (let i = 0; i < commaArr.length; i++) {
    commaArr[i] = addComma(commaArr[i])
  }
  if (typeof arr[0] === 'undefined') {
    storageText = addComma(calStr)
  } else {
    storageText = commaArr.join('')
  }
  storage.innerHTML = storageText
}
