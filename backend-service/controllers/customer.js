const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Op = require("sequelize").Op;

async function register(data) {
  try {
    const customerExists = await models.Customer.findOne({
      where: { email: data.email },
    });
    if (customerExists) {
      throw new Error("User already registered");
    }
    const hashPassword = await bcrypt.hashSync(data.password, 10);
    const result = await models.Customer.create({
      userName: data.userName,
      password: hashPassword,
      email: data.email,
      role: "User",
    });
    return {
      email: data.email,
      userName: data.userName,
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

async function login(data) {
  try {
    const customerExists = await models.Customer.findOne({
      where: { email: data.email },
    });
    if (!customerExists) {
      return {
        statusCode: 401,
        message: {
          message:
            "We were unable to find a customer for this email. Please SignUp!",
        },
      };
    }
    if (customerExists) {
      if (await bcrypt.compare(data.password, customerExists.password)) {
        const token = jwt.sign({ sub: customerExists.id }, process.env.secret, {
          expiresIn: "7d",
        });

        return {
          statusCode: 200,
          message: {
            message: "Login successful",
            token: token,
            ...omitPassword(customerExists.get()),
          },
        };
      } else {
        return {
          statusCode: 401,
          message: {
            error: "Authentication failed",
          },
        };
      }
    } else {
      return {
        statusCode: 401,
        message: {
          error: "Authentication failed",
        },
      };
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

async function validateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, process.env.secret, function (err, decoded) {
    if (err) {
      return err;
    } else {
      req.customerId = decoded.sub;
      next();
    }
  });
}

async function getUser(customerId) {
  try {
    if (!customerId) throw new Error("Customer Id is required");
    const customerExists = await models.Customer.findByPk(customerId);
    if (!customerExists) throw new Error("User not Exists");
    return {
      ...omitPassword(customerExists.get()),
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

function omitPassword(customer) {
  const { password, ...customerWithoutPassword } = customer;
  return customerWithoutPassword;
}

async function updateUser(data, customerId) {
  try {
    const customerExists = await models.Customer.findByPk(customerId);
    if (!customerExists) throw new Error("User not Exists");
    const customer = await models.Customer.update(data, {
      where: { id: customerId },
    });
    return customer;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

async function passwordReset(email, password) {
  try {
    const customer = await models.Customer.findOne({
      where: { email },
    });
    if (!customer) {
      throw new Error("User not found");
    }

    const passwordHash = await bcrypt.hashSync(password, 10);
    const result = await models.Customer.update(
      {
        password: passwordHash,
      },
      { where: { id: customer.id } }
    );

    return {
      id: customer.id,
      email: email,
    };
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const customer = await models.Customer.findByPk(req.customerId); // assuming customerId is set in req object
      if (!customer) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!roles.includes(customer.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      logger.error(`Error in role middleware: ${error}`);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};

async function listCustomers() {
  try {
    const customers = await models.Customer.findAndCountAll({
      include: [
        {
          model: models.FarmItems,
          include: [
            {
              model: models.FarmItemActivities,
            },
          ],
        },
      ],
      where: {
        role: {
          [Op.ne]: "Admin",
        },
      },
    });
    let result;
    if (customers.count > 0) {
      result = customers.rows.map((ele) => {
        return {
          ...omitPassword(ele.get()),
        };
      });
    }
    let response = customers.rows.map((ele) => {
      let farmItemActivitiesCount = ele.FarmItems.reduce((count, item) => {
        return (count += Object.keys(item.FarmItemActivities).length);
      }, 0);
      return {
        id: ele.id,
        email: ele.email,
        userName: ele.userName,
        phoneNumber: ele.phoneNumber,
        dateOfBirth: ele.dateOfBirth,
        address: ele.address,
        country: ele.country,
        Category: ele.Category,
        pinCode: ele.pinCode,
        FarmItems: Object.keys(ele.FarmItems).length,
        FarmItemActivities: farmItemActivitiesCount
      };
    });
    return {
      count: customers.count,
      result: response,
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
  register,
  login,
  validateToken,
  getUser,
  updateUser,
  passwordReset,
  checkRole,
  listCustomers,
};
