const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  const iframeVisible = req.query.reveal ? true : false;
  try {
    return res.render("home", {
      iframeVisible,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

module.exports = router;
