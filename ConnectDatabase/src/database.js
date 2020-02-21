const sql = require('mssql')
const dbConfig = require("./dbConfig")

class Database {
    static async runQuery(query) {
        try {
            // const config = await dbConfig.getDBConfig();
            // console.log(config);

            const config = { DATABASE_NAME: 'Quant',
            DATABASE_SERVER: '40.121.1.186',
            DATABASE_PASSWORD: 'Init@123',
            DATABASE_USER: 'test' };
            
            await sql.connect(config);
            const result = await sql.query(query)
            sql.close()
            return result["recordset"]
        } catch (e) {
            //slack.notifyError(e);
            throw e
        }
    }
}
module.exports = Database