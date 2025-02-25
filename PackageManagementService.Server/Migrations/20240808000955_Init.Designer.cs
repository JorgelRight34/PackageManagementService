﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PackageManagementService.Server.Models;

#nullable disable

namespace PackageManagementService.Server.Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    [Migration("20240808000955_Init")]
    partial class Init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PackageManagementService.Server.Models.Package", b =>
                {
                    b.Property<int>("packageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("packageId"));

                    b.Property<string>("destination")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("estimatedDelivery")
                        .HasColumnType("datetime2");

                    b.Property<string>("origin")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("receiverName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("senderName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("weight")
                        .HasColumnType("float");

                    b.HasKey("packageId");

                    b.ToTable("Package");
                });

            modelBuilder.Entity("PackageManagementService.Server.Models.Shipment", b =>
                {
                    b.Property<int>("shipmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("shipmentId"));

                    b.Property<DateTime>("arrivalTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("currentLocation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("departureTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("packageId")
                        .HasColumnType("int");

                    b.HasKey("shipmentId");

                    b.HasIndex("packageId");

                    b.ToTable("Shipment");
                });

            modelBuilder.Entity("PackageManagementService.Server.Models.Tracking", b =>
                {
                    b.Property<int>("trackingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("trackingId"));

                    b.Property<string>("location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("packageId")
                        .HasColumnType("int");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime?>("timestamp")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.HasKey("trackingId");

                    b.HasIndex("packageId");

                    b.ToTable("Tracking");
                });

            modelBuilder.Entity("PackageManagementService.Server.Models.Shipment", b =>
                {
                    b.HasOne("PackageManagementService.Server.Models.Package", "package")
                        .WithMany()
                        .HasForeignKey("packageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("package");
                });

            modelBuilder.Entity("PackageManagementService.Server.Models.Tracking", b =>
                {
                    b.HasOne("PackageManagementService.Server.Models.Package", "package")
                        .WithMany()
                        .HasForeignKey("packageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("package");
                });
#pragma warning restore 612, 618
        }
    }
}
