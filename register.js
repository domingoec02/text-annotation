function Submit() {
    console.log("hello")
    const email = document.getElementById("email1")
    console.log(email.value)
    const password = document.getElementById("password")
    console.log(password.value)
    const confirmpassword = document.getElementById("confirmpassword")
    console.log(confirmpassword.value)
    const name = document.getElementById("name")
    console.log(name.value)

    fetch("https://project-text-annotation.herokuapp.com/get-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.value

            })

        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.message === "error") {
                if (password.value === confirmpassword.value) {

                    fetch("https://project-text-annotation.herokuapp.com/register", {

                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: email.value,
                                password: password.value,
                                name: name.value

                            })


                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data == "You are now registered") {
                                window.location.replace("signin.html")
                            }
                        })


                } else {
                    document.getElementById("invalid").style.display = "block"
                    document.getElementById("invalid").innerHTML = "Password does not match."
                    console.log("false")
                }

            } else {
                document.getElementById("invalid").style.display = "block"
                document.getElementById("invalid").innerHTML = "Email is already taken. try again."
                console.log("false")
            }
        })




}