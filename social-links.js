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

  function init() {
    addFooterLink();
    addBlogPostLine();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
