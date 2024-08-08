namespace PackageManagementService.Server.Dtos.Shipment
{
    public class UpdateShipmentDto
    {
        public DateTime departureTime { get; set; }
        public DateTime arrivalTime { get; set; }
        public string currentLocation { get; set; }
    }
}
