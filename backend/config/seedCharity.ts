
import mongoose from "mongoose";
import dotenv from "dotenv";
import Charity from "../models/Charity";

dotenv.config();

const data = [
  {
    name: "Education For All",
    description: "Helping poor children get education.",
  },

  {
    name: "Green Earth Initiative",
    description: "Planting trees and saving environment.",
  },

  {
    name: "Health Care Support",
    description: "Free medical treatment for needy families.",
  },

  {
    name: "Food For Hunger",
    description: "Feeding homeless people every day.",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    await Charity.deleteMany();

    await Charity.insertMany(data);

    console.log("Charities Seeded Successfully");

    process.exit();

  } catch (err) {
    console.log(err);

    process.exit(1);
  }
};

seedDB();