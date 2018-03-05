window.onload=function() {    
    document.getElementById("issues").addEventListener("click",() => {
        alert('hej')
    })

    let socket = io.connect()
    console.log(socket)
    console.log(socket)

}
