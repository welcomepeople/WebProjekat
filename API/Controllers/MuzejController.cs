using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MuzejController : ControllerBase
    {

        public MuzejContext Context {get; set; }
        public MuzejController(MuzejContext context)
        {
            Context = context;
        }
        
        //Read za izlozbu
        [Route("PreuzimanjeIzlozbe")]
        [HttpGet]
        public async Task<List<Izlozba>> PreuzimanjeIzlozbe()
        {
            return await Context.Izlozbe.Include(p => p.Eksponati).ToListAsync();
        }

        //Create za eksponat
        // [Route("DodavanjeEksponata/{idIzlozbe")]
        // [HttpPost]
        // public async Task<IActionResult> IzlaganjeEksponata(int idIzlozbe, [FromBody] Eksponat eksponat)
        // {
        //     var izlozba = await Context.Izlozbe.FindAsync(idIzlozbe);
        //     var umetnik = await Context.Umetnici.FindAsync(eksponat.UmetnikID);
        //     eksponat.Izlozba = izlozba;
            
        //     if(Context.Eksponati.Any(temp => temp.Naziv == eksponat.Naziv && temp.Tip == eksponat.Tip && (temp.X != eksponat.X || temp.Y != eksponat.Y)))
        //     {
        //         var xy = Context.Eksponati.Where(p => p.Tip == eksponat.Tip).FirstOrDefault();
        //         return BadRequest(new { X = xy?.X, Y = xy?.Y});
        //     }

        //     var temp = Context.Eksponati.Where(p => p.X == eksponat.X && p.Y == eksponat.Y).FirstOrDefault();

        //     if(temp != null)
        //     {
        //         if(temp.Cena != eksponat.Cena)
        //             return StatusCode(409);
        //         else
        //             return StatusCode(406);
        //     }
        //     else
        //     {
        //         umetnik.BrojDela++;
        //         Context.Eksponati.Add(eksponat);
        //         await Context.SaveChangesAsync();
        //         return Ok();
        //     }
        // }

        [Route("DodavanjeEksponata/{idIzlozbe}")]
        [HttpPost]
        public async Task<IActionResult> DodavanjeEksponata(int idIzlozbe, [FromBody] Eksponat eksponat)
        {
            var izlozba = await Context.Izlozbe.FindAsync(idIzlozbe);
            var umetnik = await Context.Umetnici.FindAsync(eksponat.UmetnikID);

            eksponat.Izlozba = izlozba;

            if (Context.Eksponati.Any(temp => temp.Naziv == eksponat.Naziv && temp.Tip == eksponat.Tip && (temp.X != eksponat.X || temp.Y != eksponat.Y)))
            {
                var xy = Context.Eksponati.Where(p => p.Tip == eksponat.Tip).FirstOrDefault();
                return BadRequest(new { X = xy?.X, Y = xy?.Y });
            }

            var temp = Context.Eksponati.Where(p => p.X == eksponat.X && p.Y == eksponat.Y && p.Izlozba == eksponat.Izlozba).FirstOrDefault();

            if (temp != null)
            {
                if (temp.Cena != eksponat.Cena){
                    return StatusCode(409);
                }
                else
                    return StatusCode(406);
            }
            else
            {
                umetnik.BrojDela++;
                Context.Eksponati.Add(eksponat);
                await Context.SaveChangesAsync();
                return Ok();
            }

        }
        
        //Update za eksponat
        [Route("UpdateCenu/{idIzlozbe}")]
        [HttpPut]
        public async Task AzuriranjeCene(int idIzlozbe, [FromBody] Eksponat eksponat)
        {
            var temp = Context.Eksponati.Where(p => p.X == eksponat.X && p.Y == eksponat.Y && p.Izlozba.ID == idIzlozbe).FirstOrDefault();
            temp.Cena = eksponat.Cena;

            Context.Update<Eksponat>(temp);
            await Context.SaveChangesAsync();
        }

        //Delete za eksponat
        [Route("UklanjanjeEksponata/{idIzlozbe}")]
        [HttpDelete]
        public async Task<IActionResult> UklanjanjeEksponata(int idIzlozbe, [FromBody] Eksponat eksponat)
        {
            var temp = Context.Eksponati.Where(p => p.X == eksponat.X && p.Y == eksponat.Y && p.Izlozba.ID == idIzlozbe).FirstOrDefault();
            var umetnik = await Context.Umetnici.FindAsync(temp.UmetnikID);

            if(temp != null)
            {
                umetnik.BrojDela--;
                Context.Remove<Eksponat>(temp);
                await Context.SaveChangesAsync();
                return Ok();
            }
            else
                return StatusCode(406);
        }

        //Read za umetnika
        [Route("PreuzimanjeUmetnika")]
        [HttpGet]
        public async Task<List<Umetnik>> PreuzimanjeUmetnika()
        {
            return await Context.Umetnici.ToListAsync();
        }

        [Route("KreirajIzlozbu")]
        [HttpPost]
        public async Task KreirajIzlozbu([FromBody] Izlozba izlozba)
        {
            Context.Izlozbe.Add(izlozba);
            await Context.SaveChangesAsync();
        }

        [Route("KreirajUmetnika")]
        [HttpPost]
        public async Task KreirajUmetnika([FromBody] Umetnik umetnik)
        {
            Context.Umetnici.Add(umetnik);
            await Context.SaveChangesAsync();
        }

        [Route("PreuzimanjeEksponata")]
        [HttpGet]
        public async Task<List<Eksponat>> PreuzimanjeEksponata()
        {
            return await Context.Eksponati.ToListAsync();
        }
    }
}
