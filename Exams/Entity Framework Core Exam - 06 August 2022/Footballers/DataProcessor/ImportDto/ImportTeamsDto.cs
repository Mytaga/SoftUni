using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Footballers.DataProcessor.ImportDto
{
    [JsonObject]
    public class ImportTeamsDto
    {
        [Required]
        [StringLength(40), MinLength(3)]
        [RegularExpression(@"^[A-Za-z.\-\d\s]+$")]
        public string Name { get; set; }

        [Required]
        [StringLength(40), MinLength(2)]
        public string Nationality { get; set; }

        [Required]
        public int Trophies { get; set; }

        public List<int> Footballers { get; set; }
    }
}
