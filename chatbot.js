const chatbotResponses = {
  greeting: "Welcome to our Plotting Page Chatbot! How can I assist you today?",
  options: [
    "Plot Details",
    "Pricing Information",
    "Availability Status",
    "Contact Agent",
    "Payment Plans",
    "Amenities",
    "Location Benefits",
    "Plot Sizes",
    "Legal Documents",
    "Construction Guidelines",
    "Investment Potential",
    "Site Visit",
    "Booking Process",
    "Developer Information",
    "Maintenance Fees",
    "Nearby Schools",
    "Transportation",
    "Water Supply",
    "Electricity Availability",
    "Security Features",
    "Something else"
  ],
  subOptions: {
    "Plot Details": [
      "View Layouts",
      "Check Features",
      "Explore Plot Types",
      "Back to Main Menu"
    ],
    "Pricing Information": [
      "Get Price Range",
      "Negotiable Offers",
      "Payment Breakup",
      "Back to Main Menu"
    ],
    "Availability Status": [
      "Check Available Plots",
      "Reserved Plots",
      "Upcoming Phases",
      "Back to Main Menu"
    ],
    "Contact Agent": [
      "Request Call",
      "Email Agent",
      "Schedule Meeting",
      "Back to Main Menu"
    ],
    "Payment Plans": [
      "Down Payment Details",
      "EMI Options",
      "Installment Schedule",
      "Back to Main Menu"
    ],
    "Amenities": [
      "Parks and Green Spaces",
      "Road Infrastructure",
      "Community Facilities",
      "Back to Main Menu"
    ],
    "Location Benefits": [
      "Highway Proximity",
      "Nearby Commercial Hubs",
      "Future Development",
      "Back to Main Menu"
    ],
    "Plot Sizes": [
      "1200 sq.ft. Plots",
      "1800 sq.ft. Plots",
      "2400 sq.ft. Plots",
      "Back to Main Menu"
    ],
    "Legal Documents": [
      "Title Verification",
      "Approval Certificates",
      "Encumbrance Check",
      "Back to Main Menu"
    ],
    "Construction Guidelines": [
      "Height Restrictions",
      "Building Materials",
      "Approval Process",
      "Back to Main Menu"
    ],
    "Investment Potential": [
      "ROI Estimates",
      "Market Trends",
      "Future Value",
      "Back to Main Menu"
    ],
    "Site Visit": [
      "Schedule Visit",
      "Visit Guidelines",
      "Transportation Support",
      "Back to Main Menu"
    ],
    "Booking Process": [
      "Token Amount",
      "Documentation Needed",
      "Booking Steps",
      "Back to Main Menu"
    ],
    "Developer Information": [
      "Company Profile",
      "Past Projects",
      "Contact Details",
      "Back to Main Menu"
    ],
    "Maintenance Fees": [
      "Fee Structure",
      "Payment Frequency",
      "Included Services",
      "Back to Main Menu"
    ],
    "Nearby Schools": [
      "List of Schools",
      "Distance Details",
      "Quality Ratings",
      "Back to Main Menu"
    ],
    "Transportation": [
      "Bus Routes",
      "Highway Access",
      "Public Transport",
      "Back to Main Menu"
    ],
    "Water Supply": [
      "Connection Status",
      "Water Quality",
      "Backup Systems",
      "Back to Main Menu"
    ],
    "Electricity Availability": [
      "Connection Details",
      "Power Capacity",
      "Backup Options",
      "Back to Main Menu"
    ],
    "Security Features": [
      "Gated Entry",
      "Surveillance Systems",
      "Security Personnel",
      "Back to Main Menu"
    ]
  }
};

const handleChat = (req, res) => {
  const userMessage = req.body.message?.toLowerCase();
  let response = { message: "I'm not sure how to help with that. Please choose from the options.", options: chatbotResponses.options };

  if (userMessage?.includes('hello')) {
    response.message = chatbotResponses.greeting;
    response.options = chatbotResponses.options;
  } else if (chatbotResponses.options.some(option => userMessage?.includes(option.toLowerCase()))) {
    const selectedOption = chatbotResponses.options.find(option => userMessage?.includes(option.toLowerCase()));
    if (chatbotResponses.subOptions[selectedOption]) {
      response.message = `You selected "${selectedOption}". Please choose from the following options:`;
      response.options = chatbotResponses.subOptions[selectedOption];
    }
  } else if (chatbotResponses.subOptions["Plot Details"].some(subOption => userMessage?.includes(subOption.toLowerCase()))) {
    if (userMessage?.includes('view layouts')) {
      response.message = "View detailed layouts of plots ranging from 1200 to 2400 sq.ft. on our Plotting Page.";
    } else if (userMessage?.includes('check features')) {
      response.message = "Explore features like road access and green spaces on our Plotting Page.";
    } else if (userMessage?.includes('explore plot types')) {
      response.message = "Discover various plot types available, including residential and commercial options.";
    } else if (userMessage?.includes('back to main menu')) {
      response.message = "Returning to the main menu.";
      response.options = chatbotResponses.options;
    }
  } else if (chatbotResponses.subOptions["Pricing Information"].some(subOption => userMessage?.includes(subOption.toLowerCase()))) {
    if (userMessage?.includes('get price range')) {
      response.message = "Pricing starts at competitive rates—check the range on our Plotting Page.";
    } else if (userMessage?.includes('negotiable offers')) {
      response.message = "Yes, prices are negotiable. Contact our agent for final offers.";
    } else if (userMessage?.includes('payment breakup')) {
      response.message = "Get a detailed payment breakup including down payment on our Plotting Page.";
    } else if (userMessage?.includes('back to main menu')) {
      response.message = "Returning to the main menu.";
      response.options = chatbotResponses.options;
    }
  } else {
    response.message = "Please select a valid option from the list.";
    response.options = chatbotResponses.options;
  }

  res.json(response);
};

const getChat = (req, res) => {
  res.json({
    message: chatbotResponses.greeting,
    options: chatbotResponses.options
  });
};

module.exports = { getChat, handleChat };