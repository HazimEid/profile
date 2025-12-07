const contentFiles = {
    ar: "content/content-ar.json",
    en: "content/content-en.json"
};

let currentLang = "ar";

async function loadContent(lang = "ar") {
    try {
        const response = await fetch(contentFiles[lang]);
        const data = await response.json();

        currentLang = lang;

        // إعداد اتجاه اللغة
        document.documentElement.lang = data.lang || lang;
        document.documentElement.dir = data.direction || (lang === "ar" ? "rtl" : "ltr");

        // تعبئة العناصر من JSON
        document.getElementById("tagline-badge").textContent = data.tagline || "";
        document.getElementById("name").textContent = data.name || "";
        document.getElementById("title").textContent = data.title || "";
        document.getElementById("intro").textContent = data.intro || "";

        document.getElementById("primary-cta").textContent = data.primaryCta || "";
        document.getElementById("secondary-cta").textContent = data.secondaryCta || "";

        // عني
        if (data.about) {
            document.getElementById("about-heading").textContent = data.about.heading || "";
            document.getElementById("about-body").textContent = data.about.body || "";
        }

        // المهارات
        const skillsHeading = document.getElementById("skills-heading");
        const skillsList = document.getElementById("skills-list");
        skillsList.innerHTML = "";
        if (data.skills) {
            skillsHeading.textContent = data.skills.heading || "";
            (data.skills.items || []).forEach((item) => {
                const li = document.createElement("li");
                li.textContent = "• " + item;
                skillsList.appendChild(li);
            });
        }

        // المشاريع
        const projectsHeading = document.getElementById("projects-heading");
        const projectsContainer = document.getElementById("projects-container");
        projectsContainer.innerHTML = "";
        if (data.projects) {
            projectsHeading.textContent = data.projects.heading || "";
            (data.projects.items || []).forEach((proj) => {
                const col = document.createElement("div");
                col.className = "col-md-6";

                const card = document.createElement("div");
                card.className = "project-card";

                const title = document.createElement("h4");
                title.className = "project-title";
                title.textContent = proj.title || "";

                const desc = document.createElement("p");
                desc.textContent = proj.description || "";

                const tech = document.createElement("p");
                tech.className = "project-tech";
                tech.textContent = proj.tech || "";

                card.appendChild(title);
                card.appendChild(desc);
                card.appendChild(tech);
                col.appendChild(card);
                projectsContainer.appendChild(col);
            });
        }

        // التواصل
        const contactHeading = document.getElementById("contact-heading");
        const contactList = document.getElementById("contact-list");
        contactList.innerHTML = "";
        if (data.contact) {
            contactHeading.textContent = data.contact.heading || "";
            (data.contact.items || []).forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item;
                contactList.appendChild(li);
            });
        }

        // الفوتر
        document.getElementById("footer-text").textContent = data.footer || "";
    } catch (error) {
        console.error("Error loading content:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // تحميل العربي كافتراضي
    loadContent("ar");

    // أزرار اختيار اللغة
    document.querySelectorAll("button[data-lang]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = btn.getAttribute("data-lang");
            loadContent(lang);
        });
    });
});