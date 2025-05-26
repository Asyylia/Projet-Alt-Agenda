
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
        this.createHeader();
        this.accueil()
        this.createFooter();
        break;
      case 2:
        this.formulaire(); // page de connexion
        break;
      case 3:
        this.connect(); //validation connexion
        break;

    }
  }

  formulaire() {
    this.container.innerHTML = "";
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
          this.currentStep = 3;
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

  accueil() {
    this.container.innerHTML = "";
    const searchbar = document.createElement('div')
    searchbar.classList.add('searchbar')

    const titrebar = document.createElement('h1')
    titrebar.textContent = "Rechercher des évènements"

    const dropdown = document.createElement('div')
    dropdown.classList.add('dropdown')

    const btncatdrop = document.createElement('select')
    btncatdrop.classList.add('btncatdrop')


    const licat1 = document.createElement('option')
    licat1.classList.add('licat')
    licat1.value = "option1"
    licat1.text = "Concerts / Évènements musicaux"

    const licat2 = document.createElement('option')
    licat2.classList.add('licat')
    licat2.value = "option2"
    licat2.text = "Conventions / Festival"

    const licat3 = document.createElement('option')
    licat3.classList.add('licat')
    licat3.value = "option3"
    licat3.text = "Jeux vidéos / E-sport"

    const licat4 = document.createElement('option')
    licat4.classList.add('licat')
    licat4.value = "option4"
    licat4.text = "Lifestyle"

    const basedrop = document.createElement('option')
    basedrop.textContent = "Catégorie"
    basedrop.disabled = true
    basedrop.selected = true
    basedrop.value = ""

    const btnlocdrop = document.createElement('select')
    btnlocdrop.classList.add('btncatdrop')


    const liloc1 = document.createElement('option')
    liloc1.classList.add('licat')
    liloc1.value = "option1"
    liloc1.text = "Doubs"

    const liloc2 = document.createElement('option')
    liloc2.classList.add('licat')
    liloc2.value = "option2"
    liloc2.text = "Haute-Saône"

    const liloc3 = document.createElement('option')
    liloc3.classList.add('licat')
    liloc3.value = "option3"
    liloc3.text = "Jura"

    const liloc4 = document.createElement('option')
    liloc4.classList.add('licat')
    liloc4.value = "option4"
    liloc4.text = "Territoire de Belfort"

    const basedroploc = document.createElement('option')
    basedroploc.textContent = "Localisation"
    basedroploc.disabled = true
    basedroploc.selected = true
    basedroploc.value = ""


    const btndatedrop = document.createElement('select')
    btndatedrop.classList.add('btncatdrop')


    const lidate1 = document.createElement('option')
    lidate1.classList.add('licat')
    lidate1.value = "option1"
    lidate1.text = "Cette semaine"

    const lidate2 = document.createElement('option')
    lidate2.classList.add('licat')
    lidate2.value = "option2"
    lidate2.text = "Ce week-end"

    const lidate3 = document.createElement('option')
    lidate3.classList.add('licat')
    lidate3.value = "option3"
    lidate3.text = "Ce mois-ci"

    const lidate4 = document.createElement('option')
    lidate4.classList.add('licat')
    lidate4.value = "option4"
    lidate4.text = "À venir"

    const basedropdate = document.createElement('option')
    basedropdate.textContent = "Date"
    basedropdate.disabled = true
    basedropdate.selected = true
    basedropdate.value = ""

    const btnsearch = document.createElement('button')
    btnsearch.classList.add('btnsearch')
    btnsearch.textContent = "Rechercher"

    const divaccueil = document.createElement('div')
    divaccueil.classList.add('divaccueil')

    const divcat = document.createElement('div')
    divcat.classList.add('divcat')

    const divcat1 = document.createElement('button')
    divcat1.classList.add('btndivcat1')
    divcat1.textContent = "CONCERTS / ÉVENÈMENTS MUSICAUX"

    const divcat2 = document.createElement('button')
    divcat2.classList.add('btndivcat2')
    divcat2.textContent = "CONVENTIONS / FESTIVAL"

    const divcat3 = document.createElement('button')
    divcat3.classList.add('btndivcat3')
    divcat3.textContent = "JEUX VIDÉOS / E-SPORT"

    const divcat4 = document.createElement('button')
    divcat4.classList.add('btndivcat4')
    divcat4.textContent = "LIFESTYLE"

    divaccueil.appendChild(searchbar)
    searchbar.appendChild(titrebar)
    searchbar.appendChild(dropdown)

    dropdown.appendChild(btncatdrop)
    btncatdrop.appendChild(licat1)
    btncatdrop.appendChild(licat2)
    btncatdrop.appendChild(licat3)
    btncatdrop.appendChild(licat4)
    btncatdrop.appendChild(basedrop)

    dropdown.appendChild(btnlocdrop)
    btnlocdrop.appendChild(liloc1)
    btnlocdrop.appendChild(liloc2)
    btnlocdrop.appendChild(liloc3)
    btnlocdrop.appendChild(liloc4)
    btnlocdrop.appendChild(basedroploc)

    dropdown.appendChild(btndatedrop)
    btndatedrop.appendChild(lidate1)
    btndatedrop.appendChild(lidate2)
    btndatedrop.appendChild(lidate3)
    btndatedrop.appendChild(lidate4)
    btndatedrop.appendChild(basedropdate)

    dropdown.appendChild(btnsearch)

    divaccueil.appendChild(divcat)
    divcat.appendChild(divcat1)
    divcat.appendChild(divcat2)
    divcat.appendChild(divcat3)
    divcat.appendChild(divcat4)



    this.container.appendChild(divaccueil)



  }

  inscription() {
    this.container.innerHTML = "";
    const fondinscription = document.createElement('div')
    fondinscription.classList.add('fondinscription')

    const titreinscription = document.createElement('h1')
    titreinscription.textContent = "Inscription"

    const divcol = document.createElement('div')
    divcol.classList.add('divcol')

    const col1 = document.createElement('div')
    col1.classList.add('col')

    const col2 = document.createElement('div')
    col2.classList.add('col')

    const userinscription = document.createElement('input')
    userinscription.classList.add('caseinscription')
    userinscription.setAttribute("placeholder", "Pseudo");

    const mailinscription = document.createElement('input')
    mailinscription.classList.add('caseinscription')
    mailinscription.setAttribute("placeholder", "Adresse e-mail");

    const mdpinscription = document.createElement('input')
    mdpinscription.classList.add('caseinscription')
    mdpinscription.setAttribute("placeholder", "Mot de passe");

    const birthinscription = document.createElement('input')
    birthinscription.classList.add('caseinscription')
    birthinscription.setAttribute("placeholder", "Date de naissance");

    const adresseinscription = document.createElement('input')
    adresseinscription.classList.add('caseinscription')
    adresseinscription.setAttribute("placeholder", "Adresse");

    const cpinscription = document.createElement('input')
    cpinscription.classList.add('caseinscription')
    cpinscription.setAttribute("placeholder", "Code postal");

    const villeinscription = document.createElement('input')
    villeinscription.classList.add('caseinscription')
    villeinscription.setAttribute("placeholder", "Ville");

    const regioninscription = document.createElement('input')
    regioninscription.classList.add('caseinscription')
    regioninscription.setAttribute("placeholder", "Région / Département");

    const btninscription = document.createElement("button");
    btninscription.classList.add("btninscription");
    btninscription.setAttribute("id", "btnco");

    const sinscrire = document.createElement("p");
    sinscrire.classList.add("sinscrire");
    sinscrire.textContent = "S'inscrire";

    this.container.appendChild(fondinscription)
    fondinscription.appendChild(titreinscription)
    fondinscription.appendChild(divcol)
    divcol.appendChild(col1)
    divcol.appendChild(col2)
    col1.appendChild(userinscription)
    col1.appendChild(mailinscription)
    col1.appendChild(mdpinscription)
    col1.appendChild(birthinscription)
    col2.appendChild(adresseinscription)
    col2.appendChild(cpinscription)
    col2.appendChild(villeinscription)
    col2.appendChild(regioninscription)
    fondinscription.appendChild(btninscription)
    btninscription.appendChild(sinscrire)

  }
  createHeader() {
    let header = document.getElementById('idheader')

    const logo = document.createElement('img')
    logo.src = "images/logo.png";
    logo.classList.add("logo");
    logo.style.cursor = "pointer"
    logo.setAttribute("href", "#")
    logo.addEventListener('click', () => {
      this.accueil()
    })
    const divnav = document.createElement('div')
    divnav.classList.add('divnav')

    let nav = document.createElement('div')
    nav.classList.add('nav')

    let inscription = document.createElement('a')
    inscription.classList.add("navbar-titre")
    inscription.textContent = "Inscription"
    inscription.setAttribute("href", "#")
    inscription.addEventListener('click', () => {
      this.inscription()
    })


    let connexion = document.createElement('a')
    connexion.classList.add('navbar-titre')
    connexion.textContent = "Connexion"
    connexion.setAttribute("href", "#")
    connexion.addEventListener('click', () => {
      this.formulaire()
    })

    const loupe = document.createElement('img')
    loupe.src = "./images/loupe-search-svgrepo-com.png";
    loupe.classList.add('emoticone-header');

    const panier = document.createElement('img')
    panier.src = "images/shopping-basket-supermarket-svgrepo-com.png";
    panier.classList.add('emoticone-header');


    const annonce = document.createElement('a')
    annonce.classList.add('annonce')
    annonce.textContent = "Déposer votre annonce"
    annonce.setAttribute("href", "#")
    annonce.addEventListener('click', () => {
      this.formulaire()
    })

    header.appendChild(logo);
    header.appendChild(divnav)
    divnav.appendChild(nav)
    nav.appendChild(inscription);
    nav.appendChild(connexion);
    nav.appendChild(loupe)
    nav.appendChild(panier)
    divnav.appendChild(annonce)


  }

  createFooter() {
    let $emailUser = "mezza@gmail.com";
    const footer = document.getElementById("footer")

    const menubas = document.createElement('div')
    menubas.classList.add('menubas')

    const aPropos = document.createElement("p")
    aPropos.classList.add('apropos')
    aPropos.textContent = 'À propos'

    const contact = document.createElement("a")
    contact.classList.add('contact')
    contact.setAttribute("href", "mailto:" + $emailUser + "?subject=Prise de contact&body=J'aimerais faire votre connaissance!")
    contact.textContent = 'Nous contacter'

    const mentions = document.createElement("p")
    mentions.classList.add('mentions')
    mentions.textContent = 'Informations légales'

    const sociaux = document.createElement('div')
    sociaux.classList.add("sociaux")

    const facebooklogo = document.createElement('img')
    facebooklogo.src = ('images/facebook-svgrepo-com 2.png')
    facebooklogo.classList.add('logosociaux')

    // const facebook = document.createElement("a")
    // facebook.setAttribute('href', 'facebook.com')

    const instalogo = document.createElement('img')
    instalogo.src = ('images/instagram-svgrepo-com 1.png')
    instalogo.classList.add('logosociaux')

    // const insta = document.createElement("a")
    // insta.href('instagram.com')

    const twitterlogo = document.createElement('img')
    twitterlogo.src = ('images/twitter-svgrepo-com (1) 1.png')
    twitterlogo.classList.add('logosociaux')

    // const twitter = document.createElement("a")
    // twitter.href('twitter.com')

    footer.appendChild(menubas)
    footer.appendChild(sociaux)
    menubas.appendChild(aPropos)
    menubas.appendChild(contact)
    menubas.appendChild(mentions)
    sociaux.appendChild(facebooklogo)
    // facebooklogo.appendChild(facebook)
    sociaux.appendChild(instalogo)
    // facebooklogo.appendChild('insta')
    sociaux.appendChild(twitterlogo)
    // facebooklogo.appendChild('twitter')
  }
}

new App("pageco");






