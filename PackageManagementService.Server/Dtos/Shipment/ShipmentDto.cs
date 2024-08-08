using PackageManagementService.Server.Dtos.Package;

namespace PackageManagementService.Server.Dtos.Shipment
{
    public class ShipmentDto
    {
        public int shipmentId { get; set; } 
        public int packageId { get; set; }  
        public PackageDto package { get; set; } 
        public DateTime departureTime { get; set; }
        public DateTime arrivalTime { get; set; }
        public string currentLocation { get; set; }
    }
}
