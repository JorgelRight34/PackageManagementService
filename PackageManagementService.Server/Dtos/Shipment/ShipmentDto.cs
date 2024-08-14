using PackageManagementService.Server.Dtos.Package;

namespace PackageManagementService.Server.Dtos.Shipment
{
    public class ShipmentDto
    {
        public string shipmentId { get; set; } 
        public string packageId { get; set; }  
        // public PackageDto package { get; set; } 
        public string departureTime { get; set; }
        public string arrivalTime { get; set; }
        public string currentLocation { get; set; }
    }
}
