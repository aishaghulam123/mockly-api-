function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightJson(jsonText) {
  const pattern = /("(?:\\.|[^\\"])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
  return escapeHtml(jsonText).replace(pattern, function (match, _all, colon) {
    let className = "json-number";
    if (match.startsWith('"')) {
      className = colon ? "json-key" : "json-string";
    } else if (match === "true" || match === "false") {
      className = "json-boolean";
    } else if (match === "null") {
      className = "json-null";
    }
    return '<span class="' + className + '">' + match + "</span>";
  });
}

function showJson(codeElement, jsonText) {
  codeElement.innerHTML = highlightJson(jsonText);
}


const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}


const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarLinks = document.getElementById("sidebarLinks");

if (sidebarToggle && sidebarLinks) {
  sidebarToggle.addEventListener("click", function () {
    const isOpen = sidebarLinks.classList.toggle("open");
    sidebarToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after choosing a section
  sidebarLinks.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      sidebarLinks.classList.remove("open");
      sidebarToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ---------- Highlight the active docs section while scrolling ----------

const sectionLinks = document.querySelectorAll("[data-section]");

function updateActiveSection() {
  if (sectionLinks.length === 0) return;

  let activeId = sectionLinks[0].dataset.section;
  const offset = 140;

  sectionLinks.forEach(function (link) {
    const section = document.getElementById(link.dataset.section);
    if (section && section.getBoundingClientRect().top <= offset) {
      activeId = link.dataset.section;
    }
  });

  // At the very bottom of the page the last section is active
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
    activeId = sectionLinks[sectionLinks.length - 1].dataset.section;
  }

  sectionLinks.forEach(function (link) {
    link.classList.toggle("active", link.dataset.section === activeId);
  });
}

if (sectionLinks.length > 0) {
  window.addEventListener("scroll", updateActiveSection, { passive: true });
  updateActiveSection();
}


document.querySelectorAll(".json-block").forEach(function (block) {
  if (block.textContent.trim() !== "") {
    showJson(block, block.textContent);
  }
});

// ---------- Copy buttons ----------

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise(function (resolve, reject) {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const worked = document.execCommand("copy");
    document.body.removeChild(helper);
    worked ? resolve() : reject();
  });
}

function flashButtonLabel(button, message) {
  const originalLabel = button.dataset.label || button.textContent;
  button.dataset.label = originalLabel;
  button.textContent = message;
  setTimeout(function () {
    button.textContent = originalLabel;
  }, 1500);
}

document.addEventListener("click", function (event) {
  const button = event.target.closest("[data-copy-text], .copy-btn");
  if (!button) return;

  let textToCopy = "";
  if (button.dataset.copyText) {
    textToCopy = button.dataset.copyText;
  } else if (button.dataset.copyTarget) {
    textToCopy = document.getElementById(button.dataset.copyTarget).textContent;
  } else {
    textToCopy = button.closest(".code-window").querySelector("code").textContent;
  }

  if (textToCopy.trim() === "") return;

  copyToClipboard(textToCopy)
    .then(function () { flashButtonLabel(button, "Copied!"); })
    .catch(function () { flashButtonLabel(button, "Copy failed"); });
});

function buildRequestUrl(form) {
  const basePath = form.dataset.path;

  if (form.dataset.type === "single") {
    const id = form.elements.id.value.trim();
    return id === "" ? null : basePath + "/" + encodeURIComponent(id);
  }

  const params = new URLSearchParams();
  if (form.elements.limit.value !== "") params.set("limit", form.elements.limit.value);
  if (form.elements.skip.value !== "") params.set("skip", form.elements.skip.value);
  const queryString = params.toString();
  return queryString ? basePath + "?" + queryString : basePath;
}

function setStatus(badge, text, state) {
  badge.textContent = text;
  badge.className = "status-badge " + state;
}

async function handleTryIt(form) {
  const result = form.querySelector(".try-result");
  const requestLabel = form.querySelector(".try-request");
  const statusBadge = form.querySelector(".status-badge");
  const output = form.querySelector(".try-output");
  const submitButton = form.querySelector("button[type='submit']");

  result.hidden = false;

  const requestUrl = buildRequestUrl(form);
  if (requestUrl === null) {
    requestLabel.textContent = "GET " + form.dataset.path + "/:id";
    setStatus(statusBadge, "Missing ID", "fail");
    output.textContent = "Please enter an ID, for example 1.";
    return;
  }

  requestLabel.textContent = "GET " + requestUrl;
  setStatus(statusBadge, "Loading...", "loading");
  output.textContent = "Loading...";
  submitButton.disabled = true;

  const startTime = performance.now();

  try {
    const response = await fetch(requestUrl);
    const responseText = await response.text();
    const milliseconds = Math.round(performance.now() - startTime);

    let prettyText = responseText;
    try {
      prettyText = JSON.stringify(JSON.parse(responseText), null, 2);
    } catch (parseError) {
    }

    const statusText = response.status + " " + (response.statusText || "") + " · " + milliseconds + " ms";
    setStatus(statusBadge, statusText.replace("  ", " "), response.ok ? "ok" : "fail");
    showJson(output, prettyText);
  } catch (networkError) {
    setStatus(statusBadge, "Request failed", "fail");
    output.textContent =
      "Could not reach the API. Check that the server is running and try again.\n\n(" + networkError.message + ")";
  } finally {
    submitButton.disabled = false;
  }
}

document.querySelectorAll(".try-form").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    handleTryIt(form);
  });
});
