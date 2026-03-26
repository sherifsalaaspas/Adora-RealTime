// ---------------------------------------------
// HS CODE AUTOCOMPLETE
// ---------------------------------------------
export function hsCodeAutocomplete(text) {
  if (!text) return [];

  const dataset = [
    { code: "8517.12", label: "Mobile Phones" },
    { code: "8471.30", label: "Laptops" },
    { code: "6403.59", label: "Leather Footwear" },
    { code: "9503.00", label: "Toys" },
    { code: "4202.11", label: "Travel Bags" },
    { code: "6109.10", label: "Cotton T-shirts" },
  ];

  return dataset.filter((row) =>
    row.label.toLowerCase().includes(text.toLowerCase())
  );
}

// ---------------------------------------------
// CARRIER API MOCKER
// ---------------------------------------------
const simulateCarriers = () => {
  return [
    {
      carrier: "DHL",
      price: random(45, 65),
      edt: random(2, 5),
      reliability: random(88, 98),
    },
    {
      carrier: "FedEx",
      price: random(40, 60),
      edt: random(3, 6),
      reliability: random(80, 95),
    },
    {
      carrier: "Aramex",
      price: random(30, 55),
      edt: random(4, 8),
      reliability: random(70, 90),
    },
    {
      carrier: "Bosta",
      price: random(25, 40),
      edt: random(5, 9),
      reliability: random(65, 85),
    },
  ];
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ---------------------------------------------
// FETCH QUOTES
// ---------------------------------------------
export async function fetchCarrierQuotes(form) {
  if (form.demoMode) {
    return simulateCarriers();
  }

  // Placeholder for real API calls using env vars
  return simulateCarriers();
}

// ---------------------------------------------
// BEST VALUE ALGORITHM
// ---------------------------------------------
export function bestValueSelection(quotes) {
  if (!quotes || quotes.length === 0) return null;

  // Weighted scoring:
  // 60% reliability, 40% EDT inversed
  return quotes
    .map((q) => ({
      ...q,
      score: q.reliability * 0.6 + (10 - q.edt) * 4,
    }))
    .sort((a, b) => b.score - a.score)[0];
}

// ---------------------------------------------
// TRACKING ENGINE
// ---------------------------------------------
export function trackByAWB(awb) {
  let carrier = "Unknown";

  if (/^\d{10}$/.test(awb)) carrier = "DHL";
  if (/^\d{12}$/.test(awb)) carrier = "FedEx";
  if (/^3\d{8}$/.test(awb)) carrier = "Aramex";

  const timeline = [
    {
      status: "Shipment Created",
      date: "2026-03-21",
      location: "Cairo Hub",
    },
    {
      status: "In Transit",
      date: "2026-03-22",
      location: "Sorting Facility",
    },
    {
      status: "Out for Delivery",
      date: "2026-03-24",
      location: "Destination City",
    },
    {
      status: "Delivered",
      date: "2026-03-25",
      location: "Receiver Address",
    },
  ];

  return { carrier, timeline };
}
