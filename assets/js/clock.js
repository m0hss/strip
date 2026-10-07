// ZULU clock. An enhancement: without JavaScript the header shows --:--:--.
(function () {
  var el = document.querySelector("[data-zulu]");
  if (!el) return;
  function pad(n) { return String(n).padStart(2, "0"); }
  function tick() {
    var d = new Date();
    var t = pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds());
    el.textContent = t;
    el.setAttribute("datetime", d.toISOString());
  }
  tick();
  setInterval(tick, 1000);
})();
