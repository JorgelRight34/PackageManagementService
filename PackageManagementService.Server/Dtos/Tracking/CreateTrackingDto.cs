namespace PackageManagementService.Server.Dtos.Tracking
{
    public class CreateTrackingDto
    {
        public string packageId { get; set; }
        public string status { get; set; }
        public DateTime timestamp { get; set; } = DateTime.Now;
        public string location { get; set; }
    }
}
