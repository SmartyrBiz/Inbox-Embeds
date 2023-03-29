import React, { useEffect, useState } from "react";
import ReviewSlider from "./components/ReviewSlider";
import ReviewWidget from "./components/ReviewWidget";
import { ReviewAPIData } from "./utilities/types";
import renderSchema from "./utilities/renderSchema";
import ReviewGrid from "./components/ReviewGrid";

export default function WidgetSwitch({ embed, data, loading }: any) {
  const embedType = embed.dataset.embed;
  const organisationId = embed.dataset.organisation;

  switch (embedType) {
    case "slider":
      return <ReviewSlider data={data} loading={loading} />;

    case "widget":
      return <ReviewWidget data={data} loading={loading} />;

    case "grid":
      return <ReviewGrid data={data} loading={loading} />;

    default:
      return <div>Default</div>;
  }
}
