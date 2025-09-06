const API_BASE_URL = "http://localhost:5000/api";

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function loadBusinessDetails() {
    const businessId = getQueryParam("id") || 1;
    try {
        const res = await fetch(`${API_BASE_URL}/businesses/${businessId}/`);
        const result = await res.json();
        const b = result.data;

        // Business Info
        document.getElementById("businessName").textContent = b.name;
        document.getElementById("businessDescription").textContent = b.description;
        document.getElementById("businessCategory").textContent = b.category.name;
        document.getElementById("businessAddress").textContent = b.address;
        document.getElementById("businessPhone").textContent = b.phone_number;
        document.getElementById("businessEmail").textContent = b.email;
        const websiteEl = document.getElementById("businessWebsite");
        websiteEl.textContent = b.website;
        websiteEl.href = b.website;

        // Verified badge
        if (b.is_verified) document.getElementById("verifiedBadge").style.display = "inline-block";

        // Reviews & Ratings
        renderStars("businessRating", b.average_rating);
        document.getElementById("reviewCount").textContent = `${b.review_count} reviews`;

        // Sentiment Analysis
        document.getElementById("overallSentiment").textContent = b.sentiment_analysis.overall_sentiment.toFixed(2);
        document.getElementById("positiveReviews").textContent = b.sentiment_analysis.positive_reviews;
        document.getElementById("neutralReviews").textContent = b.sentiment_analysis.neutral_reviews;
        document.getElementById("negativeReviews").textContent = b.sentiment_analysis.negative_reviews;

        // Sentiment Chart
        const ctx = document.getElementById("sentimentChart").getContext("2d");
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: b.sentiment_analysis.sentiment_trends.map(s => s.month),
                datasets: [{
                    label: "Sentiment",
                    data: b.sentiment_analysis.sentiment_trends.map(s => s.sentiment),
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    tension: 0.3
                }]
            },
            options: {
                scales: {
                    y: { min: 0, max: 1 }
                }
            }
        });

        // Recent Reviews
        const reviewsContainer = document.getElementById("reviewsList");
        reviewsContainer.innerHTML = "";
        if (b.recent_reviews.length === 0) {
            reviewsContainer.innerHTML = "<p class='text-muted'>No reviews yet.</p>";
        } else {
            b.recent_reviews.forEach(r => {
                reviewsContainer.innerHTML += `
                    <div class="mb-3 p-3 border rounded">
                        <div class="d-flex justify-content-between">
                            <strong>${r.user || "Anonymous"}</strong>
                            <small class="text-muted">${new Date(r.created_at).toLocaleDateString()}</small>
                        </div>
                        <div class="text-warning">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
                        <p class="mb-0">${r.text}</p>
                    </div>
                `;
            });
        }

    } catch (err) {
        console.error(err);
        document.getElementById("businessName").textContent = "Business not found";
    }
}

// Render stars helper
function renderStars(containerId, rating) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 0; i < full; i++) container.innerHTML += "★";
    if (half) container.innerHTML += "☆";
    for (let i = full + (half ? 1 : 0); i < 5; i++) container.innerHTML += "☆";
    container.classList.add("text-warning");
}

document.addEventListener("DOMContentLoaded", loadBusinessDetails);
