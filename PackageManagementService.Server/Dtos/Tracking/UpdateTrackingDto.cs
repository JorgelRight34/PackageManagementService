namespace PackageManagementService.Server.Dtos.Tracking
{
    public class UpdateTrackingDto
    {
        public string packageId { get; set; }
        public string status { get; set; }
        public string location { get; set; }
    }
}
