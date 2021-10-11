class Online {
  constructor(code, overrideWebsite) {
    // Initialize Website
    if (overrideWebsite) this.site = overrideWebsite;
    else this.site = "cookieclickeronline.glitch.me";

    this.joinCode = code; // Store Join Code
    this.last = 0 // Used for contribution to server
    upload(`${this.site}`)
  }

  async upload(url) {
    var res = await fetch(url);
    var json = await res.json()
    this.sData = json
  }
}
