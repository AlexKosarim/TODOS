const { Router } = require("express");
// const config = require("config");
// const shortid = require("shortid");
const Todo = require("../models/Todo");
// const auth = require("../middleware/auth.middleware");
const router = Router();

router.get("/" /*, auth*/, async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos.reverse());
  } catch (e) {
    res.status(500).json({ message: "Something went wrong! Try again!" });
  }
});

router.post("/add" /*, auth*/, async (req, res) => {
  try {
    // console.log(req.body);
    const { title } = req.body;
    const todo = new Todo({ title });

    await todo.save(); // .then((todo1) => (xxx = todo1));
    // console.log(777);
    res.json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong! Try again!" });
  }
});

module.exports = router;

// router.post("/generate", auth, async (req, res) => {
//   try {
//     const baseUrl = config.get("baseUrl");
//     const { from } = req.body;
//     const code = shortid.generate();
//     const existing = await Link.findOne({ from });

//     if (existing) {
//       return res.json({ link: existing });
//     }
//     const to = baseUrl + "/t/" + code;

//     const link = new Link({
//       code,
//       from,
//       to,
//       owner: req.user.userId,
//     });

//     await link.save();
//     return res.status(201).json({ link });
//   } catch (e) {
//     res.status(500).json({ message: "1Something went wrong! Try again!" });
//   }
// });

// router.get("/", auth, async (req, res) => {
//   try {
//     const links = await Link.find({ owner: req.user.userId });
//     res.json(links);
//   } catch (e) {
//     res.status(500).json({ message: "Something went wrong! Try again!" });
//   }
// });

// router.get("/:id", auth, async (req, res) => {
//   try {
//     const link = await Link.findById(req.params.id);
//     res.json(link);
//   } catch (e) {
//     res.status(500).json({ message: "Something went wrong! Try again!" });
//   }
// });

// module.exports = router;
