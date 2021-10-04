var _ = document.innerHTML;

var cco = () => {
var website = "https://cookieclickeronline.glitch.me/"
var last = 0
var playernames = ""

var prompts = () => {
    var prompts = {
        jc: document.querySelector('#cco_join').value,
        un: document.querySelector('#cco_name').value
    };
    if (prompts.jc) {
        if (prompts.un) return [true, prompts];
    } 
    return [false, null];
}

var rebuildNames = (x) => {
    var names = [];
    for (var i in x) {
        var name = x[i].replace("<", " ").replace(">", " ");
        names.push(name)
    }

    return names.toString().replace(",", "<br>")
}

var mainGet = (json) => {
    if (json.Players == 1) document.querySelector("#bakeryName").innerHTML = `${json.Name} (${json.Players.toString()} Player)`;
    else document.querySelector("#bakeryName").innerHTML = `${json.Name} (${json.Players.toString()} Players)`;
    Game.Earn(json.Cookies - Game.cookies)
    last = json.Cookies
    playernames = rebuildNames(json.PlayerNames);
}

var get = (site) => {
    fetch(site).then((res) => res.json().then((json) => mainGet(json)));
}

var [ p_success, p_info ] = prompts();

var setup = () => Game.Reset(true);

Game.ClosePrompt()

if (p_success) {

    onbeforeunload = () => {
        fetch(`${website}users/leave/${p_info.jc}~${p_info.un}`);
        return null;
    };

    get(`${website}users/join/${p_info.jc}~${p_info.un}`);
    
    const interval = 4000; // Balanced (Comfortable for rate limit)

    var NetInterval = setInterval(() => {
        get(`${website}backend/upload?id=${p_info.jc}&c=${Game.cookies - last}`)
    }, interval);

    document.querySelector("#bakeryName").onclick = () => Game.Prompt(`<br><b>Cookie Clicker Online by RedBigz</b><br><br><hr><br><i>Player List</i><br><br>${playernames}<br><br><hr><br><i>About</i><br><br><b>Cookie Clicker Online</b><br><i>by RedBigz</i><br><br>@RedBigz on Glitch<br>cookieclickeronline.glitch.me/<br><br>`, [["Leave Multiplayer", "window.location.reload()"]]);
}
}
var p = () => Game.Prompt("<b>Cookie Clicker Online by RedBigz</b><hr><br><table><tr><th>Join ID</th><th>Name</th></tr><tr><td><input id=\'cco_join\'></td><td><input id='cco_name'></td></tr></table>", [["Join", "cco()"]]);
document.querySelector("#storeTitle").innerHTML = `<div id='onlinebox' style="border: none; border-radius: 5px;n "></div><br><br>${document.querySelector("#storeTitle").innerHTML}`
document.querySelector("#onlinebox").innerHTML = '<button style="background-color: white; border: 1px solid grey; border-radius: 4px; width: 100%;" onclick="p()">Play Online</button><br><br>'

document.innerHTML = _;
