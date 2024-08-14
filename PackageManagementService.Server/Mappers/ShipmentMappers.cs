using PackageManagementService.Server.Dtos.Shipment;
using PackageManagementService.Server.Models;

using System.Text.RegularExpressions;

namespace PackageManagementService.Server.Mappers
{
    public static class ShipmentMappers
    {
        public static ShipmentDto ToShipmentDto(this Shipment shipment)
        {
            return new ShipmentDto
            {
                shipmentId = $"SHIP{shipment.shipmentId:D4}",
                packageId = $"PKG{shipment.packageId:D4}",
                // package = shipment.package.ToPackageDto(),
                departureTime = shipment.departureTime.ToString("MM-dd-yyyy"),
                arrivalTime = shipment.arrivalTime.ToString("MM-dd-yyyy"),
                currentLocation = shipment.currentLocation,
            };
        }
           
        public static Shipment ToShipmentFromCreateDto(this CreateShipmentDto shipment) 
        {
            string numberPartOfId = Regex.Match(shipment.packageId, @"\d+").Value;
            return new Shipment
            {
                packageId = int.Parse(numberPartOfId), // Extract integer part.
                departureTime = shipment.departureTime,
                arrivalTime = shipment.arrivalTime,
                currentLocation = shipment.currentLocation,
            };
        }
    }
}
