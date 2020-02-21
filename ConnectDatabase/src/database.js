const sql = require('mssql')
const dbConfig = require("./dbConfig")

class Database {
    static async runQuery(query) {
        try {
            // const config = await dbConfig.getDBConfig();
            // console.log(config);

            const config = { database: 'Quant',
            server: '40.121.1.186',
            password: 'Init@123',
            username: 'test' };

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