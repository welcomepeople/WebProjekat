export class Umetnik {
    constructor(id, ime, mestoRodjenja, godinaRodjenja, brojDela) {
        this.id = id;
        this.ime = ime;
        this.mestoRodjenja = mestoRodjenja;
        this.godinaRodjenja = godinaRodjenja;
        this.brojDela = brojDela;   //broj dela koji se izlazu
    }

    updateDela(inc) {
        if(inc == 1)
            this.brojDela++;
        else if(inc == 0)
            this.brojDela--;
    }
}