using System.ComponentModel.DataAnnotations;

namespace PackageManagementService.Server.Models
{
    public class Package
    {

        [Key]
        public int packageId { get; set; }
        [Required]
        public string senderName { get; set; }
        [Required]
        public string receiverName { get; set; }
        [Required]
        public string origin { get; set; }
        [Required]
        public string destination { get; set; }
        [Required]
        public double weight { get; set; }
        [Required]
        public string status { get; set; }
        public DateTime estimatedDelivery { get; set; }
    }
}
