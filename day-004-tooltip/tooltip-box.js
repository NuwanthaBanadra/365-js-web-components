class TooltipBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.text = this.getAttribute("text") || "Tooltip text";
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        .wrapper {
          position: relative;
          display: inline-block;
        }

        .tooltip {
          position: absolute;
          bottom: 120%;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: #fff;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
        }

        .wrapper:hover .tooltip {
          opacity: 1;
        }
      </style>

      <div class="wrapper">
        <slot></slot>
        <div class="tooltip">${this.text}</div>
      </div>
    `;
    }
}

customElements.define("tooltip-box", TooltipBox);
