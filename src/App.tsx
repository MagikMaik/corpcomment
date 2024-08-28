import { useEffect, useMemo, useState } from "react";
import Container from "./Components/layout/Container";
import Footer from "./Components/layout/Footer";
import HashTagList from "./Components/hashtag/HashTagList";
import { TFeedbackItem } from "./lib/types";
import HashTagItem from "./Components/hashtag/HashTagItem";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectCompany, setSelectCompany] = useState("");

  const filteredFeedbackItems = useMemo(
    () =>
      selectCompany
        ? feedbackItems.filter(
            (feedBackItem) => feedBackItem.company === selectCompany
          )
        : feedbackItems,
    [selectCompany, feedbackItems]
  );

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => array.indexOf(company) === index),
    [feedbackItems]
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

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage("Something went wrong");
      }

      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);
  return (
    <div className="app">
      <Footer />
      <Container
        feedbackItems={filteredFeedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddItems={handleAddItems}
      />
      <HashTagList>
        {companyList.map((company: string) => (
          <HashTagItem
            key={company}
            company={company}
            onSelectCompany={handleSelectedCompany}
          />
        ))}
      </HashTagList>
    </div>
  );
}

export default App;
