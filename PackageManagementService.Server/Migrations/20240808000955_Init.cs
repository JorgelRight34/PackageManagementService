using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PackageManagementService.Server.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Package",
                columns: table => new
                {
                    packageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    senderName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    receiverName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    origin = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    destination = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    weight = table.Column<double>(type: "float", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    estimatedDelivery = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Package", x => x.packageId);
                });

            migrationBuilder.CreateTable(
                name: "Shipment",
                columns: table => new
                {
                    shipmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    packageId = table.Column<int>(type: "int", nullable: false),
                    departureTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    arrivalTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    currentLocation = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shipment", x => x.shipmentId);
                    table.ForeignKey(
                        name: "FK_Shipment_Package_packageId",
                        column: x => x.packageId,
                        principalTable: "Package",
                        principalColumn: "packageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tracking",
                columns: table => new
                {
                    trackingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    packageId = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tracking", x => x.trackingId);
                    table.ForeignKey(
                        name: "FK_Tracking_Package_packageId",
                        column: x => x.packageId,
                        principalTable: "Package",
                        principalColumn: "packageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Shipment_packageId",
                table: "Shipment",
                column: "packageId");

            migrationBuilder.CreateIndex(
                name: "IX_Tracking_packageId",
                table: "Tracking",
                column: "packageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Shipment");

            migrationBuilder.DropTable(
                name: "Tracking");

            migrationBuilder.DropTable(
                name: "Package");
        }
    }
}
