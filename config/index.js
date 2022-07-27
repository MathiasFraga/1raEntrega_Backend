require("dotenv").config();

let config = {
    port: process.env.PORT || 8080
}

let sockets = {

}

module.exports = { config, sockets }