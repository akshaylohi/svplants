using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SVPlantApi.Models
{
    public class Plant
    {
        [Key]
        public int PlantId { get; set; }

        [Required]
        public string Status { get; set; }


        [Required]
        [MaxLength(30)]
        public string Name { get; set; }

        public DateTime LastWateredTime { get; set; }


    }
}
