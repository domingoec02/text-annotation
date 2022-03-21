


fetch('https://project-text-annotation.herokuapp.com/get-libraries' ,{
    method: "GET"
})
.then(response => response.json())
.then(lib => {
    lib.map(library => {
        const {name, html} = library

        let btn = document.createElement("button")
        btn.innerHTML = name
        btn.className = "d-block mx-auto w-100 libraryButtons"
        btn.onclick = function(){
            document.getElementById("inputTextArea").style.display = "none"
            document.getElementById("text-area").style.display = "block"
            document.getElementById("buttons1").style.visibility = "visible"
            document.getElementById('titleOfFile').style.visibility = "visible"
            document.getElementById('docTitle').innerHTML= name
            document.getElementById("text-area").innerHTML = html
        }
        document.getElementById("collapseOne").appendChild(btn);
    })
})
function summarize(){
    let types = localStorage.getItem('typeOfFile')
    let text = ""
    if(types == "pdf"){
        text = sessionStorage.getItem('text')
        text = text.replaceAll("\n", " ")
        text = text.replaceAll("\r", " ")
        text = text.replaceAll("\"", " ")
    } else{
        text = document.getElementById('text-area').value
    }
    console.log(text)

    fetch("https://project-text-annotation.herokuapp.com/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            paragraph: text
        })
    })
    .then(response => response.json())
    .then(data => {
        
        document.getElementById("text-area").value = data;
        document.getElementById("text-area").innerHTML = data
        console.log(document.getElementById("text-area").value)
        setTimeout(() => {
        console.log(document.getElementById("text-area").value)
            fetch("https://project-text-annotation.herokuapp.com/annotate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: document.getElementById("text-area").value,
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById("text-area").innerHTML = data
            })
        }, 300)
    })
    
}



let data = []
let text = ""
let personData = ""
let dateData = ""
let locationData = ""
let topicData = ""
let importantData = ""
let personArr, dateArr, locationArr, topicArr = [];


function person(){
    

    if(text != ""){
        let personObj = {
            entity: "person",
            key: text,
            color: "pink"
        }
        data.push(personObj)
        annotation()
    }
    text = ''

    if(personArr.length > 0){
        let countPerson = 1;
        personArr.map(ps => {
            let p =document.createElement("h5")
            p.innerHTML = ps
            p.setAttribute("id", `person${countPerson}`)
            // p.className = ""
            countPerson++
            document.getElementById("personCategory").appendChild(p);
        })
    }
    document.getElementById("personc1").style.display = "none"
    console.log()
}
function date(){
    if(text != ""){
        let dateObj = {
            entity: "date",
            key: text,
            color: "pink"
        }
        data.push(dateObj)
        annotation()
    }
    text = ''
    
}
function loc(){
    if(text != ""){
        let locObj = {
            entity: "location",
            key: text,
            color: "pink"
        }
        data.push(locObj)
        annotation()
    }
    text = ''
    
}
function topic(){
    if(text != ""){
        let topicObj = {
            entity: "topic",
            key: text,
            color: "pink"
        }
        data.push(topicObj)
        annotation()
    }
    text = ''
    
}
function important(){
    if(text != ""){
        let importantObj = {
            entity: "important",
            key: text,
            color: "pink"
        }
        data.push(importantObj)
        annotation()
    }
    text = ''
}
const selectableTextArea = document.querySelectorAll(".text-area")
selectableTextArea.forEach(elem => {
    elem.addEventListener("mouseup", selectedTextArea)
})
function selectedTextArea(event){
    const selectedText = window.getSelection().toString()
    text = selectedText
} 
function annotation(){
    personArr = data.map(texts => {
        const {entity, key, color} = texts
        if(entity === "person"){
            return key
        } 
    })
    locationArr = data.map(texts => {
        const {entity, key, color} = texts
        if(entity === "location"){
            return key
        } 
    })
    dateArr = data.map(texts => {
        const {entity, key, color} = texts
        if(entity === "date"){
            return key
        } 
    })
    topicArr = data.map(texts => {
        const {entity, key, color} = texts
        if(entity === "topic"){
            return key
        } 
    })
    let importantArr = data.map(texts => {
        const {entity, key, color} = texts
        if(entity === "important"){
            return key
        } 
    })
    
    if(personArr.length > 0){
        for(let i = 0; i < personArr.length; i++){
            if(i === 0){
                personData += "/"
            } 
            personData += personArr[i] + "|"
            if(i === personArr.length-1){
                personData += "/"
            }
            
        }
    }
    if(locationArr.length > 0){
        for(let i = 0; i < locationArr.length; i++){
            if(i === 0){
                locationData += "/"
            } 
            locationData += locationArr[i] + "|"
            if(i === locationArr.length-1){
                locationData += "/"
            }
            
        }
    }
    if(dateArr.length > 0){
        for(let i = 0; i < dateArr.length; i++){
            if(i === 0){
                dateData += "/"
            } 
            dateData += dateArr[i] + "|"
            if(i === dateArr.length-1){
                dateData += "/"
            }
            
        }
    }
    if(topicArr.length > 0){
        for(let i = 0; i < topicArr.length; i++){
            if(i === 0){
                topicData += "/"
            } 
            topicData += topicArr[i] + "|"
            if(i === topicArr.length-1){
                topicData += "/"
            }
            
        }
    }
    if(importantArr.length > 0){
        for(let i = 0; i < importantArr.length; i++){
            if(i === 0){
                importantData += "/"
            } 
            importantData += importantArr[i] + "|"
            if(i === importantArr.length-1){
                importantData += "/"
            }
            
        }
    }
    personArr = [...new Set(personArr)];
    dateArr = [...new Set(dateArr)];
    locationArr = [...new Set(locationArr)];
    topicArr = [...new Set(topicArr)];
    const text1 = document.getElementById("text-area");
    // text1 = text1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const special = /[\\[{().+*?|^$]/g;
        console.log(personArr)
    
    let regExp1 = new RegExp(personData+locationData+dateData+topicData+importantData, "gi")
    text1.innerHTML = (text1.textContent).replace(regExp1,match => {
        for(let i = 0; i < locationArr.length; i++){
            console.log(locationArr[i])
            if(match === locationArr[i]){
                return `<span style="background-color: green; color: white; font-size: 18px">${match}<span style="background-color: white; font-size: 10px; color: green" class="badge m-2 p-1"><span id="loc"></span></span></span>`
            }
        }
        for(let i = 0; i < personArr.length; i++){
            if(match === personArr[i]){
                return `<span id="personValue" style="background-color: pink; color: white; font-size: 18px">${match}<span style="background-color: white; font-size: 10px; color: pink" class="badge m-2 p-1"><span id="prsn"></span></span></span>`
            }
        }
        for(let i = 0; i < dateArr.length; i++){
            if(match === dateArr[i]){
                return `<span style="background-color: #E3963E; color: white; font-size: 18px">${match}<span style="background-color: white; font-size: 10px; color: #E3963E" class="badge m-2 p-1"><span id="deyt"></span></span></span>`
            }
        }
        for(let i = 0; i < topicArr.length; i++){
            if(match === topicArr[i]){
                return `<span style="background-color: red; color: white; font-size: 18px">${match}<span style="background-color: white; font-size: 10px; color: red" class="badge m-2 p-1"><span id="tpic"></span></span></span>`
            }
        }
        for(let i = 0; i < importantArr.length; i++){
            if(match === importantArr[i]){
                return `<span style="background-color: blue; color: white; font-size: 18px">${match}<span style="background-color: white; font-size: 10px; color: blue;" class="badge m-2 p-1"><span id="imprtnt"></span></span></span>`
            }
        }
        
        
    })
}
const typeOfFile = localStorage.getItem("typeOfFile")
if(typeOfFile === "text"){
    document.getElementById("inputTextArea").style.display = "block"
    document.getElementById("text-area").style.display = "none"
    document.getElementById('titleOfFile').style.visibility = "hidden"
    document.getElementById("buttons1").style.visibility = "hidden"
    
} else if(typeOfFile === "pdf"){
        let pdfText = sessionStorage.getItem('text')
        let fname = sessionStorage.getItem('fileName')
        fname = fname.replace('.pdf', "")
        document.getElementById('docTitle').innerHTML = fname
        document.getElementById('text-area').innerHTML = pdfText
        setTimeout(() => {
            fetch("https://project-text-annotation.herokuapp.com/annotate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: pdfText,
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.getElementById("text-area").innerHTML = data
            })
        }, 300)

}
function annotate(){
    const valueOfInputText = document.getElementById("inputText").value
    document.getElementById("inputTextArea").style.display = "none"
    document.getElementById("text-area").style.display = "block"
    document.getElementById("buttons1").style.visibility = "visible"
    document.getElementById('titleOfFile').style.visibility = "visible"
    document.getElementById("text-area").value = valueOfInputText
    document.getElementById("text-area").innerHTML = valueOfInputText
    document.getElementById('docTitle').innerHTML = "New Tab"
    setTimeout(() => {
        fetch("https://project-text-annotation.herokuapp.com/annotate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: document.getElementById("text-area").value,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById("text-area").innerHTML = data
        })
    }, 300)
}
function saveButton(){
    fetch("https://project-text-annotation.herokuapp.com/library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("exampleInputEmail1").value,
            html: document.getElementById("text-area").innerHTML
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
}





 