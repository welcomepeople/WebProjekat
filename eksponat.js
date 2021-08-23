export class Eksponat {
    constructor(naziv, umetnik, cena, tip, x, y)   {
        this.naziv = naziv;
        this.cena = cena;
        this.umetnik = umetnik;
        this.tip = tip;
        this.kontejner = null;
        this.x = x;
        this.y = y;
    }

    crtajEksponat(host) {
        this.kontejner = document.createElement("div");
        this.kontejner.className = "eksponat";
        this.kontejner.style.backgroundColor = this.bojaPolja();
        this.kontejner.innerHTML = "[Prazno]";
        host.appendChild(this.kontejner);
    }

    bojaPolja() {
        if(!this.tip)
            return "#eeeeee";
        else return this.tip;
    }

    updatePolje() {
        this.kontejner.innerHTML = this.naziv +
            //"<br />" + "Tip: " + this.tip +
            "<br />" + "Autor: " + this.umetnik.ime +
            "<br />" + "Cena: " + this.cena + " dinara"
    }

    updateEksponat(naziv, cena, umetnik, tip, x, y) {
        this.naziv = naziv;
        this.cena = cena;
        this.umetnik = umetnik;
        this.tip = tip;
        this.x = x;
        this.y = y;

        if(naziv == "")
            this.kontejner.innerHTML = "[Prazno]";
        else this.updatePolje();

        this.kontejner.style.backgroundColor = this.bojaPolja();
    }

    updateCena(novaCena) {
        this.cena = novaCena;

        this.updatePolje();
    }
}