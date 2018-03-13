window.onload = function () {
  let socket = io.connect()
  socket.on('incoming', (event) => {
    let body = event.body
    if (body.action === 'opened' || body.action === 'reopened') {
      let issueList = document.getElementById('issueList')
      let issueTemp = document.getElementById('issueTemp')
      let issueClone = issueTemp.content.cloneNode(true)
      issueClone.getElementById('issueLink').href = body.issue.html_url
      issueClone.getElementById('issueLink').textContent = body.issue.user.login
      issueClone.getElementById('issueTitle').textContent = body.issue.title
      issueClone.getElementById('issueCreated').textContent = moment(body.issue.created_at).format('YYYY-MM-DD, h:mm a')
      issueClone.getElementById('issueUpdated').textContent = moment(body.issue.updated_at).format('YYYY-MM-DD, h:mm a')
      issueList.prepend(issueClone)
      if (body.action === 'opened') { notify('Issue opened!', body.issue.html_url, body.issue.title, body.issue.user.login) }

      if (body.action === 'reopened') { notify('Issue reopened!', body.issue.html_url, body.issue.title, body.issue.user.login) }
    } else if (body.action === 'closed') {
      notify('Issue closed!', body.issue.html_url, body.issue.title, body.issue.user.login)
      let parent = document.getElementById('issueList')
      let children = parent.getElementsByTagName('div')
      for (let child of children) {
        if (child.className === 'issueBox') {
          if (child.querySelector('#issueLink').href === body.issue.html_url) {
            parent.removeChild(child)
          }
        }
      }
    } else if (body.action === 'created') {
      notify('New comment!', body.issue.html_url, body.issue.title, body.issue.user.login)
    } else if (body.action === 'deleted') {
      notify('Comment deleted!', body.issue.html_url, body.issue.title, body.issue.user.login)
    }
  })
}

function notify (action, titleLink, titleBody, user) {
  let notificationList = document.getElementById('notificationList')
  let notifyTemp = document.getElementById('notifyTemp')
  let notifyClone = notifyTemp.content.cloneNode(true)
  notifyClone.getElementById('notifyAction').textContent = action
  notifyClone.getElementById('notifyTitle').href = titleLink
  notifyClone.getElementById('notifyTitle').textContent = titleBody
  notifyClone.getElementById('notifyUser').textContent = user
  notificationList.prepend(notifyClone)
}
