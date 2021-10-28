var _ = document.innerHTML;

const code = prompt("Enter the server's bakery name, not including the \"'s bakery\". (e.g. Red)", "")
const user = prompt("Enter username", "Guest")

const urls = {
    new: "https://cookiestorage.glitch.me/new?id=",
    update: "https://cookiestorage.glitch.me/update?",
    get: "https://cookiestorage.glitch.me/get?id="
}

function rebuild(x) {
    var split = x.toString().split(",")
    var newlist = []

    for (i in split) {
        var uname = split[i]
        if (!uname=="") {
            newlist.push(uname)
        }
    }

    return newlist.toString().replace(",", ", ")
}

if (code != null) {

    window.onbeforeunload = () => {
        fetch(`https://cookiestorage.glitch.me/leave?id=${code}&uname=${user}`)
        return null
    }

    var last = 0;
    var coop;

    fetch(`https://cookiestorage.glitch.me/join?id=${code}&uname=${user}`).then((_x)=>console.log(_x.text().then((nbody)=> {
        if (!nbody.startsWith("Error")) {
            var json = JSON.parse(nbody)
            var int = json.cookies
            coop = json.coop
            Game.Earn(int - Game.cookies)
            last = int

            if (coop) {
                document.getElementById("bakeryName").innerHTML = `${code} (${rebuild(json.players)})`
                var interval = setInterval(() => {
                    fetch(urls.update + "id=" + code + "&u=" + (Game.cookies - last).toString()).then((x)=>console.log(x.text().then((body)=> {
                        if (!body.startsWith("Error")) {
                            
                        } else {
                            alert("urls.update: " + body)
                        }
                        fetch(urls.get + code).then((_x)=>console.log(_x.text().then((nbody)=> {
                            if (!nbody.startsWith("Error")) {
                                console.log(nbody)
                                var json = JSON.parse(nbody)
                                var int = json.cookies
                                console.log(int, Game.cookies)
                                Game.Earn(int - Game.cookies)
                                last = int
                                document.getElementById("bakeryName").innerHTML = `${code} (${rebuild(json.players)})`
                            } else {
                                alert("urls.get: " + nbody)
                            }
                        })))
                    })))
                }, 4000);
            }
        } else {
            alert("urls.join: " + nbody)
        }
    })))
}

document.innerHTML = _;
