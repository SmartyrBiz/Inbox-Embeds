import "./App.css";
import React, { useEffect, useState } from "react";
import ReviewSlider from "./components/ReviewSlider";
import ReviewWidget from "./components/ReviewWidget";
import { ReviewAPIData } from "./utilities/types";
import renderSchema from "./utilities/renderSchema";
import ReviewGrid from "./components/ReviewGrid";
import WidgetSwitch from "./WidgetSwitch";
import EmbedPreview from "./utilities/EmbedPreview";

export default function App({ embed, data, loading }: any) {
  return <WidgetSwitch embed={embed} loading={loading} data={data} />;
}
