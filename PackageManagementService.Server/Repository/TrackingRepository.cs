using Microsoft.EntityFrameworkCore;
using PackageManagementService.Server.Dtos.Tracking;
using PackageManagementService.Server.Interfaces;
using PackageManagementService.Server.Models;

namespace PackageManagementService.Server.Repository
{
    public class TrackingRepository : ITrackingRepository
    {
        private readonly ApplicationDBContext _context;
        public TrackingRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Tracking> CreateAsync(Tracking TrackingModel)
        {
            await _context.Tracking.AddAsync(TrackingModel);
            await _context.SaveChangesAsync();

            return TrackingModel;
        }

        public async Task<Tracking?> DeleteAsync(int id)
        {
            var tracking = await _context.Tracking.FindAsync(id);

            if (tracking == null)
            {
                return null;
            }

            _context.Tracking.Remove(tracking);
            await _context.SaveChangesAsync();
            return tracking; 
        }

        public async Task<List<Tracking>> GetAllAsync()
        {
            return await _context.Tracking.Include(t => t.package).ToListAsync();
        }

        public async Task<Tracking?> GetByIdAsync(int id)
        {
            return await _context.Tracking.Include(t => t.package).FirstOrDefaultAsync(t => t.trackingId == id);
        }

        public async Task<Tracking> UpdateAsync(int id, UpdateTrackingDto trackingDto)
        {
            var trackingModel = await _context.Tracking.FirstOrDefaultAsync(t => t.trackingId == id);

            if (trackingModel == null)
            {
                return null;
            }

            trackingModel.packageId = trackingDto.packageId;
            trackingModel.status = trackingDto.status;
            trackingModel.location = trackingDto.location;

            await _context.SaveChangesAsync();

            return trackingModel;
        }
    }
}
