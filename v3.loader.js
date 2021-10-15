

function bindPrompt(opt, func) {
	document.getElementById("promptOption" + opt.toString()).onclick = func;
}

function pl(al, val) {
	Game.Prompt(`
		<b>———— Cookie Clicker Online ————</b><br>
		By <b>RedBigz</b><br><br><hr><br>
		<b>Plugin Loader</b><br><br>
		<input style="text-align: center;" placeholder="Github Repository" id="ghrepo"><br><br>
	`, al);
	
	document.querySelector("#ghrepo").value = val

	bindPrompt(0, () => {
		var val = document.querySelector("#ghrepo").value;
		var link = `https://raw.githubusercontent.com/${val}/main/`;

		fetch(link + "lib.js").then(x => x.text().then(res => {
			window.v3Lib = eval(res + "\nv3Lib;");
			fetch(link + "client.js").then(x => x.text().then(res => {
				window.OnlineClientLoader_Client = eval(res + "\nOnlineClientLoader_Client;");
			}));
		}));
		
		pl(["Load", "Run"], document.querySelector("#ghrepo").value);
	});
	
	if (al.length > 1) bindPrompt(1, () => { if (window.OnlineClientLoader_Client) { new OnlineClientLoader_Client(); Game.ClosePrompt(); } });
}

pl(["Load"], "");
