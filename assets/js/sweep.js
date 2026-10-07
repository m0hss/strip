// Radar sweep. Every strip is already in the page; this only narrows the
// list. Without JavaScript the form reloads the page with ?q= and the full
// list stays visible.
(function () {
  var form = document.querySelector("[data-sweep]");
  if (!form) return;
  var input = form.querySelector("input[type=search]");
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-sweep-item]"));
  var status = document.querySelector("[data-sweep-status]");
  var noJs = document.querySelector("[data-sweep-nojs]");
  if (noJs) noJs.hidden = true;

  function sweep() {
    var q = input.value.trim().toLowerCase();
    var shown = 0;
    items.forEach(function (li) {
      var hit = !q || li.getAttribute("data-sweep-item").indexOf(q) !== -1;
      li.hidden = !hit;
      if (hit) shown++;
    });
    if (status) {
      status.textContent = shown === 0
        ? status.getAttribute("data-none")
        : shown === 1
          ? status.getAttribute("data-one")
          : status.getAttribute("data-count").replace("{n}", shown);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var url = new URL(window.location.href);
    if (input.value.trim()) url.searchParams.set("q", input.value.trim());
    else url.searchParams.delete("q");
    history.replaceState(null, "", url);
    sweep();
  });
  input.addEventListener("input", sweep);

  var q = new URLSearchParams(window.location.search).get("q");
  if (q) input.value = q;
  sweep();
})();
