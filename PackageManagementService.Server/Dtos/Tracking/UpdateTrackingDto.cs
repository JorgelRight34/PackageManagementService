namespace PackageManagementService.Server.Dtos.Tracking
{
    public class UpdateTrackingDto
    {
        public int packageId { get; set; }
        public string status { get; set; }
        public string location { get; set; }
    }
}
