import { Eksponat } from "./eksponat.js";
import { Umetnik } from "./umetnik.js";

export class Izlozba {
  constructor(id, naziv, n, m) {
    this.id = id;
    this.naziv = naziv;
    this.kontejner = null;
    this.n = n;
    this.m = m;
    this.listaUmetnika = [];
    this.listaEksponata = [];
  }

  dodajEksponat(eksponat) {
    this.listaEksponata.push(eksponat);
  }

  dodajUmetnika(umetnik) {
    this.listaUmetnika.push(umetnik);
  }

  crtajIzlozbu(host) {
    if (!host) throw new Error("Host nije definisan");

    const kont = document.createElement("div");
    host.appendChild(kont);

    const naslov = document.createElement("h3");
    naslov.innerHTML = this.naziv;
    kont.appendChild(naslov);

    this.kontejner = document.createElement("div");
    this.kontejner.classList.add("kontejner");
    kont.appendChild(this.kontejner);

    this.crtajFormu(this.kontejner);
    this.crtajEksponat(this.kontejner);

    // const abc = document.createElement("hr");
    // host.appendChild(abc);
  }

  crtajFormu(host) {
    const forma = document.createElement("div");
    forma.className = "forma";
    host.appendChild(forma);

    var labela = document.createElement("h4");
    labela.innerHTML = "Dodavanje eksponata";
    forma.appendChild(labela);

    labela = document.createElement("label");
    labela.innerHTML = "Naziv dela: ";
    forma.appendChild(labela);

    let element = document.createElement("input");
    element.className = "naziv";
    forma.appendChild(element);

    labela = document.createElement("label");
    labela.innerHTML = "Cena: ";
    forma.appendChild(labela);

    element = document.createElement("input");
    element.type = "number";
    element.className = "cena";
    forma.appendChild(element);

    let tipovi = ["fotografija", "slika", "instalacija", "kolaz", "skulptura"];
    let boje = ["#a7dbc7", "#ed9de5", "#9bc267", "#676ec2", "#c6c961"];
    let radio = null;
    let opcija = null;
    let radioDiv = null;

    tipovi.forEach((tip, index) => {
      radioDiv = document.createElement("div");
      radioDiv.className = "radioButton";
      radio = document.createElement("input");
      radio.type = "radio";
      radio.name = this.naziv;
      radio.value = boje[index];

      opcija = document.createElement("label");
      opcija.style.backgroundColor = boje[index];
      opcija.innerHTML = tip;

      radioDiv.appendChild(radio);
      radioDiv.appendChild(opcija);
      forma.appendChild(radioDiv);
    });

    let umetnikDiv = document.createElement("div");
    let umetnikSelect = document.createElement("select");
    labela = document.createElement("label");
    labela.innerHTML = "Umetnik: ";
    umetnikDiv.appendChild(labela);
    umetnikDiv.appendChild(umetnikSelect);

    let umetnik = null;

    umetnik = document.createElement("option");
    umetnik.innerHTML = "";
    umetnik.value = null;
    umetnikSelect.appendChild(umetnik);

    /////////////////////////////////////////////////////////////////
    //sad ide fetch svih umetnika
    /////////////////////////////////////////////////////////////////
    fetch("https://localhost:5001/Muzej/PreuzimanjeUmetnika").then(p => {
      p.json().then(data => {
        data.forEach(u => {
          const um = new Umetnik(u.id, u.ime, u.mestoRodjenja, u.godinaRodjenja, u.brojDela);
          this.dodajUmetnika(um);
          umetnik = document.createElement("option");
          umetnik.innerHTML = um.ime;
          umetnik.value = um.ime;
          umetnikSelect.appendChild(umetnik);
        })
      })
    })
    /////////////////////////////////////////////////////////////////
    //gotov fetch
    /////////////////////////////////////////////////////////////////

    forma.appendChild(umetnikDiv);

    const dugmeUmetnik = document.createElement("button");
    dugmeUmetnik.className = "button";
    dugmeUmetnik.innerHTML = "Prikazi info o umetniku";
    forma.appendChild(dugmeUmetnik);

    //READ za umetnika
    dugmeUmetnik.onclick = (ev) => {

      const umetnikSelected = umetnikSelect.value;
      umetnik = this.listaUmetnika.find((um) => um.ime == umetnikSelected);

      if (umetnik == null) alert("Nije izabran nijedan umetnik!");
      else {
        let temp = "Umetnik: " + umetnik.ime +
          "\nMesto rodjenja: " + umetnik.mestoRodjenja +
          "\nGodina rodjenja: " + umetnik.godinaRodjenja +
          "\nBroj dela na izlozbama: " + umetnik.brojDela;
        alert(temp);
      }
    }

    labela = document.createElement("label");
    labela.innerHTML = "Izaberite poziciju eksponata";
    forma.appendChild(labela);

    let pozicijaDiv = document.createElement("div");
    let vrsta = document.createElement("select");
    labela = document.createElement("label");
    labela.innerHTML = "Vrsta: ";
    pozicijaDiv.appendChild(labela);
    pozicijaDiv.appendChild(vrsta);

    let x = null;
    for(let i = 0; i < this.n; i++) {
      x = document.createElement("option");
      x.innerHTML = i+1;
      x.value = i;
      vrsta.appendChild(x);
    }
    forma.appendChild(pozicijaDiv);

    pozicijaDiv = document.createElement("div");
    let kolona = document.createElement("select");
    labela = document.createElement("label");
    labela.innerHTML = "Kolona: ";
    pozicijaDiv.appendChild(labela);
    pozicijaDiv.appendChild(kolona);

    let y = null;
    for(let i = 0; i < this.m; i++) {
      y = document.createElement("option");
      y.innerHTML = i+1;
      y.value = i;
      kolona.appendChild(y);
    }
    forma.appendChild(pozicijaDiv);
    
    const dugme = document.createElement("button");
    dugme.className = "button";
    dugme.innerHTML = "Dodaj eksponat";
    forma.appendChild(dugme);

    //CREATE za eksponat

    dugme.onclick = (ev) => {
        const naziv = this.kontejner.querySelector(".naziv").value;
        const cena = parseInt(this.kontejner.querySelector(".cena").value);
        const tipDela = this.kontejner.querySelector(`input[name='${this.naziv}']:checked`);
        const umetnikSelected = umetnikSelect.value;
        console.log(tipDela);
        let umetnik = this.listaUmetnika.find(um => um.ime == umetnikSelected)

        if(naziv == "")   {
            alert("Nije unet naziv!");
        }
        else if(tipDela == null)  {
            alert("Nije izabran tip dela!");
        }
        else if(umetnik == null)  {
            alert("Nije izabran umetnik!");
        }
        else  {
            /////////////////////////////////////////////////////////////////
            //sad ide fetch za post jednog eksponata
            /////////////////////////////////////////////////////////////////
            let i = parseInt(vrsta.value);
            let j = parseInt(kolona.value);

            fetch("https://localhost:5001/Muzej/DodavanjeEksponata/" + this.id, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                "naziv": naziv,
                "cena": cena,
                "tip": tipDela.value,
                "x": i,
                "y": j,
                "umetnikID": umetnik.id
              })
            }).then(p => {
              if(p.ok)  {
                console.log(tipDela);
                this.listaEksponata[i * this.m + j].updateEksponat(naziv, cena, umetnik, tipDela.value, i, j);
                umetnik.updateDela(1);
              }
              else if(p.status == 400)  {
                alert("Eksponat je vec na izlozbi");
              }
              else if(p.status == 409)  {
                alert("Za izmenu cene eksponata klikni na \"Azuriraj cenu\" dugme. Za ostale izmene izbaci eksponat i ponovo dodaj.")
              }
              else alert("Greska!");
            })
            /////////////////////////////////////////////////////////////////
            //gotov fetch
            /////////////////////////////////////////////////////////////////
        }
    }

    const dugme1 = document.createElement("button");
    dugme1.className = "button";
    dugme1.innerHTML = "Azuriraj cenu";
    forma.appendChild(dugme1);

    //UPDATE za eksponat

    dugme1.onclick = (ev) => {
      const cena = parseInt(this.kontejner.querySelector(".cena").value);
      let i = parseInt(vrsta.value);
      let j = parseInt(kolona.value);

      /////////////////////////////////////////////////////////////////
      //sad ide fetch za put jednog eksponata
      /////////////////////////////////////////////////////////////////
      fetch("https://localhost:5001/Muzej/UpdateCenu", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "cena": cena,
          "x": i,
          "y": j
        })
      }).then(p => {
        if(p.ok)  {
          this.listaEksponata[i * this.m + j].updateEksponat(cena);
        }
        else alert("Doslo je do greske prilikom azuriranja cene");
      })
      /////////////////////////////////////////////////////////////////
      //gotov fetch
      /////////////////////////////////////////////////////////////////
    }

    const dugme2 = document.createElement("button");
    dugme2.className = "button";
    dugme2.innerHTML = "Ukloni eksponat";
    forma.appendChild(dugme2);

    //DELETE za eksponat

    dugme2.onclick = (ev) => {
      let i = parseInt(vrsta.value);
      let j = parseInt(kolona.value);

      let temp = this.listaEksponata.find(ek => ek.x == i && ek.y == j);
      console.log(this.id);

      /////////////////////////////////////////////////////////////////
      //sad ide fetch za delete jednog eksponata
      /////////////////////////////////////////////////////////////////
      fetch("https://localhost:5001/Muzej/UklanjanjeEksponata", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify ({
                    "x": i,
                    "y": j,
                    "umetnikID": temp.umetnik.id,
                    "id": temp.id
                })
            }).then(p => {
                if (p.ok)
                {
                    this.listaEksponata[i * this.m + j].umetnik.updateDela(0);
                    this.listaEksponata[i * this.m + j].updateEksponat("", 0, "", "", i, j);
                    //this.listaEksponata[i * this.m + j].updateEksponat("", 0, "", i, j, "", "", null);  
                }
                else if (p.status == 406)
                {
                    alert("Neispravna pozicija eksponata!")
                }
                else
                {
                    alert("Doslo je do greske prilikom brisanja");
                }
            });
      /////////////////////////////////////////////////////////////////
      //gotov fetch
      /////////////////////////////////////////////////////////////////
    }
  };

  crtajEksponat(host) {
    const kontejner = document.createElement("div");
    kontejner.className = "kontejnerEksponata";
    host.appendChild(kontejner);

    let vrsta;
    let eks;

    for(let i = 0; i < this.n; i++) {
      vrsta = document.createElement("div");
      vrsta.className = "vrsta";
      kontejner.appendChild(vrsta);

      for(let j = 0; j < this.m; j++) {
        eks = new Eksponat("", "", 0, "", i, j);
        this.dodajEksponat(eks);
        eks.crtajEksponat(vrsta);
      }
    }
  }
}
