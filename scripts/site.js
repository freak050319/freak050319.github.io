(function () {
  const data = window.PORTFOLIO_CONTENT || {};
  const page = document.body.dataset.page;

  const get = (path) => path.split(".").reduce((obj, key) => (obj ? obj[key] : ""), data);
  function setBindings() {
    document.querySelectorAll("[data-bind]").forEach((node) => {
      const value = get(node.dataset.bind);
      if (value !== undefined && value !== null) node.textContent = value;
    });

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

    if (!data.projects?.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "内容整理中";
      grid.appendChild(empty);
      return;
    }

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

    if (!data.projects?.length) {
      document.title = "内容整理中 - " + data.site.name + " / " + data.site.handle;
      const title = document.createElement("h1");
      title.textContent = "内容整理中";
      const message = document.createElement("p");
      message.textContent = "这里暂时还没有公开的项目记录。";
      container.append(title, message);
      return;
    }

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
      ["起点", project.detail.start || project.detail.context],
      ["过程", project.detail.process],
      ["片段", project.detail.fragments || project.detail.role],
      ["回顾", project.detail.reflection || project.detail.result]
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
