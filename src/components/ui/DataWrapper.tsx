import NoData from "./NoData";

type DataWrapperProps = {
  children: React.ReactNode;
  data: unknown[];
  noDataText?: string;
};

export default function DataWrapper({
  children,
  data,
  noDataText,
}: DataWrapperProps) {
  return data.length > 0 ? <>{children}</> : <NoData text={noDataText} />;
}
