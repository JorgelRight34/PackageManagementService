using PackageManagementService.Server.Dtos.Tracking;
using PackageManagementService.Server.Models;
using System.Text.RegularExpressions;

namespace PackageManagementService.Server.Mappers
{
    public static class TrackingMappers
    {
        public static TrackingDto ToTrackingDto(this Tracking tracking)
        {
            return new TrackingDto
            {
                trackingId = $"TRACK{tracking.trackingId:D4}",
                packageId = $"PKG{tracking.packageId:D4}",
                //package = tracking.package.ToPackageDto(),
                status = tracking.status,
                timestamp = tracking.timestamp,
                location = tracking.location,
            };
        }

        public static Tracking ToTrackingFromCreateDto(this CreateTrackingDto tracking)
        {
            string numberPartOfId = Regex.Match(tracking.packageId, @"\d+").Value;
            return new Tracking
            {
                packageId = int.Parse(numberPartOfId),
                status = tracking.status,
                timestamp = tracking.timestamp,
                location = tracking.location,
            };
        }
    }
}
