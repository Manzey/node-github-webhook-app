require('dotenv').config()
let express = require('express')
let router = express.Router()
let github = require('octonode');
let client = github.client(process.env.GITHUB_TOKEN);

router.get('/', (req, res) => {
  let repo = client.repo('1dv023/dl222is-examination-3')
  repo.issues((err, data) => {
  if (err) {
    console.error(err)
  } else {
   // console.log(data[0])
  res.render('issues/viewIssues', {issues: data})

  }
})
})

router.post('/post', (req, res) => {
  console.log(req)
  console.log(res)
})

module.exports = router
