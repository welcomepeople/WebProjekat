using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Umetnik
    {
        [Key]
        [Column("ID")]
        public int ID {get; set; }

        [Column("Ime")]
        [MaxLength(255)]
        public string Ime {get; set; }

        [Column("MestoRodjenja")]
        [MaxLength(255)]
        public string MestoRodjenja { get; set;}

        [Column("GodinaRodjenja")]
        [MaxLength(4)]
        public string GodinaRodjenja {get; set;}

        [Column("BrojDela")]
        public int BrojDela {get; set; }
    }
}