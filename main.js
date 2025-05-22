class User {
  // Creation de l'objet
  constructor(pseudo, email, mdp) {
    this.pseudo = pseudo;
    this.email = email;
    this.mdp = mdp;
  }
}
class App {
  constructor(containerID) {
    this.container = document.getElementById(containerID);
    this.mainuser = new User();
    this.currentStep = 1;
    this.listofusers = [];
    this.init();
  }
  async init() {
    document.addEventListener("DOMContentLoaded", () => this.start());
  }
  async start() {
    //charger les utilisateurs
    const data = await fetch("./datas/data.json").then((res) => res.json());
    this.listofusers = data.map((d) => new User("", d.email, d.mdp));
    this.renderStep();
  }

  renderStep() {
    this.container.innerHTML = "";

    switch (this.currentStep) {
      case 1:
        this.formulaire(); // page de connexion
        break;
      case 2:
        this.connect(); //validation connexion
        break;
    }
  }

  formulaire() {
    const pagedeco = document.createElement("div");
    pagedeco.classList.add("divco");

    const connexionh1 = document.createElement("h1");
    connexionh1.textContent = "Connexion";

    const formulaire = document.createElement("form");
    formulaire.classList.add("form");

    const email = document.createElement("input");
    email.classList.add("email");
    email.setAttribute("placeholder", "Adresse e-mail");

    const mdp = document.createElement("input");
    mdp.classList.add("mdp");
    mdp.setAttribute("placeholder", "Mot de passe");
    mdp.setAttribute("type", "password");

    const divcheck = document.createElement("div");
    divcheck.classList.add("divcheck");

    const check = document.createElement("input");
    check.classList.add("check");
    check.setAttribute("type", "checkbox");

    const remember = document.createElement("p");
    remember.classList.add("remember");
    remember.textContent = "Se souvenir de moi";

    const btnco = document.createElement("button");
    btnco.classList.add("btnco");
    btnco.setAttribute("id", "btnco");

    const seco = document.createElement("p");
    seco.classList.add("seco");
    seco.textContent = "Se connecter";

    pageco.appendChild(pagedeco);
    pagedeco.appendChild(connexionh1);
    pagedeco.appendChild(formulaire);

    formulaire.appendChild(email);
    formulaire.appendChild(mdp);

    formulaire.appendChild(divcheck);
    divcheck.appendChild(check);
    divcheck.appendChild(remember);
    formulaire.appendChild(btnco);
    btnco.appendChild(seco);

    this.container.appendChild(pagedeco);

    document.getElementById("btnco").addEventListener("click", () => {
      this.listofusers.forEach((user) => {
        if (this.checkLogin(user.email, user.mdp) == true) {
          this.mainuser = user;
          this.currentStep = 2;
          this.renderStep();
          console.log(user)
        } else {
          console.log("loupé");
        }
      });
    });
    return pagedeco;
  }

  connect() {
    this.container.innerHTML = "";
    const pagedeco = document.createElement("div");
    pagedeco.classList.add("divco");

    const connectTxt = document.createElement("h1");
    connectTxt.textContent = "Vous êtes connectés.";

    const returnaccueil = document.createElement("button");
    returnaccueil.classList.add("btnco");

    const accueil = document.createElement("p");
    accueil.classList.add("accueil");
    accueil.textContent = "Retour à l'accueil";

    pageco.appendChild(pagedeco);
    pagedeco.appendChild(connectTxt);
    pagedeco.appendChild(returnaccueil);
    returnaccueil.appendChild(accueil);

    this.container.appendChild(pagedeco);
  }

  checkLogin(email, mdp) {
    let state = false;

    let inputEmail = document.querySelector(".email");
    let inputMdp = document.querySelector(".mdp");
    if (inputEmail && inputMdp) {
      if (email == inputEmail.value && mdp == inputMdp.value) {
        state = true;
        return state;
      } else {
        console.log("mot de passe incorrect");
      }
      return state;
    }
  }
}

new App("pageco");
