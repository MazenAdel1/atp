export const getReelId = (url: string): string => {
  return url?.split("/reel/")[1];
};

export const handleInputChange = (
  e: React.ChangeEvent<
    | HTMLTextAreaElement
    | HTMLInputElement
    | (HTMLInputElement & { type: "checkbox" })
  >,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setData: React.Dispatch<React.SetStateAction<any>>,
) => {
  const inputType = e.target.type;
  const inputId = e.target.id;
  const inputValue =
    inputType === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;

  setData((prev: object) => ({
    ...prev,
    [inputId]: inputValue,
  }));
};
