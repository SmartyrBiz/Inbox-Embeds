import WidgetSwitch from "./WidgetSwitch";

export default function App({ embed, data, loading }: any) {
  return <WidgetSwitch embed={embed} loading={loading} data={data} />;
}
