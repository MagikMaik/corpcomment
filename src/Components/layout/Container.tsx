import Header from "./Header";
import FeedBackList from "../feedback/FeedBackList";
import { TFeedbackItem } from "../../lib/types";

type ContainerProps = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  handleAddItems: (text: string) => void;
};

export default function Container({
  feedbackItems,
  isLoading,
  errorMessage,
  handleAddItems,
}: ContainerProps) {
  return (
    <main className="container">
      <Header handleAddItems={handleAddItems} />
      <FeedBackList
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  );
}
