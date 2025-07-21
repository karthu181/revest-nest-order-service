import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddOrdersTable1753086093836 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "productId",
            type: "uuid",
          },
          {
            name: "quantity",
            type: "integer",
          },
          {
            name: "totalPrice",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "status",
            type: "varchar",
          },
        ],
      })
    );

    // Add foreign key after creating the table
    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        columnNames: ["productId"],
        referencedTableName: "products", // or "products" if your table name is plural
        referencedColumnNames: ["id"],
        onDelete: "CASCADE", // or "SET NULL", "RESTRICT", depending on your use case
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // You must drop the foreign key before dropping the table
    const table = await queryRunner.getTable("orders");
    const foreignKey = table?.foreignKeys.find(
      fk => fk.columnNames.indexOf("productId") !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("orders", foreignKey);
    }

    await queryRunner.dropTable("orders");
  }
}
