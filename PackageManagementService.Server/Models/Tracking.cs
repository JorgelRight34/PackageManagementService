using System.ComponentModel.DataAnnotations;

namespace PackageManagementService.Server.Models
{
    public class Tracking
    {
        [Key]
        public int trackingId {  get; set; }    
        [Required]
        public int packageId {  get; set; }
        // Navigator
        public Package? package { get; set; }
        [Required]
        [MaxLength(255)]
        public string status { get; set; }
        [Required]
        public DateTime timestamp { get; set; } = DateTime.Now;
        [Required]
        public string location { get; set; }    
    }
}
