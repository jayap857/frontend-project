// API Base URL
const API_BASE_URL = "http://localhost:5000/api";

// Populate categories from API
fetch(`${API_BASE_URL}/categories/`)
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById("category");
    select.innerHTML = '<option value="">Select Category</option>';
    data.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.name;
      select.appendChild(option);
    });
  })
  .catch(err => {
    console.error("Failed to load categories:", err);
    document.getElementById("category").innerHTML = '<option value="">Failed to load</option>';
  });

// Generate Opening Hours inputs
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const container = document.getElementById("openingHours");

days.forEach(day => {
  const div = document.createElement("div");
  div.classList.add("mb-3");
  div.innerHTML = `
    <label class="form-label fw-semibold">${day}</label>
    <div class="d-flex gap-2">
      <input type="time" class="form-control" id="${day.toLowerCase()}_open">
      <input type="time" class="form-control" id="${day.toLowerCase()}_close">
    </div>
  `;
  container.appendChild(div);
});

// Handle form submission
document.getElementById("businessForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form data
  const businessData = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
    address: document.getElementById("address").value,
    phone_number: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    website: document.getElementById("website").value,
    opening_hours: {},
    social_media: {
      facebook: document.getElementById("facebook").value,
      instagram: document.getElementById("instagram").value,
    }
  };

  // Add opening hours for each day
  days.forEach(day => {
    const open = document.getElementById(`${day.toLowerCase()}_open`).value || "closed";
    const close = document.getElementById(`${day.toLowerCase()}_close`).value || "";
    businessData.opening_hours[day.toLowerCase()] = open === "closed" ? "closed" : `${open}-${close}`;
  });

  try {
    const res = await fetch(`${API_BASE_URL}/businesses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(businessData)
    });

    if (res.ok) {
      alert("✅ Business added successfully!");
      document.getElementById("businessForm").reset();
    } else {
      const errorData = await res.json();
      alert("❌ Error: " + JSON.stringify(errorData));
    }
  } catch (error) {
    console.error("Error submitting business:", error);
    alert("❌ Something went wrong. Check console.");
  }
});
