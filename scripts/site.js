(function () {
  const data = window.PORTFOLIO_CONTENT || {};
  const page = document.body.dataset.page;

  const get = (path) => path.split(".").reduce((obj, key) => (obj ? obj[key] : ""), data);
  const text = (value) => document.createTextNode(value || "");

  function setBindings() {
    document.querySelectorAll("[data-bind]").forEach((node) => {
      const value = get(node.dataset.bind);
      if (value !== undefined && value !== null) node.textContent = value;
    });

    const resume = document.querySelector("[data-resume-link]");
    if (resume && data.site?.resumeUrl) {
      resume.href = data.site.resumeUrl;
    }

    document.querySelectorAll("[data-nav]").forEach((link) => {
      const key = link.dataset.nav;
      if (key === page || (page === "project" && key === "works")) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function createTag(label) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = label;
    return tag;
  }

  function renderProjects() {
    const grid = document.getElementById("projectGrid");
    if (!grid) return;

    data.projects.forEach((project, index) => {
      const article = document.createElement("article");
      article.className = "project-card reveal";
      article.style.setProperty("--delay", String(index * 80) + "ms");

      const image = document.createElement("img");
      image.src = project.cover;
      image.alt = "";

      const meta = document.createElement("p");
      meta.className = "project-meta";
      meta.textContent = project.category + " / " + project.year + " / " + project.status;

      const title = document.createElement("h2");
      title.textContent = project.title;

      const summary = document.createElement("p");
      summary.textContent = project.summary;

      const tags = document.createElement("div");
      tags.className = "tag-list";
      project.tags.forEach((tag) => tags.appendChild(createTag(tag)));

      const link = document.createElement("a");
      link.className = "button ghost";
      link.href = "project.html?id=" + encodeURIComponent(project.id);
      link.textContent = "查看详情";

      article.append(image, meta, title, summary, tags, link);
      grid.appendChild(article);
    });
  }

  function renderProjectDetail() {
    const container = document.getElementById("projectDetail");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || data.projects?.[0]?.id;
    const project = data.projects.find((item) => item.id === id) || data.projects[0];

    document.title = project.title + " - " + data.site.name + " / " + data.site.handle;

    const hero = document.createElement("header");
    hero.className = "detail-hero";

    const image = document.createElement("img");
    image.src = project.cover;
    image.alt = "";

    const copy = document.createElement("div");
    const meta = document.createElement("p");
    meta.className = "eyebrow";
    meta.textContent = project.category + " / " + project.year;
    const title = document.createElement("h1");
    title.textContent = project.title;
    const summary = document.createElement("p");
    summary.textContent = project.summary;
    const tags = document.createElement("div");
    tags.className = "tag-list";
    project.tags.forEach((tag) => tags.appendChild(createTag(tag)));
    copy.append(meta, title, summary, tags);
    hero.append(image, copy);

    const sections = [
      ["项目背景", project.detail.context],
      ["我的职责", project.detail.role],
      ["过程整理", project.detail.process],
      ["结果复盘", project.detail.result]
    ];

    const body = document.createElement("div");
    body.className = "detail-sections";
    sections.forEach(([heading, content]) => {
      const section = document.createElement("section");
      section.className = "content-block";
      const h2 = document.createElement("h2");
      h2.textContent = heading;
      const p = document.createElement("p");
      p.textContent = content;
      section.append(h2, p);
      body.appendChild(section);
    });

    container.append(hero, body);
  }

  function renderProfile() {
    const focus = document.getElementById("focusList");
    if (focus) data.profile.focus.forEach((item) => focus.appendChild(createTag(item)));

    const links = document.getElementById("profileLinks");
    if (links) {
      data.contact.methods.forEach((method) => {
        const link = document.createElement("a");
        link.href = method.href;
        link.textContent = method.label + " / " + method.value;
        links.appendChild(link);
      });
    }

    const intro = document.getElementById("introText");
    if (intro) {
      data.profile.intro.forEach((line) => {
        const p = document.createElement("p");
        p.textContent = line;
        intro.appendChild(p);
      });
    }

    renderTimeline("experienceList", data.profile.experience);
    renderTimeline("educationList", data.profile.education);
    renderSkills();
  }

  function renderTimeline(id, items) {
    const container = document.getElementById(id);
    if (!container) return;

    items.forEach((item) => {
      const row = document.createElement("article");
      row.className = "timeline-row";
      const period = document.createElement("time");
      period.textContent = item.period;
      const copy = document.createElement("div");
      const title = document.createElement("h3");
      title.textContent = item.title;
      const place = document.createElement("p");
      place.className = "muted";
      place.textContent = item.place;
      const detail = document.createElement("p");
      detail.textContent = item.detail;
      copy.append(title, place, detail);
      row.append(period, copy);
      container.appendChild(row);
    });
  }

  function renderSkills() {
    const container = document.getElementById("skillsList");
    if (!container) return;

    data.profile.skills.forEach((group) => {
      const column = document.createElement("section");
      const h3 = document.createElement("h3");
      h3.textContent = group.group;
      const list = document.createElement("ul");
      group.items.forEach((item) => {
        const li = document.createElement("li");
        li.appendChild(text(item));
        list.appendChild(li);
      });
      column.append(h3, list);
      container.appendChild(column);
    });
  }

  function renderContact() {
    const methods = document.getElementById("contactMethods");
    if (methods) {
      data.contact.methods.forEach((method) => {
        const link = document.createElement("a");
        link.className = "contact-method";
        link.href = method.href;
        const label = document.createElement("span");
        label.textContent = method.label;
        const value = document.createElement("strong");
        value.textContent = method.value;
        link.append(label, value);
        methods.appendChild(link);
      });
    }

    const form = document.getElementById("contactForm");
    if (!form) return;

    const emailMethod = data.contact.methods.find((method) => method.href.startsWith("mailto:"));
    const fallbackEmail = emailMethod ? emailMethod.href.replace("mailto:", "") : "";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
      const subject = encodeURIComponent("来自作品集网站的联系 - " + name);
      const body = encodeURIComponent("称呼：" + name + "\n邮箱：" + email + "\n\n" + message);
      window.location.href = "mailto:" + fallbackEmail + "?subject=" + subject + "&body=" + body;
    });
  }

  function setupAnalytics() {
    const domain = data.site?.analytics?.plausibleDomain?.trim();
    if (!domain) return;

    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = domain;
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
  }

  function boot() {
    setBindings();
    renderProjects();
    renderProjectDetail();
    renderProfile();
    renderContact();
    setupAnalytics();
    requestAnimationFrame(() => document.body.classList.add("is-ready"));
  }

  boot();
})();
