class TabsBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.activeIndex = 0;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const tabs = Array.from(this.querySelectorAll('[slot="tab"]'));

        this.shadowRoot.innerHTML = `
      <style>
        .tabs {
          font-family: sans-serif;
        }

        .headers {
          display: flex;
          border-bottom: 2px solid #ddd;
        }

        .header {
          padding: 10px 16px;
          cursor: pointer;
        }

        .header.active {
          border-bottom: 2px solid #333;
          font-weight: bold;
        }

        .content {
          padding: 16px;
        }
      </style>

      <div class="tabs">
        <div class="headers">
          ${tabs.map((tab, i) => `
            <div class="header ${i === this.activeIndex ? "active" : ""}" data-index="${i}">
              ${tab.dataset.title}
            </div>
          `).join("")}
        </div>
        <div class="content">
          ${tabs[this.activeIndex]?.innerHTML || ""}
        </div>
      </div>
    `;

        this.shadowRoot.querySelectorAll(".header")
            .forEach(header => {
                header.addEventListener("click", () => {
                    this.activeIndex = Number(header.dataset.index);
                    this.render();
                });
            });
    }
}

customElements.define("tabs-box", TabsBox);
