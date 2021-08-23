using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Izlozba",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    N = table.Column<int>(type: "int", nullable: false),
                    M = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Izlozba", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Umetnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    MestoRodjenja = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    GodinaRodjenja = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: true),
                    BrojDela = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Umetnici", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Eksponati",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    Tip = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    X = table.Column<int>(type: "int", nullable: false),
                    Y = table.Column<int>(type: "int", nullable: false),
                    UmetnikID = table.Column<int>(type: "int", nullable: false),
                    IzlozbaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Eksponati", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Eksponati_Izlozba_IzlozbaID",
                        column: x => x.IzlozbaID,
                        principalTable: "Izlozba",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Eksponati_IzlozbaID",
                table: "Eksponati",
                column: "IzlozbaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Eksponati");

            migrationBuilder.DropTable(
                name: "Umetnici");

            migrationBuilder.DropTable(
                name: "Izlozba");
        }
    }
}
