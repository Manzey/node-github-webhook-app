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
        }
    })
}
