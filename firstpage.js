let data = JSON.parse(localStorage.getItem("data"))
document.getElementById("username").innerHTML = data.name


function logout() {
    localStorage.clear()
    window.location.replace("frontpage.html")
}