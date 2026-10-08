// ZULU clock. An enhancement: without JavaScript the header shows --:--:--.
// The placeholder is a <span>; the first tick replaces it with a <time> that
// carries a datetime. Each tick is scheduled for just after the next whole
// second, so the clock neither drifts nor skips a second.
(function () {
  var placeholder = document.querySelector("[data-zulu]");
  if (!placeholder) return;
  var el = document.createElement("time");
  placeholder.replaceWith(el);
  function pad(n) { return String(n).padStart(2, "0"); }
  function tick() {
    var d = new Date();
    el.textContent = pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds());
    el.setAttribute("datetime", d.toISOString());
    setTimeout(tick, 1000 - (Date.now() % 1000));
  }
  tick();
})();
