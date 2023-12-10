using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace PatientVisitApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly ILogger<PatientController> _logger;
        private readonly AppDbContext _context;

        public PatientController(ILogger<PatientController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientDto>>> GetPatients()
        {
            // return await _context.Patients.ToListAsync();
            var patients = await _context.Patients
            .Select(p => new PatientDto
            {
                PatientId = p.PatientId,
                FullName = $"{p.FirstName} {p.LastName}",
                DateOfBirth = p.DateOfBirth.ToString("yyyy-MM-dd"), // Formatting date as string
                Gender = p.Gender
            })
            .ToListAsync();

            return Ok(patients);
        }

        // GET: api/patients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PatientDto>> GetPatient(int id)
        {
            var patientEntity = await _context.Patients.FindAsync(id);

            if (patientEntity == null)
            {
                return NotFound();
            }

            // Create a new PatientDto object and map the properties from the Patient entity
            var patientDto = new PatientDto
            {
                PatientId = patientEntity.PatientId,
                FullName = $"{patientEntity.FirstName} {patientEntity.LastName}",
                DateOfBirth = patientEntity.DateOfBirth.ToString("yyyy-MM-dd"), // Format date as needed
                Gender = patientEntity.Gender
            };

            return Ok(patientDto);
        }
    }
}
