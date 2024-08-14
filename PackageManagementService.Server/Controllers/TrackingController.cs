using Microsoft.AspNetCore.Mvc;
using PackageManagementService.Server.Dtos.Tracking;
using PackageManagementService.Server.Interfaces;
using PackageManagementService.Server.Mappers;
using PackageManagementService.Server.Models;

using System.Text.RegularExpressions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PackageManagementService.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackingController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ITrackingRepository _trackingRepo;

        public TrackingController(ApplicationDBContext context, ITrackingRepository trackingRepo)
        {
            _context = context;
            _trackingRepo = trackingRepo;
        }

        // GET: api/<TrackingController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var trackings = await _trackingRepo.GetAllAsync();

            var trackingsDto = trackings.Select(t => t.ToTrackingDto());

            return Ok(trackingsDto);
        }

        // POST api/<TrackingController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateTrackingDto tracking)
        {
            var trackingModel = tracking.ToTrackingFromCreateDto();
            await _trackingRepo.CreateAsync(trackingModel);

            // Return 201 Created with the created tracking DTO in the response body
            return Created(string.Empty, trackingModel.ToTrackingDto());
        }

        // PUT api/<TrackingController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateTrackingDto tracking)
        {

            var trackingModel = await _trackingRepo.UpdateAsync(id, tracking);

            if (trackingModel == null)
            {
                return NotFound();
            }

            return Ok(trackingModel.ToTrackingDto());
        }

        // DELETE api/<TrackingController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tracking = await _trackingRepo.DeleteAsync(id);
            
            if (tracking  == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        // api/<TrackingController>/{packageId}
        [HttpGet("{packageId}")]
        public IActionResult Tracking(string packageId)
        {
            int numberPartOfId = int.Parse(Regex.Match(packageId, @"\d+").Value);

            var trackings = _context.Tracking.Where(t => t.packageId == numberPartOfId).ToList();
            var trackingsDtos = trackings.Select(t => t.ToTrackingDto());
            return Ok(trackingsDtos);
        }
    }
}
