(function () {
  "use strict";

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const safeExternalUrl = (value) => {
    if (typeof value !== "string") return "";
    try {
      const url = new URL(value, window.location.href);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  };

  const safeImageUrl = (value) => {
    if (typeof value !== "string") return "";
    try {
      const url = new URL(value, window.location.href);
      return ["http:", "https:", "file:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  };

  const renderEvents = () => {
    const target = document.querySelector("#event-list");
    if (!target) return;

    const events = Array.isArray(window.CROLIN_EVENTS) ? window.CROLIN_EVENTS : [];
    if (!events.length) {
      target.innerHTML = '<p class="empty-state">Trenutno nema objavljenih događaja.</p>';
      return;
    }

    target.innerHTML = events.map((event) => {
      const url = safeExternalUrl(event.url);
      const logo = safeImageUrl(event.logo);
      const details = [event.location, event.description].filter(Boolean).map(escapeHtml).join(" · ");
      return `
        <article class="event-card">
          <div class="event-identity">
            ${logo ? `<div class="event-logo-wrap"><img class="event-logo" src="${escapeHtml(logo)}" alt="${escapeHtml(event.logoAlt || event.title || "Logo događaja")}"></div>` : ""}
            <time class="event-date" datetime="${escapeHtml(event.isoDate || "")}">${escapeHtml(event.date || "Datum uskoro")}</time>
          </div>
          <div>
            <h3>${escapeHtml(event.title || "Događaj")}</h3>
            ${details ? `<p>${details}</p>` : ""}
          </div>
          ${url ? `<a class="event-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">Detalji</a>` : ""}
        </article>`;
    }).join("");
  };

  const renderPublications = () => {
    const target = document.querySelector("#publication-list");
    if (!target) return;

    const publications = Array.isArray(window.CROLIN_PUBLICATIONS) ? window.CROLIN_PUBLICATIONS : [];
    if (!publications.length) {
      target.innerHTML = '<p class="empty-state">Rezultati projekta bit će objavljeni ovdje.</p>';
      return;
    }

    target.innerHTML = publications.map((publication, index) => {
      const url = safeExternalUrl(publication.url);
      const label = escapeHtml(publication.linkLabel || "Otvori publikaciju");
      const type = [publication.type, publication.date].filter(Boolean).map(escapeHtml).join(" · ");
      const title = escapeHtml(publication.title || "");
      const citation = escapeHtml(publication.citation || "");
      const description = escapeHtml(publication.description || "");
      return `
        <article class="publication-card">
          <span class="publication-number">${String(index + 1).padStart(2, "0")}</span>
          <div>
            ${type ? `<p class="publication-type">${type}</p>` : ""}
            ${title ? `<h3 class="publication-title">${title}</h3>` : ""}
            ${citation ? `<p class="publication-text">${citation}</p>` : ""}
            ${description ? `<p class="publication-description">${description}</p>` : ""}
            ${url ? `<a class="publication-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${label} ↗</a>` : ""}
          </div>
        </article>`;
    }).join("");
  };

  const setupNavigation = () => {
    const button = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    if (!button || !nav) return;

    const close = () => {
      button.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    };

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  };

  document.querySelector("#current-year").textContent = new Date().getFullYear();
  setupNavigation();
  renderEvents();
  renderPublications();
}());
