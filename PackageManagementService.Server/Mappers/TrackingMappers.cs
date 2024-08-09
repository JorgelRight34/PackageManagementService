using PackageManagementService.Server.Dtos.Tracking;
using PackageManagementService.Server.Models;

namespace PackageManagementService.Server.Mappers
{
    public static class TrackingMappers
    {
        public static TrackingDto ToTrackingDto(this Tracking tracking)
        {
            return new TrackingDto
            {
                trackingId = tracking.trackingId,
                packageId = tracking.packageId,
                package = tracking.package.ToPackageDto(),
                status = tracking.status,
                timestamp = tracking.timestamp,
                location = tracking.location,
            };
        }

        public static Tracking ToTrackingFromCreateDto(this CreateTrackingDto tracking)
        {
            return new Tracking
            {
                packageId = tracking.packageId,
                status = tracking.status,
                timestamp = tracking.timestamp,
                location = tracking.location,
            };
        }
    }
}
