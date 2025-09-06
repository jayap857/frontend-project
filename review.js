const form = document.getElementById('reviewForm');
const preview = document.getElementById('jsonPreview');
const responsePreview = document.getElementById('responsePreview');

// Update JSON preview as user types
form.addEventListener('input', () => {
  const data = {
    business: parseInt(document.getElementById('businessId').value || 1),
    rating: parseInt(document.getElementById('rating').value || 5),
    text: document.getElementById('reviewText').value || "Your review...",
    visit_date: document.getElementById('visitDate').value || "2025-09-03"
  };
  preview.textContent = JSON.stringify(data, null, 2);
});

// Handle form submission
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = {
    business: parseInt(document.getElementById('businessId').value),
    rating: parseInt(document.getElementById('rating').value),
    text: document.getElementById('reviewText').value,
    visit_date: document.getElementById('visitDate').value
  };

  // Simulated API response
  const response = {
    status: "success",
    message: "Review submitted successfully",
    data: {
      id: 456,
      business: { id: data.business, name: "Himalayan Restaurant" },
      user: { id: 123, username: "john_doe" },
      rating: data.rating,
      text: data.text,
      visit_date: data.visit_date,
      sentiment_analysis: {
        sentiment_score: 0.92,
        sentiment_label: "positive",
        confidence: 0.95,
        key_phrases: ["outstanding service", "quality", "helpful staff", "delicious food"]
      },
      is_verified: false,
      created_at: new Date().toISOString()
    }
  };

  responsePreview.textContent = JSON.stringify(response, null, 2);
  alert("Review submitted successfully!");
});