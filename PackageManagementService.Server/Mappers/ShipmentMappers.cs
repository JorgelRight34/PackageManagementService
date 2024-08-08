using PackageManagementService.Server.Dtos.Shipment;
using PackageManagementService.Server.Models;

namespace PackageManagementService.Server.Mappers
{
    public static class ShipmentMappers
    {
        public static ShipmentDto ToShipmentDto(this Shipment shipment)
        {
            return new ShipmentDto
            {
                shipmentId = shipment.shipmentId,
                packageId = shipment.packageId,
                package = shipment.package.ToPackageDto(),
                departureTime = shipment.departureTime,
                arrivalTime = shipment.arrivalTime,
                currentLocation = shipment.currentLocation,
            };
        }
           
        public static Shipment ToShipmentFromCreateDto(this CreateShipmentDto shipment) 
        {
            return new Shipment
            {
                packageId = shipment.packageId,
                departureTime = shipment.departureTime,
                arrivalTime = shipment.arrivalTime,
                currentLocation = shipment.currentLocation,
            };
        }
    }
}
