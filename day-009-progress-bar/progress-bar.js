class ProgressBar extends HTMLElement {
    static get observedAttributes() {
        return ["value"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.update();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        .bar {
          width: 300px;
          height: 20px;
          background: #eee;
          border-radius: 10px;
          overflow: hidden;
          font-family: sans-serif;
        }

        .fill {
          height: 100%;
          width: 0%;
          background: #4caf50;
          transition: width 0.3s ease;
        }

        .label {
          margin-top: 6px;
          text-align: center;
          font-size: 14px;
        }
      </style>

      <div class="bar">
        <div class="fill"></div>
      </div>
      <div class="label"></div>
    `;

        this.update();
    }

    update() {
        const value = Math.min(
            100,
            Math.max(0, Number(this.getAttribute("value") || 0))
        );

        this.shadowRoot.querySelector(".fill").style.width = value + "%";
        this.shadowRoot.querySelector(".label").textContent = value + "%";
    }
}

customElements.define("progress-bar", ProgressBar);
