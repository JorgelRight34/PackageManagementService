namespace PackageManagementService.Server.Dtos.Shipment
{
    public class CreateShipmentDto
    {
        public int packageId { get; set; }
        public DateTime departureTime { get; set; }
        public DateTime arrivalTime { get; set; }
        public string currentLocation { get; set; }
    }
}
