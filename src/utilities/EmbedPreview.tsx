import { useEffect, useState } from "react";
import { ReviewAPIData } from "../utilities/types";
import ReviewSlider from "../components/ReviewSlider";
import ReviewWidget from "../components/ReviewWidget";
import ReviewGrid from "../components/ReviewGrid";

export default function EmbedPreview({
  selectedLayout,
  googleCredential,
}: any) {
  const [loading, setLoading] = useState(Boolean);
  const [error, setError] = useState("");
  const [data, setData] = useState<ReviewAPIData>();

  useEffect(() => {
    // Fetch data from reddit
    setLoading(true);
    fetch(
      `https://inbox-api.smartyr.biz/api/v1/review/${
        process.env.NODE_ENV === "development"
          ? "b73206af-bd61-4400-a8ab-3c994f25ab56"
          : googleCredential.publicReviewAPIKey
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const filteredReviews = data.reviews.filter((review: any) => {
          return review.rating === "FIVE";
        });

        setData({ ...data, reviews: filteredReviews });
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
        setError("Error fetching reviews from server");
      });
  }, []);

  return (
    <>
      <div className="p-6 rounded-xl bg-gray-50   ">
        {selectedLayout === "slider" && (
          <ReviewSlider data={data} loading={loading} />
        )}
        {selectedLayout === "widget" && (
          <div className="flex">
            <ReviewWidget data={data} loading={loading} />
          </div>
        )}
        {selectedLayout === "grid" && (
          <div className="flex">
            <ReviewGrid data={data} loading={loading} />
          </div>
        )}
      </div>
    </>
  );
}
