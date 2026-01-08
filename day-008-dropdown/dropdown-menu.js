class DropdownMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.isOpen = false;
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    connectedCallback() {
        this.render();
        document.addEventListener("click", this.handleOutsideClick);
    }

    disconnectedCallback() {
        document.removeEventListener("click", this.handleOutsideClick);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.render();
    }

    handleOutsideClick(e) {
        if (!this.contains(e.target)) {
            this.isOpen = false;
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        .wrapper {
          position: relative;
          display: inline-block;
          font-family: sans-serif;
        }

        .menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 6px;
          min-width: 140px;
          display: ${this.isOpen ? "block" : "none"};
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        ::slotted(ul) {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        ::slotted(li) {
          padding: 10px;
          cursor: pointer;
        }

        ::slotted(li:hover) {
          background: #f0f0f0;
        }
      </style>

      <div class="wrapper">
        <div class="trigger">
          <slot name="trigger"></slot>
        </div>
        <div class="menu">
          <slot name="menu"></slot>
        </div>
      </div>
    `;

        this.shadowRoot.querySelector(".trigger")
            .onclick = (e) => {
                e.stopPropagation();
                this.toggle();
            };
    }
}

customElements.define("dropdown-menu", DropdownMenu);
