const express = require('express')
const fs = require('fs')
const util = require('util')
// const bodyParser = require("body-parser");
// const request = require('request')

const app = express()
app.use(express.static('frontend'))
// app.use(bodyParser.urlencoded({extended: true}))

const readfile = util.promisify(fs.readFile)
const writefile = util.promisify(fs.writeFile)

const dataBase = async () => {
  const counter = Number(await readfile('counter.txt', 'utf-8')) + 1
  await writefile('counter.txt', `${counter}`)
  return counter
}

const checkPoints = async (x) => {
  if (x % 500 === 0) {
    return 250
  } else if (x % 100 === 0) {
    return 10
  } else if (x % 10 === 0) {
    return 5
  }
  return 0
}

const presses = (counter) => {
  let start = counter
  let victory = false
  while (!victory) {
    if (start % 500 === 0 || start % 100 === 0 || start % 10 === 0) {
      victory = true
    } else {
      start++
    }
  }
  return start - counter
}

app.put('/increment', async (req, res) => {
  const counter = await dataBase()
  const points = await checkPoints(counter)
  const pressesNeedes = presses(counter)
  const gameStat = {
    points: points,
    pressesToWin: pressesNeedes
  }
  res.json(gameStat)
  console.log(gameStat)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Server started on port 3000.')
})

// curl http://localhost:3000/increment
