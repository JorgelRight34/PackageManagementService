﻿namespace PackageManagementService.Server.Dtos.Package
{
    public class UpdatePackageDto
    {
        public string senderName { get; set; }
        public string receiverName { get; set; }
        public string origin { get; set; }
        public string destination { get; set; }
        public double weight { get; set; }
        public string status { get; set; }
        public DateTime estimatedDelivery { get; set; }
    }
}
