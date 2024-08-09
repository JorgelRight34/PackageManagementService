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
            var packages = await _packageRepo.GetAllAsync();

            var packagesList  = packages.Select(p => p.ToPackageDto());

            return Ok(packagesList);
        }

        // GET api/<PackageController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
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
            var packageModel = package.ToPackageFromCreateDto();
            await _packageRepo.CreateAsync(packageModel);

            return CreatedAtAction(nameof(Get), new { id = packageModel.packageId }, packageModel.ToPackageDto());
        }

        // PUT api/<PackageController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdatePackageDto package)
        {
            var packageModel = await _packageRepo.UpdateAsync(id, package);

            if (packageModel == null) 
            {
                return NotFound();
            }

            return Ok(packageModel.ToPackageDto());
        }

        // DELETE api/<PackageController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var package = await _packageRepo.DeleteAsync(id);

            if (package == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
