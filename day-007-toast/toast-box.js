class ToastBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    show(message, duration = 2000) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;

        this.shadowRoot.querySelector(".container").appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, duration);
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        .container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-family: sans-serif;
          z-index: 9999;
        }

        .toast {
          background: #333;
          color: #fff;
          padding: 12px 16px;
          border-radius: 6px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>

      <div class="container"></div>
    `;
    }
}

customElements.define("toast-box", ToastBox);
