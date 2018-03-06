window.onload=function() {    
    document.getElementById("issues").addEventListener("click",() => {
        alert('hej')
    })

    let socket = io.connect()
    socket.onmessage = (event) => {
        console.log(event)
        console.log(event.req)
        console.log(event.res)
    }
}
