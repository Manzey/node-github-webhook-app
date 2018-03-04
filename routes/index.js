let express = require('express')
let router = express.Router()
let github = require('octonode');
let client = github.client();


/*
* Learning the API
*/
router.get('/', (req, res) => {
  let repo = client.repo('ESX-org/es_extended')
  repo.issues((err, data) => {
    data.forEach(issue => console.log(issue.user.login))
  })
  res.render('issues/viewIssues')
  
})

module.exports = router
