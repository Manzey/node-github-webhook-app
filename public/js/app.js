window.onload=function() {    
    document.getElementById("issues").addEventListener("click",() => {
        alert('hej')
    })

    // 2018-03-06T15:24:50Z

    let socket = io.connect()
    socket.on('incoming', (event) => {
        let body = event.body
        if (body.action == "opened") {
            let issueList = document.getElementById('issueList')
            let template = document.getElementById('issueTemp')
            let clone = template.content.cloneNode(true)
            clone.getElementById('issueLink').href = body.issue.html_url
            clone.getElementById('issueLink').innerHTML = body.issue.user.login
            clone.getElementById('issueTitle').innerHTML = body.issue.title
            clone.getElementById('issueCreated').innerHTML = moment(body.issue.created_at).format('YYYY-MM-DD, h:mm a')
            clone.getElementById('issueUpdated').innerHTML = moment(body.issue.updated_at).format('YYYY-MM-DD, h:mm a')
            issueList.insertAdjacentElement('afterbegin', clone)        
        } else if (body.action == "closed") {
            let parent = document.getElementById('issueList')
            let children = parent.getElementsByTagName('div')
            for (child of children)  {
                if (child.className === "issueBox") {
                    if (child.getElementById('issueLink').href === body.issue.html_url) {
                        parent.removeChild(child)
                    }
                }
            }
        }
    })
}
