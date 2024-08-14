using PackageManagementService.Server.Dtos.Package;
using PackageManagementService.Server.Models;

namespace PackageManagementService.Server.Mappers
{
    public static class PackageMappers
    {
        public static PackageDto ToPackageDto(this Package packageDto)
        {
            return new PackageDto
            {
                packageId = $"PKG{packageDto.packageId:D4}",
                senderName = packageDto.senderName,
                receiverName = packageDto.receiverName,
                origin = packageDto.origin,
                destination = packageDto.destination,
                weight = packageDto.weight,
                status = packageDto.status,
                estimatedDelivery = packageDto.estimatedDelivery.ToString("MM-dd-yyyy")
        };
        }

        public static Package ToPackageFromCreateDto(this CreatePackageDto packageDto)
        {
            return new Package
            {
                senderName = packageDto.senderName,
                receiverName = packageDto.receiverName,
                origin = packageDto.origin,
                destination = packageDto.destination,
                weight = packageDto.weight,
                status = packageDto.status,
                estimatedDelivery = packageDto.estimatedDelivery,
            };
        }
    }
}
