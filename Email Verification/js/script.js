console.log("This is my script")


let result = {
    
        "tag": "",
        "free": true,
        "role": false,
        "user": "mohsinroyal24",
        "email": "mohsinroyal24@gmail.com",
        "score": 0.64,
        "state": "deliverable",
        "domain": "gmail.com",
        "reason": "valid_mailbox",
        "mx_found": true,
        "catch_all": null,
        "disposable": false,
        "smtp_check": true,
        "did_you_mean": "",
        "format_valid": true
}

let str = ``
for (key of Object.keys(result)){
    str = str + `<div>${key}: ${result[key]}</div>`
}

resultCont.innerHTML = str