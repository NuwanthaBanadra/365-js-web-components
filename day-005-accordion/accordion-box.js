class AccordionBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.open = false;
    }

    connectedCallback() {
        this.render();
    }

    toggle() {
        this.open = !this.open;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        .accordion {
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-bottom: 10px;
          font-family: sans-serif;
        }

        .header {
          padding: 12px;
          cursor: pointer;
          background: #f5f5f5;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .content {
          padding: 12px;
          display: ${this.open ? "block" : "none"};
        }
      </style>

      <div class="accordion">
        <div class="header">
          <slot name="title"></slot>
          <span>${this.open ? "−" : "+"}</span>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;

        this.shadowRoot.querySelector(".header")
            .addEventListener("click", () => this.toggle());
    }
}

customElements.define("accordion-box", AccordionBox);
