using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PatientVisitApp
{
    public class VisitHistory
    {
        [Key]
        [Column("visit_id")]
        public int VisitId { get; set; }

        [Column("patient_id")]
        public int PatientId { get; set; }

        [Column("visit_date")]
        public DateTime VisitDate { get; set; }

        [Column("hospital_id")]
        public int HospitalId { get; set; } 

        [Column("reason_for_visit")]
        public string ReasonForVisit { get; set; } = string.Empty;

        public Patient Patient { get; set; } = null!;
        public Hospital Hospital { get; set; } = null!;
    }
}
