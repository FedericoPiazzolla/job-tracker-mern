const express = require("express");
const { check } = require("express-validator");

const jobsController = require("../controllers/jobs-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// GET /api/jobs/:jid
router.get("/:jid", jobsController.getJobById);
// GET /api/jobs/user/:uid
router.get("/user/:uid", jobsController.getJobsByUserId);
// POST /api/jobs
router.use(checkAuth); // Protect all routes below this middleware

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("company").not().isEmpty(),
    check("location").not().isEmpty(),
    check("status").not().isEmpty(),
    check("date").isISO8601(),
  ],
  jobsController.createJob
);
// PATCH /api/jobs/:jid
router.patch(
  "/:jid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("company").not().isEmpty(),
    check("location").not().isEmpty(),
    check("status").not().isEmpty(),
    check("date").isISO8601(),
  ],
  jobsController.updateJobById
);
// DELETE /api/jobs/:jid
router.delete("/:jid", jobsController.deleteJob);

module.exports = router;
