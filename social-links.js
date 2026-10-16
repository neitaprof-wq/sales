(function () {
  var config = window.SITE_CONFIG || {};
  var facebookUrl = config.facebookUrl;
  if (!facebookUrl) return;

  var facebookIcon =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" style="flex-shrink:0;fill:currentColor">' +
    '<path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/>' +
    "</svg>";

  function createFacebookLink(text) {
    var link = document.createElement("a");
    link.href = facebookUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = text;
    return link;
  }

  function addFooterLink() {
    document.querySelectorAll("footer").forEach(function (footer) {
      if (footer.querySelector("[data-facebook-follow]")) return;
      var container = footer.querySelector(".wrap") || footer;
      var wrapper = document.createElement("p");
      wrapper.setAttribute("data-facebook-follow", "");
      wrapper.style.margin = "16px 0";
      var link = createFacebookLink("Follow us on Facebook");
      link.style.display = "inline-flex";
      link.style.alignItems = "center";
      link.style.gap = "8px";
      link.style.color = "inherit";
      link.insertAdjacentHTML("afterbegin", facebookIcon);
      wrapper.appendChild(link);
      var bottom = container.querySelector(".footer-bottom");
      if (bottom) container.insertBefore(wrapper, bottom);
      else container.appendChild(wrapper);
    });
  }

  function isBlogPost() {
    if (!/^\/blog\/.+/.test(location.pathname) || /\/blog\/(index\.html)?$/.test(location.pathname)) return false;
    var schemas = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < schemas.length; i++) {
      if (/"@type"\s*:\s*"(Article|BlogPosting)"/.test(schemas[i].textContent)) return true;
    }
    return false;
  }

  function addBlogPostLine() {
    if (!isBlogPost() || document.querySelector("[data-facebook-post-line]")) return;
    var line = document.createElement("p");
    line.setAttribute("data-facebook-post-line", "");
    line.appendChild(createFacebookLink("See more copier moves on our Facebook page"));

    var ctaBand = document.querySelector("section.cta-band");
    if (ctaBand && ctaBand.previousElementSibling) {
      var content = ctaBand.previousElementSibling;
      var contentHeadings = content.querySelectorAll("h2");
      var host = contentHeadings.length ? contentHeadings[contentHeadings.length - 1].parentNode : content;
      host.appendChild(line);
      return;
    }

    var article = document.querySelector("article");
    if (!article) return;
    var headings = article.querySelectorAll("h2");
    var closingHeading = headings[headings.length - 1];
    if (closingHeading) closingHeading.parentNode.insertBefore(line, closingHeading);
    else (article.querySelector(":scope > div") || article).appendChild(line);
  }

  var floatingStyles =
    ".fb-float{position:fixed;left:24px;bottom:24px;z-index:90;display:flex;flex-direction:column;align-items:center;gap:6px;text-decoration:none;}" +
    ".fb-float-circle{position:relative;width:60px;height:60px;border-radius:50%;background:#1877F2;color:#fff;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 6px 18px rgba(0,0,0,.28);transition:transform .2s ease;}" +
    ".fb-float-circle::before{content:'';position:absolute;inset:-2px;border-radius:50%;background:#1877F2;z-index:-1;animation:fb-float-pulse 2.4s ease-out infinite;}" +
    ".fb-float-circle svg{width:30px;height:30px;fill:currentColor;display:block;}" +
    ".fb-float-label{background:#1877F2;color:#fff;font-size:12px;font-weight:700;line-height:1;padding:5px 10px;border-radius:999px;box-shadow:0 2px 8px rgba(0,0,0,.2);white-space:nowrap;}" +
    ".fb-float:hover .fb-float-circle,.fb-float:focus-visible .fb-float-circle{transform:scale(1.06);}" +
    ".fb-float:focus-visible{outline:3px solid #1877F2;outline-offset:4px;border-radius:12px;}" +
    "@keyframes fb-float-pulse{0%{transform:scale(1);opacity:.55;}80%,100%{transform:scale(1.6);opacity:0;}}" +
    "@media (max-width:860px){.fb-float{left:16px;bottom:80px;}}" +
    "@media (prefers-reduced-motion:reduce){.fb-float-circle::before{animation:none;opacity:0;}.fb-float-circle{transition:none;}}";

  function clearBottomLeftBars(button) {
    var bars = document.querySelectorAll(".mobile-bar");
    var offset = 0;
    bars.forEach(function (bar) {
      var style = getComputedStyle(bar);
      if (style.display === "none" || style.position !== "fixed") return;
      offset = Math.max(offset, bar.getBoundingClientRect().height);
    });
    button.style.bottom = offset ? Math.max(80, offset + 24) + "px" : "";
  }

  function addFloatingButton() {
    if (document.querySelector("[data-facebook-float]")) return;
    var style = document.createElement("style");
    style.textContent = floatingStyles;
    document.head.appendChild(style);

    var button = document.createElement("a");
    button.className = "fb-float";
    button.setAttribute("data-facebook-float", "");
    button.href = facebookUrl;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.setAttribute("aria-label", "USA Copier Movers on Facebook");
    button.innerHTML =
      '<span class="fb-float-circle" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" focusable="false"><path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.03.28-1.73 1.76-1.73z"/></svg>' +
      "</span>" +
      '<span class="fb-float-label" aria-hidden="true">Follow us</span>';
    document.body.appendChild(button);

    clearBottomLeftBars(button);
    window.addEventListener("resize", function () {
      clearBottomLeftBars(button);
    });
  }

  function init() {
    addFooterLink();
    addBlogPostLine();
    addFloatingButton();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
