function Submit() {

    const email = document.getElementById("email1")

    const password = document.getElementById("password")








    fetch("https://project-text-annotation.herokuapp.com/login", {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
                // username: username.value,
                // name: "Eya"
            })


        })
        .then(response => response.json())
        .then(data => {
            if (data.message !== "The username or password is incorrect") {
                console.log(data)
                localStorage.setItem("data", JSON.stringify(data.result))
                document.getElementById("invalid").style.display = "none"
                window.location.replace("firstpage.html")
            } else {
                document.getElementById("invalid").style.display = "block"
                console.log("false")

            }

            console.log(data)
        })

}