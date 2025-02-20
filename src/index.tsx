import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ReviewSlider from "./components/ReviewSlider";
import App from "./App";
import { ReviewAPIData } from "./utilities/types";
import { dateFormatter } from "./utilities/dateFormatter";
import RATINGS from "./utilities/RATINGS";
import renderSchema from "./utilities/renderSchema";

window.addEventListener("load", function () {
  let loading = true;
  const EmbedNodes: NodeListOf<HTMLElement> =
    document.querySelectorAll("[data-embed]");

  fetch(
    `https://inbox-api.smartyr.biz/api/v1/review/${EmbedNodes[0].dataset.organisation}?per_page=30`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data);
      loading = false;
      const filteredReviews = data.reviews.filter((review: any) => {
        return (
          (review.rating === "FIVE" || review.rating === "FOUR") &&
          review.comment
        );
      });

      filteredReviews.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      renderReactApps({ ...data, reviews: filteredReviews }, loading);
      renderSchema(data);
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
