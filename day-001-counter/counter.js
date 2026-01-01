class CounterBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.count = 0;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        .container {
          font-family: sans-serif;
          border: 2px solid #333;
          padding: 20px;
          width: 200px;
          text-align: center;
          border-radius: 8px;
        }
        button {
          margin: 5px;
          padding: 6px 12px;
          cursor: pointer;
        }
      </style>

      <div class="container">
        <h2>${this.count}</h2>
        <button id="inc">+</button>
        <button id="dec">-</button>
        <button id="reset">Reset</button>
      </div>
    `;

        this.shadowRoot.getElementById("inc").onclick = () => {
            this.count++;
            this.render();
        };

        this.shadowRoot.getElementById("dec").onclick = () => {
            this.count--;
            this.render();
        };

        this.shadowRoot.getElementById("reset").onclick = () => {
            this.count = 0;
            this.render();
        };
    }
}

customElements.define("counter-box", CounterBox);
