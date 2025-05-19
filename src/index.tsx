import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ReviewSlider from "./components/ReviewSlider";
import App from "./App";
import { ReviewAPIData } from "./utilities/types";
import { dateFormatter } from "./utilities/dateFormatter";
import RATINGS from "./utilities/RATINGS";
import renderSchema from "./utilities/renderSchema";

// Transform new API data to match ReviewAPIData format
const transformNewApiData = (data: any): ReviewAPIData => {
  return {
    reviews: data.reviews.map((review: any) => ({
      createdAt: review.postedAt,
      updatedAt: review.updatedAt,
      name: review.name,
      rating: review.rating >= 4 ? "FIVE" : "FOUR", // Convert numeric rating to string format
      comment: review.comment || "",
      provider: "GOOGLE",
      reviewer: {
        name: review.name,
        avatar: review.profileUrl || "",
      },
    })),
    locationUrl: data.locationUrl || "",
    newReviewUrl: data.reviewUri || "",
    totalReviewCount: data.total || 0,
    averageRating: data.averageRating || 0,
    organisationName: data.businessName || "",
  };
};

window.addEventListener("load", function () {
  let loading = true;
  const EmbedNodes: NodeListOf<HTMLElement> =
    document.querySelectorAll("[data-embed]");

  const fetchReviews = async (element: HTMLElement) => {
    if (element.dataset.organisation) {
      // Inbox API
      const response = await fetch(
        `https://inbox-api.smartyr.biz/api/v1/review/${element.dataset.organisation}?per_page=30`
      );
      const data = await response.json();
      return data;
    } else if (element.dataset.instance) {
      // New API
      const response = await fetch(`http://localhost:8080/v1/google/reviews`, {
        headers: {
          instance: element.dataset.instance,
        },
      });
      const data = await response.json();
      return transformNewApiData(data);
    }
    throw new Error("No valid data attribute found");
  };

  // Fetch reviews for the first element to get initial data
  fetchReviews(EmbedNodes[0])
    .then((data) => {
      loading = false;
      const filteredReviews = data.reviews.filter((review: any) => {
        return (
          (review.rating === "FIVE" || review.rating === "FOUR") &&
          review.comment
        );
      });
      renderReactApps({ ...data, reviews: filteredReviews }, loading);
      renderSchema(data);
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
      loading = false;
      const emptyData: ReviewAPIData = {
        reviews: [
          {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            name: "",
            rating: "FIVE",
            comment: "",
            provider: "",
            reviewer: {
              name: "",
              avatar: "",
            },
          },
        ],
        locationUrl: "",
        newReviewUrl: "",
        totalReviewCount: 0,
        averageRating: 0,
        organisationName: "",
      };
      renderReactApps(emptyData, loading);
    });

  function renderReactApps(data: ReviewAPIData, loading: boolean) {
    EmbedNodes.forEach((HTMLElement) => {
      ReactDOM.createRoot(HTMLElement).render(
        <React.StrictMode>
          <App embed={HTMLElement} loading={loading} data={data} />
        </React.StrictMode>
      );
    });
  }
});
