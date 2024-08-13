using Microsoft.AspNetCore.Mvc;
using PackageManagementService.Server.Dtos.Package;
using PackageManagementService.Server.Interfaces;
using PackageManagementService.Server.Mappers;
using PackageManagementService.Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PackageManagementService.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IPackageRepository _packageRepo;
        public PackageController(ApplicationDBContext context, IPackageRepository packageRepo)
        {
            _context = context;
            _packageRepo = packageRepo;
        }

        /// <summary>
        /// Obtiene todos los paquetes
        /// </summary>
        /// <returns>El paquete correspondiente al ID proporcionado.</returns>
        /// <response code="200">Si se encuentra el paquete.</response>
        // GET: api/<PackageController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var packages = await _packageRepo.GetAllAsync();

            var packagesList  = packages.Select(p => p.ToPackageDto());

            return Ok(packagesList);
        }

        /// <summary>
        /// Obtiene un paquete específico por su ID.
        /// </summary>
        /// <param name="id">El ID del paquete.</param>
        /// <returns>El paquete correspondiente al ID proporcionado.</returns>
        /// <response code="200">Si se encuentra el paquete.</response>
        /// <response code="404">Si el paquete no existe.</response>
        // GET api/<PackageController>/5
        [HttpGet("{id}:int")]
        public async Task<IActionResult> Get(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var package = await _packageRepo.GetByIdAsync(id);

            if (package == null)
            {
                return NotFound();
            }

            return Ok(package.ToPackageDto());
        }

        /// <summary>
        /// Crea un paquete específico.
        /// </summary>
        /// <param name="package">El JSON representando al paquete</param>
        /// <returns>El paquete correspondiente al JSON proporcionado.</returns>
        /// <response code="200">Si se crea el paquete.</response>
        /// <response code="400">Si el JSON no tiene la estructura correcta</response>
        // POST api/<PackageController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreatePackageDto package)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var packageModel = package.ToPackageFromCreateDto();
            await _packageRepo.CreateAsync(packageModel);

            return CreatedAtAction(nameof(Get), new { id = packageModel.packageId }, packageModel.ToPackageDto());
        }

        /// <summary>
        /// Actualiza un paquete específico.
        /// </summary>
        /// <param name="package">El ID del paquete</param>
        /// <returns>El paquete actualizado.</returns>
        /// <response code="200">Si se crea el paquete.</response>
        /// <response code="400">Si el JSON está mal formulado</response>
        /// <response code="404">Si el paquete no se encuentra</response>
        // PUT api/<PackageController>/5
        [HttpPut("{id}:int")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdatePackageDto package)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var packageModel = await _packageRepo.UpdateAsync(id, package);

            if (packageModel == null) 
            {
                return NotFound();
            }

            return Ok(packageModel.ToPackageDto());
        }

        /// <summary>
        /// Borra un paquete específico.
        /// </summary>
        /// <param name="id">El ID del paquete</param>
        /// <returns>No retorna contenido.</returns>
        /// <response code="200">Si se borra el paquete.</response>
        /// <response code="400">Si el JSON está mal formulado</response>
        /// <response code="404">Si el paquete no se encuentra</response>
        // DELETE api/<PackageController>/5
        [HttpDelete("{id}:int")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var package = await _packageRepo.DeleteAsync(id);

            if (package == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
