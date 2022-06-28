const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Project = require("../models/Project");
const Task = require("../models/Task");
const router = express();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("user");
    return res.send({ projects });
  } catch (err) {
    return res.status(400).send({ error: "Error loading projects" });
  }
});

router.get("/:projectId", async (req, res) => {
  // res.send({ user: req.userId });
  try {
    const project = await Project.findById(req.params.projectId).populate(
      "user"
    );
    return res.send({ project });
  } catch (err) {
    return res.status(400).send({ error: "Error loading project" });
  }
});

router.post("/", async (req, res) => {
  // res.send({ user: req.userId });
  try {
    // const project = await Project.create({ ...req.body, user: req.userId });
    const { title, description, tasks } = req.body;
    const project = await Project.create({
      title,
      description,
      user: req.userId,
    });

    // tasks.map((task) => {
    //   const projectTask = new Task({ ...task, project: project._id });
    //   projectTask.save().then((task) => {
    //     project.tasks.push(task);
    //   });
    // });

    await Promise.all(
      tasks.map(async (task) => {
        const projectTask = new Task({ ...task, project: project._id });

        await projectTask.save();

        project.tasks.push(projectTask);
      })
    );
    await project.save();
    return res.send({ project });
  } catch (err) {
    return res.status(400).send({ error: "Error creating new project" });
  }
});

router.put("/:projectId", async (req, res) => {
  res.send({ user: req.userId });
});

router.delete("/:projectId", async (req, res) => {
  // res.send({ user: req.userId });
  try {
    const project = await Project.findByIdAndRemove(req.params.projectId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: "Error deleting project" });
  }
});

module.exports = (app) => app.use("/projects", router);
