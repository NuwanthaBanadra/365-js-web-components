class ModalBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    open() {
        this.shadowRoot.querySelector(".overlay").style.display = "flex";
    }

    close() {
        this.shadowRoot.querySelector(".overlay").style.display = "none";
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          min-width: 300px;
          max-width: 90%;
          position: relative;
        }

        button.close {
          position: absolute;
          top: 10px;
          right: 10px;
          border: none;
          background: none;
          font-size: 18px;
          cursor: pointer;
        }
      </style>

      <div class="overlay">
        <div class="modal">
          <button class="close">&times;</button>
          <slot></slot>
        </div>
      </div>
    `;

        this.shadowRoot.querySelector(".close")
            .addEventListener("click", () => this.close());

        this.shadowRoot.querySelector(".overlay")
            .addEventListener("click", (e) => {
                if (e.target.classList.contains("overlay")) {
                    this.close();
                }
            });
    }
}

customElements.define("modal-box", ModalBox);
