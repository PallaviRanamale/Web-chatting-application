const express = require("express");
const {
<<<<<<< HEAD
    allMessages,
    sendMessage,
} = require("../controllers/messageControllers");
=======
  allMessages,
  sendMessage,
} = require("../controllers/messageController");

>>>>>>> Coding11-12
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

<<<<<<< HEAD
// const { sendMessage, allMessages } = require("../controllers/messageControllers");
// const { protect } = require("../middleware/authMiddleware");

module.exports = router;
=======
module.exports = router;
>>>>>>> Coding11-12
