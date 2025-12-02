import db from "../models/index.js";

const BudgetaryQuotation = db.BudgetaryQuotation;

/* -------------------- GET ALL BQ DATA -------------------- */
export const GetBQData = async (req, res) => {
  try {
    const data = await BudgetaryQuotation.findAll({ raw: true });
    return res.json({ status: true, data });
  } catch (err) {
    console.error("Error fetching BQ data:", err);
    return res.status(500).json({ status: false, message: "No data found" });
  }
};

/* -------------------- CREATE BQ ENTRY -------------------- */
export const CreateBQData = async (req, res) => {
  try {
    console.log("📌 Incoming Data:", req.body);

    // req.body already contains keys matching the model (camelCase)
    const saved = await BudgetaryQuotation.create(req.body);

    console.log("✅ BQ saved successfully");
    return res.status(201).json({ status: true, data: saved });

  } catch (err) {
    console.error("❌ ERROR WHILE SAVING BQ:", err);
    return res.status(500).json({
      status: false,
      message: err.message || "Some error occurred while creating BQ data",
    });
  }
};
