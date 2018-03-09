require('dotenv').config()
let express = require('express')
let router = express.Router()
let github = require('octonode')
let client = github.client(process.env.GITHUB_TOKEN)
let app = require('../app')
let verifyGithubWebhook = require('github-express-webhook-verifying')

router.get('/', (req, res) => {
  let repo = client.repo('1dv023/dl222is-examination-3')
  repo.issues((err, data) => {
    if (err) {
      console.error(err)
    } else {
      res.render('issues/viewIssues', {issues: data})
    }
  })

  app.io.once('connection', (socket) => {
	// When connected, do something
    socket.on('disconnect', function () {
	// When disconnected, do something
    })
  })
})

router.post('/webhook', verifyGithubWebhook(process.env.GITHUB_SECRET), (req, res) => {
  let data = {headers: req.headers, body: req.body}
  app.io.emit('incoming', data)
  res.status(200).send('OK')
})

module.exports = router
