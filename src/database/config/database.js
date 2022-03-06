const Sequelize = require('sequelize');

if (process.env.APP_DEBUG == 'true') {
    console.log("local")

    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        dialect: 'postgres',
        // logging: false,
    });
    module.exports = sequelize;

} else {
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
    );
    module.exports = sequelize;
}



