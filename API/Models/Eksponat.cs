using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class Eksponat
    {
        [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv {get; set; }

        [Column("Cena")]
        public int Cena {get; set; }

        [Column("Tip")]
        [MaxLength(255)]
        public string Tip {get; set; }

        [Column("X")]
        public int X {get; set; }

        [Column("Y")]
        public int Y {get; set; }

        [Column("UmetnikID")]
        public int UmetnikID {get; set;}

        [JsonIgnore]
        public Izlozba Izlozba {get; set;}
    }
}