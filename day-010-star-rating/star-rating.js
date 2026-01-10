class StarRating extends HTMLElement {
    static get observedAttributes() {
        return ["max"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.rating = 0;
        this.max = Number(this.getAttribute("max")) || 5;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        .stars {
          display: inline-flex;
          font-size: 32px;
          cursor: pointer;
          user-select: none;
          font-family: sans-serif;
        }

        .star {
          color: #ccc;
          transition: color 0.2s;
        }

        .star.active {
          color: gold;
        }
      </style>

      <div class="stars">
        ${Array.from({ length: this.max }, (_, i) => `
          <span class="star" data-value="${i + 1}">★</span>
        `).join("")}
      </div>
    `;

        this.shadowRoot.querySelectorAll(".star").forEach(star => {
            star.addEventListener("mouseenter", () => {
                this.highlight(star.dataset.value);
            });

            star.addEventListener("mouseleave", () => {
                this.highlight(this.rating);
            });

            star.addEventListener("click", () => {
                this.rating = Number(star.dataset.value);
                this.dispatchEvent(new CustomEvent("change", {
                    detail: this.rating
                }));
                this.highlight(this.rating);
            });
        });

        this.highlight(this.rating);
    }

    highlight(value) {
        this.shadowRoot.querySelectorAll(".star").forEach(star => {
            star.classList.toggle(
                "active",
                Number(star.dataset.value) <= value
            );
        });
    }
}

customElements.define("star-rating", StarRating);
