using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Izlozba")]
    public class Izlozba
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }

        [Column("N")]
        public int N {get; set;}

        [Column("M")]
        public int M {get; set; }

        public virtual List<Eksponat> Eksponati {get; set; } 
    }
}