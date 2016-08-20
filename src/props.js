function Props() {
    var full = (Math.min(window.innerWidth, window.innerHeight) * 0.85);
    full = (full <= 450) ? full : 450;
    this.gap = Math.round(full/45);
    this.size = this.gap * 45;
    this.marginLeft = Math.round((window.innerWidth - this.size)/2);
    this.marginTop = Math.round((window.innerHeight - this.size)/2);
    this.tile = this.gap * 10;
}
