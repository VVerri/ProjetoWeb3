const User = require ("../models/User");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
const SECRET = process.env.SECRET