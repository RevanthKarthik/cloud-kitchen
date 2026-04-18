import Food from "../models/Food.js";

// GET
export const getFoods = async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
};

// CREATE
export const createFood = async (req, res) => {
  try {
    const food = await Food.create({
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
      quantity: req.body.quantity,
      description: req.body.description,
      status: req.body.status,
      image: `/uploads/${req.file.filename}`,
    });

    res.status(201).json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating food" });
  }
};

// UPDATE
export const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) return res.status(404).json({ message: "Not found" });

    food.name = req.body.name || food.name;
    food.price = req.body.price || food.price;
    food.category = req.body.category || food.category;
    food.quantity = req.body.quantity || food.quantity;
    food.description = req.body.description || food.description;
    food.status = req.body.status || food.status;

    if (req.file) {
      food.image = `/uploads/${req.file.filename}`;
    }

    const updated = await food.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating food" });
  }
};

// DELETE
export const deleteFood = async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};