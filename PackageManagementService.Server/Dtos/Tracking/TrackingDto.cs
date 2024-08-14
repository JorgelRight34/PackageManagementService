using PackageManagementService.Server.Dtos.Package;
using System.ComponentModel.DataAnnotations;

namespace PackageManagementService.Server.Dtos.Tracking
{
    public class TrackingDto
    {
        public string trackingId { get; set; }
        public string packageId { get; set; }
        // public PackageDto package { get; set; }
        public string status { get; set; }
        public string timestamp { get; set; }
        public string location { get; set; }
    }
}
