
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

    const cookies = Object.fromEntries(
      // à partir des cookies, sépare le contenu une première fois "; " et une deuxième fois "=" ce qui nous donne l'intitulé de la propriété et son contenu
      document.cookie.split("; ").map((c) => c.split("="))
    );
    // si
    const savedEmail = cookies.email ? decodeURIComponent(cookies.email) : "";
    const savedMdp = cookies.mdp ? decodeURIComponent(cookies.mdp) : "";

    const connexionh1 = document.createElement("h1");
    connexionh1.textContent = "Connexion";

    const formulaire = document.createElement("form");
    formulaire.classList.add("form");

    const email = document.createElement("input");
    email.setAttribute("id", "inputEmail")
    email.setAttribute("placeholder", "Adresse e-mail");
    email.setAttribute("value", savedEmail);

    const mdp = document.createElement("input");
    mdp.setAttribute("id", "inputMdp");
    mdp.setAttribute("placeholder", "Mot de passe");
    mdp.setAttribute("type", "password");
    mdp.setAttribute("value", savedMdp);

    const divcheck = document.createElement("div");
    divcheck.classList.add("divcheck");

    const check = document.createElement("input");
    check.classList.add("check");
    check.setAttribute("type", "checkbox");
    check.setAttribute("name", "checked");

    const remember = document.createElement("p");
    remember.classList.add("remember");
    remember.textContent = "Se souvenir de moi";

    const btnco = document.createElement("button");
    btnco.classList.add("btnco");
    btnco.setAttribute("id", "btnco");

    const seco = document.createElement("p");
    seco.classList.add("seco");
    seco.textContent = "Se connecter";


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

    btnco.addEventListener("click", (event) => {
      event.preventDefault();
      const checkedbox = document.querySelector('input[name=checked]').checked;
      const inputEmail = document.querySelector("#inputEmail").value;
      const inputMdp = document.querySelector("#inputMdp").value;

      let isAuthentificated = false;

      for (const user of this.listofusers) {
        // console.log(user)

        if (this.checkLogin(user.email, user.mdp, inputEmail, inputMdp)) {
          if (checkedbox) {
            document.cookie = `email=${encodeURIComponent(inputEmail)}; max-age=${7 * 24 * 60 * 60}`;
            document.cookie = `mdp=${encodeURIComponent(inputMdp)}; max-age=${7 * 24 * 60 * 60}`;
          }
          this.mainuser = user;
          this.currentStep = 2;
          this.renderStep();
          isAuthentificated = true;
          break;
        }
      }
      if (!isAuthentificated) {
        console.log("Mot de passe incorrect")
        alert('Mot de passe incorrect')
      }
    });

  };




  connect() {
    this.container.innerHTML = "";
    const pagedeco = document.createElement("div");
    pagedeco.classList.add("divco");

    const connectTxt = document.createElement("h1");
    connectTxt.textContent = "Vous êtes connectés.";

    const returnaccueil = document.createElement("button");
    returnaccueil.classList.add("btnaccueil");

    const accueil = document.createElement("p");
    accueil.classList.add("accueil");
    accueil.textContent = "Retour à l'accueil";

    // pageco.appendChild(pagedeco);
    pagedeco.appendChild(connectTxt);
    pagedeco.appendChild(returnaccueil);
    returnaccueil.appendChild(accueil);

    this.container.appendChild(pagedeco);
  }

  checkLogin(email, mdp, inputEmail, inputMdp) {
    let state = false;

    if (inputEmail && inputMdp) {
      if (email == inputEmail && mdp == inputMdp) {
        state = true;
        console.log("reussi")
        return state;

      } else {
        console.log("mot de passe incorrect");
      }
      return state;
    }
  }
}

new App("pageco");

function createHeader() {
  let header = document.getElementById('idheader')

  const logo = document.createElement('img')
  logo.src = "images/logo.png";
  logo.classList.add("logo");

  let nav = document.createElement('div')
  nav.classList.add('nav')

  let inscription = document.createElement('p')
  inscription.classList.add("navbar-titre")
  inscription.textContent = "Inscription"

  let connexion = document.createElement('p')
  connexion.classList.add('navbar-titre')
  connexion.textContent = "Connexion"

  const loupe = document.createElement('img')
  loupe.src = "./images/loupe-search-svgrepo-com.png";
  loupe.classList.add('emoticone-header');

  const panier = document.createElement('img')
  panier.src = "images/shopping-basket-supermarket-svgrepo-com.png";
  panier.classList.add('emoticone-header');


  header.appendChild(logo);
  header.appendChild(nav)
  nav.appendChild(inscription);
  nav.appendChild(connexion);
  nav.appendChild(loupe)
  nav.appendChild(panier)


}

createHeader();