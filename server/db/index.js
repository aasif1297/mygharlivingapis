const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'mygharcustomerdb',
    host: 'localhost',
    port: '3306'
});

let db = {};
// db.all = () => {
//     return new Promise((resolve, reject) => {
//         pool.query(`SELECT * FROM property_listing`, (err, results) => {
//             if(err){
//                 return reject(err);
//             }
//             return resolve(results);
//         });
//     });

// };

db.allProps = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM property_listing`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });

};

db.getPropertyByID =(id, n_id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM property_listing where city_id = ? AND neighborhood_id = ?`, [id, n_id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

db.property =(id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM property_listing where id = ?`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

db.allCities = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM cities`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });

};

db.neighborhood =(id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM neighbourhood where city_id = ?`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};


db.propert_details =(id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM property_details where property_id = ?`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

db.propert_images =(id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM property_images where property_id = ?`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

db.property_features =(id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM property_features where property_id = ?`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

db.room_types =(id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM property_room_types where property_id = ?`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

db.register_user = (name, phone, email) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO users (full_name, phone, email) VALUE (?, ?, ?)`, [name, phone, email], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    });
};

db.room_booking = (user_id, property_id, name, phone, email, date_time) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO room_booking (user_id, property_id, name, phone, email, date_time) VALUE (?, ?, ?, ?, ?, ?)`, [user_id, property_id, name, phone, email, date_time], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        })
    });
};

module.exports = db;