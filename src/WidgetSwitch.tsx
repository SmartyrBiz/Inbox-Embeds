import React, { useEffect, useState } from "react";
import ReviewSlider from "./components/ReviewSlider";
import ReviewWidget from "./components/ReviewWidget";
import { ReviewAPIData } from "./utilities/types";
import renderSchema from "./utilities/renderSchema";
import ReviewGrid from "./components/ReviewGrid";
import FeedbackWizard from "./components/FeedbackWizard";

export default function WidgetSwitch({ embed, data, loading }: any) {
  const embedType = embed.dataset.embed;
  const organisationId = embed.dataset.organisation;
  const postTo = embed.dataset.post;

  switch (embedType) {
    case "slider":
      return <ReviewSlider data={data} loading={loading} />;

    case "widget":
      return <ReviewWidget data={data} loading={loading} />;

    case "grid":
      return <ReviewGrid data={data} loading={loading} />;

    case "feedback-wizard":
      return <FeedbackWizard data={data} postTo={postTo} loading={loading} />;

    default:
      return <div>Default</div>;
  }
}
