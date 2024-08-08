using PackageManagementService.Server.Dtos.Tracking;
using PackageManagementService.Server.Models;

namespace PackageManagementService.Server.Interfaces
{
    public interface ITrackingRepository
    {

        Task<List<Tracking>> GetAllAsync();
        Task<Tracking?> GetByIdAsync(int id);
        Task<Tracking> CreateAsync(Tracking TrackingModel);
        Task<Tracking> UpdateAsync(int id, UpdateTrackingDto TrackingDto);
        Task<Tracking?> DeleteAsync(int id);
    }
}
