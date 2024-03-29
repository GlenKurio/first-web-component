const template = document.createElement("template");
template.innerHTML = `
<style>
.user-card {
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: goldenrod;
    border-radius: 2rem;
    overflow: hidden;

}

.info {
    display: flex;
    
}

h3 {
    color: white;
    text-transform: capitalize;
}
</style>

<div class="user-card">
    <img/>
    <div>
        <h3></h3>
        <div class="info">
            <p><slot name='email'/></p>
            <p><slot name='phone'/></p>
        </div>
        <button id="toggle-info">Hide Info</button>
    </div>
</div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = false;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");

    this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");
  }

  toggleInfo() {
    console.log("Works!");
    this.showInfo = !this.showInfo;
    const info = this.shadowRoot.querySelector(".info");
    const togBtn = this.shadowRoot.querySelector("#toggle-info");

    if (this.showInfo) {
      info.style.display = "block";
      togBtn.innerText = "Hide Info";
    } else {
      info.style.display = "none";
      togBtn.innerText = "Show Info";
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#toggle-info")
      .addEventListener("click", () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#toggle-info").removeEventListener();
  }
}

window.customElements.define("user-card", UserCard);
