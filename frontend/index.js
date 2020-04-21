const btn = document.getElementById('play')
const btnAgain = document.getElementById('playAgain')
btnAgain.disabled = true

const reset = () => {
  window.localStorage.setItem('points', 20)
  btnAgain.disabled = true
  btn.disabled = false
  document.querySelector('h1').innerHTML = 'Game'
  document.getElementById('points').innerHTML = `Points: ${window.localStorage.getItem('points')}`
}

const clicked = async () => {
  window.localStorage.setItem('points', Number(window.localStorage.getItem('points')) - 1)
  await fetch('https://polar-retreat-11150.herokuapp.com/increment', { method: 'PUT' })
    .then(hr => hr.json())
    .then(json => {
      let content = document.getElementById('presses')
      content.innerHTML = `Presses till win: ${json.pressesToWin}`
      if (json.pressesToWin == 0) {
        content.innerHTML = `You won: ${json.points} points`
      }
      console.log(json.points)
      window.localStorage.setItem('points', Number(window.localStorage.getItem('points')) + json.points)
      document.getElementById('points').innerHTML = `Points: ${window.localStorage.getItem('points')}`
      if (Number(window.localStorage.getItem('points')) <= 0) {
        btn.disabled = true
        document.querySelector('h1').innerHTML = 'Game over'
        btnAgain.disabled = false
        btnAgain.addEventListener('click', () => {
          reset()
        })
      }
    })
}

window.addEventListener('load', () => {
  if (window.localStorage.getItem('points') === null) {
    window.localStorage.setItem('points', 20)
  }
  document.getElementById('points').innerHTML = `Points: ${window.localStorage.getItem('points')}`
  btn.addEventListener('click', clicked)
})
