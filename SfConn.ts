import snowflake, { Binds } from 'snowflake-sdk';

export class SfConn {
  private connection: snowflake.Connection;
  private tableName: string;
  constructor(connection: snowflake.Connection) {
    this.connection = connection;

    if (!process.env.SF_TABLE_NAME) {
      throw new Error('Missing Snowflake table name env - SF_TABLE_NAME');
    }
    
    this.tableName = process.env.SF_TABLE_NAME;
  }

  static async getConnection(config: snowflake.ConnectionOptions) {
    const conn = snowflake.createConnection(config);
    const newConnection: snowflake.Connection = await new Promise((resolve, reject) => {
      conn.connect((err: snowflake.SnowflakeError | undefined, conn: snowflake.Connection) => (err ? reject(err) : resolve(conn)));
    });

    const sfConn = new SfConn(newConnection);

    await sfConn.createTable();
    return sfConn;
  }

  getTableName() {
    return this.tableName;
  }

  async createTable() {
    const sqlText = `CREATE OR REPLACE TABLE ${this.tableName} (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name VARCHAR(255),
        description VARCHAR(1000)
    );`;

    await this.write(sqlText);
  }

  async write(sqlText: string) {
    const results = await new Promise((resolve, reject) => {
      this.connection.execute({
        sqlText: sqlText,
        complete(err, stmt, rows) {
          if (err) {
            return reject(err);
          }

          resolve({ stmt, rows });
        },
      });
    });

    console.log(results);
  }
}
