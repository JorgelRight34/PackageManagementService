using Microsoft.AspNetCore.Mvc;
using PackageManagementService.Server.Dtos.Shipment;
using PackageManagementService.Server.Mappers;
using PackageManagementService.Server.Models;
using PackageManagementService.Server.Repository;
using ShipmentManagementService.Server.Interfaces;

namespace PackageManagementService.Server.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ShipmentController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IShipmentRepository _shipmentRepo;
        public ShipmentController(ApplicationDBContext context, IShipmentRepository shipmentRepo)
        {
            _context = context;
            _shipmentRepo = shipmentRepo;
        }

        /// <summary>
        /// Obtiene todos los envíos
        /// </summary>
        /// <returns>Todos los envíos</returns>
        /// <response code="400">Si el JSON está mal formulado.</response>
        /// <response code="200">Si se retornan los envíos.</response>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var shipments = await _shipmentRepo.GetAllAsync();
            var shipmentsDto = shipments.Select(s => s.ToShipmentDto());

            return Ok(shipmentsDto);
        }

        /// <summary>
        /// Obtiene un envío
        /// </summary>
        /// <returns>El envío correspondiente al ID proporcionado.</returns>
        /// <response code="400">Si el JSON está mal formulado.</response>
        /// <response code="404">Si el envío no se encuentra.</response>
        /// <response code="200">Si se encuentra el envío.</response>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var shipment = await _shipmentRepo.GetByIdAsync(id);

            if (shipment == null)
            {
                return NotFound();
            }

            return Ok(shipment.ToShipmentDto());
        }


        /// <summary>
        /// Crea un envío
        /// </summary>
        /// <returns>El envío creado.</returns>
        /// <response code="400">Si el JSON está mal formulado.</response>
        /// <response code="200">Si se crea éxitosamente.</response>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateShipmentDto shipment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var shipmentModel = shipment.ToShipmentFromCreateDto();
            await _shipmentRepo.CreateAsync(shipmentModel);

            return CreatedAtAction(nameof(Get), new { id = shipmentModel.shipmentId }, shipmentModel.ToShipmentDto());
        }

        /// <summary>
        /// Actualiza un envío correspondiente al ID proporcionado
        /// </summary>
        /// <returns>El envío actualizado.</returns>
        /// <response code="400">Si el JSON está mal formulado.</response>
        /// <response code="404">Si el envío no se encuentra.</response>
        /// <response code="200">Si se actualiza el envío.</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateShipmentDto shipment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var shipmentModel = await _shipmentRepo.UpdateAsync(id, shipment);

            if (shipmentModel == null)
            {
                return NotFound();
            }

            return Ok(shipmentModel.ToShipmentDto());
        }

        /// <summary>
        /// Elimina un envío correspondiente al ID proporcionado
        /// </summary>
        /// <returns>No retorna contenido.</returns>
        /// <response code="400">Si el JSON está mal formulado.</response>
        /// <response code="404">Si el envío no se encuentra.</response>
        /// <response code="200">Si se borra el envío.</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var shipment = await _shipmentRepo.DeleteAsync(id);

            if (shipment == null)
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}
