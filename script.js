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

  const renderEvents = () => {
    const target = document.querySelector("#event-list");
    if (!target) return;

    const events = Array.isArray(window.CROLIN_EVENTS) ? window.CROLIN_EVENTS : [];
    if (!events.length) {
      target.innerHTML = '<p class="empty-state">Trenutno nema najavljenih javnih događaja. Novi se događaj dodaje u <code>data/events.js</code>.</p>';
      return;
    }

    target.innerHTML = events.map((event) => {
      const url = safeExternalUrl(event.url);
      const details = [event.location, event.description].filter(Boolean).map(escapeHtml).join(" · ");
      return `
        <article class="event-card">
          <time class="event-date" datetime="${escapeHtml(event.isoDate || "")}">${escapeHtml(event.date || "Datum uskoro")}</time>
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
      target.innerHTML = '<p class="empty-state">Publikacije povezane s projektom bit će objavljene ovdje. Referencu je dovoljno dodati u <code>data/publications.js</code>.</p>';
      return;
    }

    target.innerHTML = publications.map((publication, index) => {
      const url = safeExternalUrl(publication.url);
      const label = escapeHtml(publication.linkLabel || "Otvori publikaciju");
      return `
        <article class="publication-card">
          <span class="publication-number">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <p class="publication-text">${escapeHtml(publication.citation || "")}</p>
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
