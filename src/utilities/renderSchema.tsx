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

  let localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.organisationName,
    aggregateRating: {
      "@type": "AggregateRating",
      bestRating: "5",
      worstRating: "1",
      // ratingValue: data.averageRating,
      // ratingCount: data.totalReviewCount,
    },
    review: reviewsSchemaArray,
  };

  reviewsSchema.text = JSON.stringify(localBusinessSchema);

  document.querySelector("body")!.appendChild(reviewsSchema);
}
