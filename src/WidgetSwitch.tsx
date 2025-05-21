import ReviewSlider from "./components/ReviewSlider";
import ReviewWidget from "./components/ReviewWidget";
import ReviewGrid from "./components/ReviewGrid";
import FeedbackWizard from "./components/FeedbackWizard";

export default function WidgetSwitch({ embed, data, loading }: any) {
  const embedType = embed.dataset.embed;
  const organisationId = embed.dataset.organisation;
  const isDxpAPI = !!embed.dataset.instance;

  switch (embedType) {
    case "slider":
      return <ReviewSlider data={data} loading={loading} />;

    case "widget":
      return <ReviewWidget data={data} loading={loading} />;

    case "grid":
      return <ReviewGrid data={data} loading={loading} />;

    case "feedback-wizard":
      if (isDxpAPI) {
        return null;
      }
      return (
        <FeedbackWizard
          data={data}
          organisationId={organisationId}
          loading={loading}
        />
      );

    default:
      return <div>Default</div>;
  }
}
