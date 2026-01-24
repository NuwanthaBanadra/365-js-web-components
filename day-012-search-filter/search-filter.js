class SearchFilter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        input {
          padding: 8px 12px;
          width: 200px;
          font-size: 14px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
      </style>

      <input type="text" placeholder="Search..." />
    `;

        this.shadowRoot.querySelector("input")
            .addEventListener("input", (e) => {
                this.dispatchEvent(new CustomEvent("filter", {
                    detail: e.target.value
                }));
            });
    }
}

customElements.define("search-filter", SearchFilter);
