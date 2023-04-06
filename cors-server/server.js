const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 3000
const https = require('https')

app.get('/:region/character/:ign', (req, res) => {
  const { region, ign } = req.params
  https.get(
    `https://maplestory.nexon.net/api/ranking?id=overall&id2=legendary&character_name=${ign}&page_index=1`,
    (response) => {
      let data = ''

      response.on('data', (chunk) => {
        data += chunk
      })

      response.on('end', () => {
        res.send(JSON.parse(data))
      })
    }
  )
})

app.listen(port, () => {
  console.log('Running server')
})
