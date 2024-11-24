const mongoose = require('mongoose');

// Define the brokerage data schema
const brokerageDataSchema = new mongoose.Schema(
  {
    scheme: { 
      type: String, 
      required: true, 
      trim: true, 
      unique: true // Ensure no duplicate scheme names
    }, 
    gst: { 
      type: String, 
      required: true, 
      enum: ['exclusive', 'inclusive'] // GST type validation
    },
    payout: { 
      type: String, 
      required: false, 
      enum: ['one-time upfront', 'monthly', 'quarterly'] // Payout type validation
    },
    tenures: { 
      type: Map, 
      of: Number, // Each key-value pair: "duration" -> percentage
    },
    monthly_aum_tenures: { 
      type: Map, 
      of: Number, // Monthly AUM-based tenures with rates
    },
    quarterly_aum_tenures: { 
      type: Map, 
      of: Number, // Quarterly AUM-based tenures with rates
    },
    volume_incentives: { 
      type: Map, 
      of: Number, // Volume-based incentives (e.g., "1-5 Cr" -> percentage)
    },
    trail_income: { 
      type: Map, 
      of: Number, // Trail income for banks (e.g., "AU Small Finance Bank" -> percentage)
    },
    brokerage_rates: { 
      type: Map, 
      of: Number, // Brokerage rates for banks
    },
  },
  { 
    timestamps: true // Automatically add createdAt and updatedAt fields
  }
);

// Export the model
module.exports = mongoose.model('BrokerageData', brokerageDataSchema);
