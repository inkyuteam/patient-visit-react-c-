using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace PatientVisitApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitHistoryController : ControllerBase
    {
        private readonly ILogger<VisitHistoryController> _logger;
        private readonly AppDbContext _context;

        public VisitHistoryController(ILogger<VisitHistoryController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VisitHistoryDto>>> GetVisitHistoriesByPatientAndHospital(
    [FromQuery] int? patientId,
    [FromQuery] int? hospitalId)
        {
            var query = _context.Visits.AsQueryable();

            // Filter by patient ID
            if(patientId.HasValue)
            {
                query = query.Where(v => v.PatientId == patientId);
            }

            // If a hospitalId is provided, further filter by hospital ID
            if (hospitalId.HasValue)
            {
                query = query.Where(v => v.HospitalId == hospitalId.Value);
            }

            var visitHistories = await query
                .Include(v => v.Hospital)
                .Select(v => new VisitHistoryDto
                {
                    VisitId = v.VisitId,
                    PatientName = $"{v.Patient.FirstName} {v.Patient.LastName}",
                    VisitDate = v.VisitDate.ToString("yyyy-MM-dd"),
                    HospitalName = v.Hospital.HospitalName,
                    ReasonForVisit = v.ReasonForVisit
                })
                .ToListAsync();

            if (!visitHistories.Any())
            {
                return NotFound("No visit history found for the specified criteria.");
            }

            return visitHistories;
        }
    }
}
