using Microsoft.AspNetCore.Mvc;
using PackageManagementService.Server.Dtos.Tracking;
using PackageManagementService.Server.Interfaces;
using PackageManagementService.Server.Mappers;
using PackageManagementService.Server.Migrations;
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

        /// <summary>
        /// Obtiene todos los seguimientos
        /// </summary>
        /// <returns>Todos los seguimientos</returns>
        /// <response code="400">Si el JSON está mal formulado.</response>
        /// <response code="200">Si se retornan los seguimientos.</response>
        // GET: api/<TrackingController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var trackings = await _trackingRepo.GetAllAsync();

            var trackingsDto = trackings.Select(t => t.ToTrackingDto());

            return Ok(trackingsDto);
        }

        /// <summary>
        /// Crea un seguimiento
        /// </summary>
        /// <returns>El seguimiento creado.</returns>
        /// <response code="400">Si el JSON está mal formulado.</response>
        /// <response code="200">Si se crea éxitosamente.</response>
        // POST api/<TrackingController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateTrackingDto tracking)
        {
            var trackingModel = tracking.ToTrackingFromCreateDto();
            await _trackingRepo.CreateAsync(trackingModel);

            // Return 201 Created with the created tracking DTO in the response body
            return Created(string.Empty, trackingModel.ToTrackingDto());
        }

        /// <summary>
        /// Actualiza un seguimiento correspondiente al ID proporcionado
        /// </summary>
        /// <returns>El seguimiento actualizado.</returns>
        /// <response code="400">Si el JSON está mal formulado.</response>
        /// <response code="404">Si el seguimiento no se encuentra.</response>
        /// <response code="200">Si se actualiza el seguimiento.</response>
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

        /// <summary>
        /// Elimina un seguimiento correspondiente al ID proporcionado
        /// </summary>
        /// <returns>No retorna contenido.</returns>
        /// <response code="400">Si el JSON está mal formulado.</response>
        /// <response code="404">Si el seguimiento no se encuentra.</response>
        /// <response code="200">Si se borra el seguimiento.</response>
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

        /// <summary>
        /// Obtiene un seguimiento para un paquete en específico
        /// </summary>
        /// <returns>El seguimiento correspondiente al ID del paquete proporcionado.</returns>
        /// <response code="400">Si el JSON está mal formulado.</response>
        /// <response code="404">Si el seguimiento no se encuentra.</response>
        /// <response code="200">Si se encuentra el seguimiento.</response>
        // api/<TrackingController>/{packageId}
        [HttpGet("{packageId}")]
        public IActionResult Tracking(string packageId)
        {
            Regex regex = new Regex(@"PKG(\d{3})");
            Match match = regex.Match(packageId);
            int id;

            if (match.Success)
            {
                // Captura los tres dígitos encontrados en el grupo de captura
                string numberString = match.Groups[1].Value;

                // Intenta convertir la cadena a un entero
                if (int.TryParse(numberString, out id))
                {
                    var trackings = _context.Tracking.Where(t => t.packageId == id).ToList();
                    var trackingsDtos = trackings.Select(t => t.ToTrackingDto());
                    return Ok(trackingsDtos);
                }
                else
                {
                    return BadRequest();
                }
            } else
            {
                return BadRequest();
            }
        
        }
    }
}
