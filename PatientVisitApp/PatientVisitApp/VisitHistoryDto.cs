namespace PatientVisitApp
{
    public class VisitHistoryDto
    {
        public int VisitId { get; set; }
        public string PatientName { get; set; } = string.Empty;
        public string HospitalName { get; set; } = string.Empty;
        public string VisitDate { get; set; } = string.Empty;
        public string ReasonForVisit { get; set; } = string.Empty;
    }
}
