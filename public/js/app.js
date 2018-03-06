window.onload=function() {    
    document.getElementById("issues").addEventListener("click",() => {
        alert('hej')
    })

    let socket = io.connect()
    socket.on('incoming', (event) => {
        console.log('Hej')
        console.log(event)
    })
}
