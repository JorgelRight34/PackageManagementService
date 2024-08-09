using PackageManagementService.Server.Dtos.Package;
using PackageManagementService.Server.Models;

namespace PackageManagementService.Server.Interfaces
{
    public interface IPackageRepository
    {
        Task<List<Package>> GetAllAsync();
        Task<Package?> GetByIdAsync(int id);
        Task<Package> CreateAsync(Package packageModel);
        Task<Package> UpdateAsync(int id, UpdatePackageDto packageDto);
        Task<Package?> DeleteAsync(int id);
    }
}
