using System.ComponentModel.DataAnnotations;

namespace PackageManagementService.Server.Models
{
    public class Shipment
    {
        [Key]
        public int shipmentId { get; set; }
        [Required]
        public int packageId { get; set; }
        // Navigator 
        public Package? package { get; set; }
        [Required]
        public DateTime departureTime { get; set; }
        [Required]
        public DateTime arrivalTime {  get; set; }
        [Required]
        public string currentLocation {  get; set; }    
    }
}
