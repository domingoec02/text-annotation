let fileList;
const fileSelector = document.getElementById('fileName');
    fileSelector.addEventListener('change', (event) => {
        fileList = event.target.files;
        console.log(fileList[0]);
    });
let type = ""
    
document.addEventListener("click", function(){
    const typeOfFile = document.getElementById("typeOfFile").value
    if(typeOfFile === "text"){
        document.getElementById("fileName").disabled = true;
        document.getElementById("submitButton").disabled = false;
        type = typeOfFile
    } else if(typeOfFile === "pdf"){
        document.getElementById("fileName").disabled = false;
        document.getElementById("submitButton").disabled = false;
        type = typeOfFile
    } else{
        document.getElementById("submitButton").disabled = true;
    }
})

function textFile(){
    
    console.log(typeOfFile)
    console.log("textFIle")
}
function submit(){
    console.log(type)
    if(type === "pdf"){
        localStorage.setItem("typeOfFile", "pdf")
        sessionStorage.setItem("fileName", `${fileList[0]['name']}`)
        const inpFile = document.getElementById('fileName')
        const formData = new FormData()
        formData.append('pdfFile', inpFile.files[0])
        fetch('https://project-text-annotation.herokuapp.com/get-pdf', {
            method: "POST",
            body: formData
        }).then(response => response.text())
        .then(data => {
            console.log(data)
            sessionStorage.setItem("text", data.trim())
            setTimeout(function() {
                window.location.href = "textannotation.html";
            }, 1000);     
        })
    } else if(type === "text"){
        localStorage.setItem("typeOfFile", "text")
        setTimeout(function() {
            window.location.href = "textannotation.html";
        }, 1000);
    }
}

