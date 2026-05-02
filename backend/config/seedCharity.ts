import mongoose from "mongoose";
import Charity from "../models/CharityDonation";

const data = [
  {
    name: "Education For All",
    description: "Helping poor children get education.",
    percentage: 10
  },
  {
    name: "Green Earth Initiative",
    description: "Planting trees and saving environment.",
    percentage: 40
  },
  {
    name: "Health Care Support",
    description: "Free medical treatment for needy families.",
    percentage: 30
  },
  {
    name: "Food For Hunger",
    description: "Feeding homeless people every day.",
    percentage: 20
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/eccomerce");

    await Charity.deleteMany();
    await Charity.insertMany(data);

    console.log("🔥 Charity data inserted successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDB();