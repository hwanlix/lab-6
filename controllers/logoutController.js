const { LOGOUT_LINKS } = require("../constants/navigation");
const logger = require("../utils/logger");

const cartController = require("./cartController");

exports.getLogoutView = (request, response) => {
  const cartCount = cartController.getProductsCount();

  response.render("logout.ejs", {
    headTitle: "Shop - Logout",
    path: "/logout",
    activeLinkPath: "/logout",
    menuLinks: LOGOUT_LINKS,
    cartCount,
  });
};

exports.killApplication = (request, response) => {
  logger.getProcessLog();
  process.exit();
};
