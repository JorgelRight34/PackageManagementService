using Microsoft.EntityFrameworkCore;
using PackageManagementService.Server.Dtos.Package;
using PackageManagementService.Server.Interfaces;
using PackageManagementService.Server.Models;

namespace PackageManagementService.Server.Repository
{
    public class PackageRepository : IPackageRepository
    {
        private readonly ApplicationDBContext _context;
        public PackageRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Package> CreateAsync(Package packageModel)
        {
            await _context.Package.AddAsync(packageModel);
            await _context.SaveChangesAsync();

            return packageModel;
        }

        public async Task<Package?> DeleteAsync(int id)
        {
            var packageModel = await _context.Package.FindAsync(id);

            if (packageModel == null)
            {
                return null;
            }

            _context.Package.Remove(packageModel);
            await _context.SaveChangesAsync();

            return packageModel;
        }

        public async Task<List<Package>> GetAllAsync()
        {
            return await _context.Package.ToListAsync();
        }

        public async Task<Package?> GetByIdAsync(int id)
        {
            return await _context.Package.FindAsync(id);

        }

        public async Task<Package> UpdateAsync(int id, UpdatePackageDto packageDto)
        {
            var package = await _context.Package.FirstOrDefaultAsync(p => p.packageId == id);

            if (package == null)
            {
                return null;
            }

            package.senderName = packageDto.senderName;
            package.receiverName = packageDto.receiverName;
            package.origin = packageDto.origin;
            package.destination = packageDto.destination;
            package.weight = packageDto.weight;
            package.status = packageDto.status;
            package.estimatedDelivery = packageDto.estimatedDelivery;

            await _context.SaveChangesAsync();

            return package;
        }
    }
}
