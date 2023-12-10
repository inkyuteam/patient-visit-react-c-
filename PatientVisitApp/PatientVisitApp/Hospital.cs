using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PatientVisitApp
{
    public class Hospital
    {
        [Key]
        [Column("hospital_id")]
        public int HospitalId { get; set; }

        [Column("hospital_name")]
        public string HospitalName { get; set; } = string.Empty;

        [Column("address")]
        public string Address { get; set; } = string.Empty;
    }
}
