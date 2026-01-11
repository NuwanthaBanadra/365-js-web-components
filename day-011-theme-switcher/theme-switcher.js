class ThemeSwitcher extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const savedTheme = localStorage.getItem("theme") || "light";
        this.setTheme(savedTheme);
        this.render();
    }

    toggleTheme() {
        const current = document.body.classList.contains("dark")
            ? "dark"
            : "light";
        const next = current === "dark" ? "light" : "dark";
        this.setTheme(next);
    }

    setTheme(theme) {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        button {
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 14px;
        }
      </style>

      <button>Toggle Theme</button>
    `;

        this.shadowRoot.querySelector("button")
            .addEventListener("click", () => this.toggleTheme());
    }
}

customElements.define("theme-switcher", ThemeSwitcher);
