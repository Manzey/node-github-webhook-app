window.onload=function() {    
    document.getElementById("issues").addEventListener("click",() => {
        alert('hej')
    })

    let socket = io.connect()
    socket.on('incoming', (event) => {
        let body = event.body
        if (body.action == "opened") {
            console.log(body.issue.user.login)
            console.log(body.issue.title)
            console.log(body.issue.created_at)
            console.log(body.issue.updated_at)
            let issueList = document.getElementById('issueList')
            let template = document.getElementById('issueTemp')
            let clone = template.content.cloneNode(true)
            clone.getElementById('issueLink').href = body.issue.url
            clone.getElementById('issueLink').innerHTML = body.issue.user.login
            clone.getElementById('issueTitle').innerHTML = body.issue.title
            clone.getElementById('issueCreated').innerHTML = moment(body.issue.created_at).format('YYYY-MM-DD h:mm a')
            clone.getElementById('issueUpdated').innerHTML = moment(body.issue.updated_at).format('YYYY-MM-DD h:mm a')
            issueList.appendChild(clone)        
}
    })
}
