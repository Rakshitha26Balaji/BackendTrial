export const BudgetaryQuotation = (sequelize, Sequelize) => {
  const BudgetaryQuotation = sequelize.define("BudgetaryQuotation", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    bq_title: {
      type: Sequelize.STRING,
      allowNull: false
    },

    customer: {
      type: Sequelize.STRING,
      allowNull: false
    },

    lead_owner: {
      type: Sequelize.JSON,   // multi-select array
      allowNull: false
    },

    defence_type: {
      type: Sequelize.STRING,
      allowNull: false
    },

    estimated_value: {
      type: Sequelize.STRING,
      allowNull: false
    },

    submitted_value: {
      type: Sequelize.STRING,
      allowNull: false
    },

    date_of_submission: {
      type: Sequelize.STRING,
      allowNull: false
    },

    reference_no: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },

    competitors: {
      type: Sequelize.JSON,   // array
      allowNull: true
    },

    present_status: {
      type: Sequelize.STRING,
      allowNull: false
    },

    submitted_at: {
      type: Sequelize.STRING,
      allowNull: true
    },

    // Optional: Operator details (if required later)
    OperatorId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    OperatorName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    OperatorRole: {
      type: Sequelize.STRING,
      allowNull: true
    },
    OperatorSBU: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return BudgetaryQuotation;
};
