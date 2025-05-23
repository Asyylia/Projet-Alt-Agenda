function cookie() {
  const app = document.getElementById("pageco");
  const sectioncookie = document.createElement("div");
  sectioncookie.classList.add("cookie-container");
  const imgcookie = document.createElement("img");
  imgcookie.src = "images/cookie-svgrepo-com.png";
  imgcookie.classList.add("logo-cookie");

  const text = document.createElement("div");
  text.classList.add("text");

  const titre = document.createElement("h2");
  titre.classList.add("cookie-title");
  titre.textContent = "Politique de confidentialité";

  const paragraphe = document.createElement("p");
  paragraphe.classList.add("cookie-subtitle");
  paragraphe.textContent =
    "La présente politique de confidentialité a pour but d’informer les utilisateurs du site";

  const btn = document.createElement("button");
  btn.classList.add("button");
  btn.textContent = "J'ai compris.";

  sectioncookie.appendChild(imgcookie);
  sectioncookie.appendChild(text);
  text.appendChild(titre);
  text.appendChild(paragraphe);
  text.appendChild(btn);
  app.appendChild(sectioncookie);

  btn.addEventListener("click", () => {
    app.removeChild(sectioncookie);
  });
}

cookie();
