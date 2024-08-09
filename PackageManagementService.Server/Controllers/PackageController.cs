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

        // GET: api/<PackageController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var packages = await _packageRepo.GetAllAsync();

            var packagesDto = packages.Select(p => p.ToPackageDto());

            return Ok(packages);
        }

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

            return CreatedAtAction(nameof(Get), new { id = packageModel.packageId }, packageModel);
        }

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
