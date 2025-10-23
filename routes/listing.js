const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudConfig.js");
const upload = multer({ storage });
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listingcontroller.js");
const Listing = require("../models/listing.js");

router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedin,
  upload.single("listing[image]"),
  validateListing,

  wrapAsync(listingController.createListing)
);

router.get("/search", wrapAsync(listingController.searchListing));

//create route
router.get("/new", isLoggedin, listingController.renderNewForm);

//show route
router.get("/:id", wrapAsync(listingController.showListing));

//create route

//Edit route
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//update route
router.put(
  "/:id/edit",
  isLoggedin,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
);

//delete route

router.delete(
  "/:id",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
