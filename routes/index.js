require('dotenv').config()
let express = require('express')
let router = express.Router()
let github = require('octonode');
let client = github.client(process.env.GITHUB_TOKEN);



/*
* Learning the API
*/
router.get('/', (req, res) => {
  let repo = client.repo('ESX-org/es_extended')
  repo.issues((err, data) => {
  if (err) {
    console.error(err)
  } else {
    console.log(data[0])
  res.render('issues/viewIssues', {issues: data})
  }
})
})

module.exports = router
