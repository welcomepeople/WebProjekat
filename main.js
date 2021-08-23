import { Eksponat } from "./eksponat.js";
import { Umetnik } from "./umetnik.js";
import { Izlozba } from "./izlozba.js";

fetch("https://localhost:5001/Muzej/PreuzimanjeIzlozbe").then(p => {
    p.json().then(data => {
        data.forEach(izlozba => {
            const izl = new Izlozba(izlozba.id, izlozba.naziv, izlozba.n, izlozba.m);
            izl.crtajIzlozbu(document.body);

            izlozba.eksponati.forEach(eksponat => {
                fetch("https://localhost:5001/Muzej/PreuzimanjeUmetnika").then(p => {
                    p.json().then(data => {
                        data.forEach(u => {
                            if(u.id == eksponat.umetnikID)    {
                                const um = new Umetnik(u.id, u.ime, u.mestoRodjenja, u.godinaRodjenja, u.brojDela);
                                izl.listaEksponata[eksponat.x * izl.m + eksponat.y].updateEksponat(eksponat.naziv, eksponat.cena, um, eksponat.tip, eksponat.x, eksponat.y);
                            }
                        })
                    })
                })
            })
        })
    })
})