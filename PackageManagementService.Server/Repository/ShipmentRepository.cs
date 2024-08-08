using Microsoft.EntityFrameworkCore;
using PackageManagementService.Server.Dtos.Shipment;
using PackageManagementService.Server.Models;
using ShipmentManagementService.Server.Interfaces;

namespace PackageManagementService.Server.Repository
{
    public class ShipmentRepository : IShipmentRepository
    {
        private readonly ApplicationDBContext _context;
        public ShipmentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Shipment> CreateAsync(Shipment shipmentModel)
        {
            await _context.Shipment.AddAsync(shipmentModel);
            await _context.SaveChangesAsync();

            return shipmentModel;
        }

        public async Task<Shipment?> DeleteAsync(int id)
        {
            var shipment = await _context.Shipment.FindAsync(id);

            if (shipment == null)
            {
                return null;
            }

            _context.Shipment.Remove(shipment);
            await _context.SaveChangesAsync();

            return shipment;
        }

        public async Task<List<Shipment>> GetAllAsync()
        {
            return await _context.Shipment.Include(s => s.package).ToListAsync();
        }

        public async Task<Shipment?> GetByIdAsync(int id)
        {
            return await _context.Shipment.Include(s => s.package).FirstOrDefaultAsync(s => s.shipmentId == id);
        }

        public async Task<Shipment> UpdateAsync(int id, UpdateShipmentDto shipmentDto)
        {
            var shipmentModel = await _context.Shipment.FirstOrDefaultAsync(s => s.shipmentId == id);

            if (shipmentModel == null)
            {
                return null;
            }

            shipmentModel.arrivalTime = shipmentDto.arrivalTime;
            shipmentModel.departureTime = shipmentDto.departureTime;
            shipmentModel.currentLocation = shipmentDto.currentLocation;

            await _context.SaveChangesAsync();      
            return shipmentModel;
        }
    }
}
