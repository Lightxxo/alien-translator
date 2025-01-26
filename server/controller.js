
const { Link, Words } = require("./models");

const controller = {}


controller.sharePostController = async (req, res) => {
  let { data } = req.body;
  console.log("GENERATE SHARE LINK", typeof data, data);

  try {
    const link = await Link.create({ data });
    res.json(link);
  } catch (err) {
    console.error("Error creating link:", err);
    res.status(500).json({ message: "Error creating link", error: err.message });
  }
};

controller.shareGetController = async (req, res) => {
  try {
    const links = await Link.findAll();
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: "Error fetching links", error: err });
  }
};

controller.wordsPostController = async (req, res) => {
  const { earthWord, alienWord, category } = req.body;
  console.log("GOT POST REQUEST", earthWord, alienWord, category);

  try {
    const word = await Words.create({ earthWord, alienWord, category });
    res.json(word);
  } catch (err) {
    console.error("Error creating word:", err);
    res.status(500).json({ message: "Error creating word", error: err.message });
  }
};
controller.wordsGetController = async (req, res) => {
  try {
    const words = await Words.findAll();
    console.log(words);
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: "Error fetching words", error: err.message });
  }
};

controller.wordsDeleteController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Words.destroy({ where: { id } });
    if (result) {
      res.json({ message: "Word deleted", id });
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (err) {
    console.error("Error deleting word:", err);
    res.status(500).json({ message: "Error deleting word", error: err.message });
  }
};


module.exports = controller;