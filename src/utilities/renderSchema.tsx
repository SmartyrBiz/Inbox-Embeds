import RATINGS from "../utilities/RATINGS";
import { dateFormatter } from "../utilities/dateFormatter";
import { ReviewAPIData } from "../utilities/types";

export default function renderSchema(data: ReviewAPIData) {
  // Validate essential data exists
  if (!data || !data.organisationName) {
    console.warn(
      "renderSchema: Missing essential data, skipping schema generation"
    );
    return;
  }

  let reviewsSchema = document.createElement("script");
  reviewsSchema.type = "application/ld+json";

  // Check if we have valid reviews
  const hasValidReviews =
    data.reviews && Array.isArray(data.reviews) && data.reviews.length > 0;
  const actualReviewCount = hasValidReviews ? data.reviews.length : 0;

  let reviewsSchemaArray: any[] = [];

  if (hasValidReviews) {
    reviewsSchemaArray = data.reviews
      .filter((review) => review && review.reviewer && review.reviewer.name) // Filter out invalid reviews
      .map((review: any) => {
        // Ensure rating value is within valid range (1-5)
        const ratingValue = RATINGS[review.rating as keyof typeof RATINGS];
        const validRatingValue = Math.max(1, Math.min(5, ratingValue || 1));

        return {
          "@context": "https://schema.org/",
          "@type": "Review",
          itemReviewed: {
            "@type": "Organization",
            name: data.organisationName,
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: validRatingValue.toString(),
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: review.comment || "No comment provided",
          author: {
            "@type": "Person",
            name: review.reviewer.name,
          },
          datePublished: review.createdAt
            ? dateFormatter(review.createdAt)
            : new Date().toISOString(),
        };
      });
  }

  // Build base organization schema
  let localBusinessSchema: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.organisationName,
  };

  // Only add aggregateRating if we have actual reviews and valid rating data
  if (
    actualReviewCount > 0 &&
    data.averageRating != null &&
    !isNaN(data.averageRating)
  ) {
    localBusinessSchema.aggregateRating = {
      "@type": "AggregateRating",
      bestRating: "5",
      worstRating: "1",
      ratingValue: Math.max(0, Math.min(5, data.averageRating)).toString(),
      ratingCount: actualReviewCount,
    };
  }

  // Only add reviews if we have valid ones
  if (reviewsSchemaArray.length > 0) {
    localBusinessSchema.review = reviewsSchemaArray;
  }

  reviewsSchema.text = JSON.stringify(localBusinessSchema);

  document.querySelector("body")!.appendChild(reviewsSchema);
}
