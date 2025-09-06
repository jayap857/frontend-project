// Dummy summary response
const summaryResponse = {
  status: "success",
  data: {
    business: { id: 1, name: "Himalayan Restaurant" },
    summary: {
      total_reviews: 125,
      average_rating: 4.5,
      overall_sentiment: 0.75,
      sentiment_distribution: { positive: 95, neutral: 20, negative: 10 },
      rating_distribution: { "5": 65, "4": 30, "3": 20, "2": 7, "1": 3 }
    },
    reviews: {
      count: 125,
      next: null,
      previous: null,
      results: [
        {
          id: 456,
          user: "John D.",
          rating: 5,
          text: "Outstanding service and quality! Highly recommend.",
          sentiment_score: 0.92,
          sentiment_label: "positive",
          visit_date: "2025-09-04",
          created_at: "2025-09-04T16:45:00Z",
          helpful_votes: 12,
          is_verified_purchase: true
        },
        {
          id: 457,
          user: "Sita M.",
          rating: 4,
          text: "Good food but service was slow.",
          sentiment_score: 0.6,
          sentiment_label: "neutral",
          visit_date: "2025-09-03",
          created_at: "2025-09-03T12:20:00Z",
          helpful_votes: 5,
          is_verified_purchase: false
        }
      ]
    }
  }
};

// Display summary
document.getElementById('summaryBusiness').textContent = summaryResponse.data.business.name;
document.getElementById('totalFeedbacks').textContent = summaryResponse.data.summary.total_reviews;
document.getElementById('avgRating').textContent = summaryResponse.data.summary.average_rating;
document.getElementById('overallSentiment').textContent = summaryResponse.data.summary.overall_sentiment;

// Sentiment distribution
const sentimentList = document.getElementById('sentimentDistribution');
sentimentList.innerHTML = `
  <li class="list-group-item">Positive: ${summaryResponse.data.summary.sentiment_distribution.positive}</li>
  <li class="list-group-item">Neutral: ${summaryResponse.data.summary.sentiment_distribution.neutral}</li>
  <li class="list-group-item">Negative: ${summaryResponse.data.summary.sentiment_distribution.negative}</li>
`;

// Rating distribution
const ratingList = document.getElementById('ratingDistribution');
ratingList.innerHTML = Object.entries(summaryResponse.data.summary.rating_distribution)
  .sort((a,b) => b[0]-a[0])
  .map(([star,count]) => `<li class="list-group-item">${star} stars: ${count}</li>`).join('');

// Display reviews
const feedbackContainer = document.getElementById('feedbackContainer');
function loadFeedbacks(feedbacks) {
  feedbacks.forEach(r => {
    const reviewEl = document.createElement('div');
    reviewEl.className = "mb-4 border-bottom pb-3";
    reviewEl.innerHTML = `
      <h6>${r.user} ${r.is_verified_purchase ? '<span class="badge bg-success">Verified</span>' : ''}</h6>
      <p>Rating: ${r.rating} ⭐ | Sentiment: ${r.sentiment_label} (${r.sentiment_score})</p>
      <p>${r.text}</p>
      <p class="text-muted">Visited on ${r.visit_date} | Helpful Votes: ${r.helpful_votes}</p>
    `;
    feedbackContainer.appendChild(reviewEl);
  });
}

// Initial load
loadFeedbacks(summaryResponse.data.reviews.results);

// Pagination (dummy, for demonstration)
document.getElementById('loadMoreBtn').addEventListener('click', () => {
  alert('Load more feedbacks functionality (pagination) would go here.');
});
