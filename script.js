/* AEM Backend Training — shared behavior */
(function () {
  "use strict";

  var STORAGE_KEY = "aem-training-progress";
  var ALL_MODULES = [
    "java-primer",
    "arch-overview",
    "jcr-repository",
    "sling-framework",
    "osgi-services",
    "osgi-services-config",
    "sling-models",
    "sling-models-advanced",
    "model-composition",
    "htl-templating",
    "servlets-apis",
    "dialogs-components",
    "custom-components",
    "java-pitfalls",
    "unit-testing",
    "context-aware-config",
    "workflows-events",
    "workflow-design",
    "sling-jobs",
    "dispatcher-deployment",
    "groovy-console",
    "acs-commons",
    "adaptive-forms",
    "form-fragments",
    "forms-implementation",
    "adobe-tags-setup",
    "adobe-tags-implement",
    "analytics-workspaces",
    "site-capstone",
    "aem-devops",
    "side-fun"
  ];

  function getProgress() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function setProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) { /* storage unavailable, fail silently */ }
  }

  function applyProgressToTree(progress) {
    document.querySelectorAll("[data-module-id]").forEach(function (el) {
      var id = el.getAttribute("data-module-id");
      if (progress[id]) {
        el.classList.add("complete");
      } else {
        el.classList.remove("complete");
      }
    });

    var completedCount = ALL_MODULES.filter(function (id) { return progress[id]; }).length;
    var pill = document.querySelector("[data-progress-pill]");
    if (pill) {
      pill.textContent = completedCount + " / " + ALL_MODULES.length + " modules";
    }
    var bar = document.querySelector("[data-progress-bar]");
    if (bar) {
      var pct = Math.round((completedCount / ALL_MODULES.length) * 100);
      bar.style.width = pct + "%";
    }
    var label = document.querySelector("[data-progress-label]");
    if (label) {
      label.textContent = completedCount + " of " + ALL_MODULES.length + " modules complete";
    }
    document.querySelectorAll("[data-status-for]").forEach(function (el) {
      var id = el.getAttribute("data-status-for");
      if (progress[id]) {
        el.textContent = "Done";
        el.classList.remove("available");
        el.classList.add("done");
      }
    });
  }

  function initCompleteCheckbox() {
    var checkbox = document.querySelector("[data-complete-checkbox]");
    if (!checkbox) return;
    var moduleId = checkbox.getAttribute("data-complete-checkbox");
    var progress = getProgress();
    checkbox.checked = !!progress[moduleId];
    checkbox.addEventListener("change", function () {
      var p = getProgress();
      if (checkbox.checked) {
        p[moduleId] = true;
      } else {
        delete p[moduleId];
      }
      setProgress(p);
      applyProgressToTree(p);
    });
  }

  function initMobileNav() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var sidebar = document.querySelector(".sidebar");
    if (!toggle || !sidebar) return;
    toggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
    sidebar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        sidebar.classList.remove("open");
      });
    });
    document.addEventListener("click", function (e) {
      if (sidebar.classList.contains("open") &&
          !sidebar.contains(e.target) &&
          !toggle.contains(e.target)) {
        sidebar.classList.remove("open");
      }
    });
  }

  function initCopyButtons() {
    document.querySelectorAll("pre[data-code]").forEach(function (pre) {
      var btn = document.createElement("button");
      btn.className = "copy-btn btn btn-sm";
      btn.type = "button";
      btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        var codeEl = pre.querySelector("code");
        var text = codeEl ? codeEl.textContent : pre.textContent;
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = "Copied";
          setTimeout(function () { btn.textContent = "Copy"; }, 1500);
        });
      });
      pre.appendChild(btn);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var progress = getProgress();
    applyProgressToTree(progress);
    initCompleteCheckbox();
    initMobileNav();
    initCopyButtons();
  });
})();
