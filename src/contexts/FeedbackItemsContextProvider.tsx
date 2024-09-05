import { createContext } from "react";
import { useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../lib/hooks";

type TFeedbackItemsContext = {
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  filteredFeedbackItems: TFeedbackItem[];
  handleAddItems: (text: string) => void;
  handleSelectedCompany: (company: string) => void;
};

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const { isLoading, errorMessage, feedbackItems, setFeedbackItems } =
    useFeedbackItems();
  const [selectCompany, setSelectCompany] = useState("");

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => array.indexOf(company) === index),
    [feedbackItems]
  );

  const filteredFeedbackItems = useMemo(
    () =>
      selectCompany
        ? feedbackItems.filter(
            (feedBackItem) => feedBackItem.company === selectCompany
          )
        : feedbackItems,
    [selectCompany, feedbackItems]
  );
  const handleAddItems = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };
    setFeedbackItems((prevItems) => [...prevItems, newItem]);

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleSelectedCompany = (company: string) => {
    setSelectCompany(company);
  };

  return (
    <FeedbackItemsContext.Provider
      value={{
        isLoading,
        errorMessage,
        companyList,
        handleAddItems,
        handleSelectedCompany,
        filteredFeedbackItems,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
