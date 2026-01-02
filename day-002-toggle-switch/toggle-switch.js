class ToggleSwitch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.isOn = false;
    }

    connectedCallback() {
        this.render();
    }

    toggle() {
        this.isOn = !this.isOn;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        .switch {
          width: 60px;
          height: 30px;
          background: ${this.isOn ? "#4caf50" : "#ccc"};
          border-radius: 15px;
          position: relative;
          cursor: pointer;
          transition: background 0.3s;
        }

        .knob {
          width: 26px;
          height: 26px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: ${this.isOn ? "32px" : "2px"};
          transition: left 0.3s;
        }
      </style>

      <div class="switch">
        <div class="knob"></div>
      </div>
    `;

        this.shadowRoot.querySelector(".switch")
            .addEventListener("click", () => this.toggle());
    }
}

customElements.define("toggle-switch", ToggleSwitch);
