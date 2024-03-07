import RATINGS from "../utilities/RATINGS";
import { dateFormatter } from "../utilities/dateFormatter";
import { ReviewAPIData } from "../utilities/types";

export default function renderSchema(data: ReviewAPIData) {
  let reviewsSchema = document.createElement("script");
  reviewsSchema.type = "application/ld+json";
  let reviewsSchemaArray = data.reviews.map((review: any) => {
    return {
      "@context": "https://schema.org/",
      "@type": "Review",
      itemReviewed: {
        "@type": "LocalBusiness",
        name: data.organisationName,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: RATINGS[review.rating as keyof typeof RATINGS],
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: review.comment,
      author: {
        "@type": "Person",
        name: review.reviewer.name,
      },
      datePublished: dateFormatter(review.createdAt),
    };
  });

  reviewsSchema.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "LocalBusiness",
      name: data.organisationName,
    },
    ratingValue: data.averageRating,
    reviewCount: data.totalReviewCount,
    bestRating: "5",
    worstRating: "1",
    review: reviewsSchemaArray,
  });
  document.querySelector("body")!.appendChild(reviewsSchema);
}
