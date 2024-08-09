using PackageManagementService.Server.Dtos.Shipment;
using PackageManagementService.Server.Models;


namespace ShipmentManagementService.Server.Interfaces
{
    public interface IShipmentRepository
    {
        Task<List<Shipment>> GetAllAsync();
        Task<Shipment?> GetByIdAsync(int id);
        Task<Shipment> CreateAsync(Shipment ShipmentModel);
        Task<Shipment> UpdateAsync(int id, UpdateShipmentDto ShipmentDto);
        Task<Shipment?> DeleteAsync(int id);
    }
}
