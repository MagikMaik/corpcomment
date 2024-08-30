import Container from "./Components/layout/Container";
import Footer from "./Components/layout/Footer";
import HashTagList from "./Components/hashtag/HashTagList";
import { useEffect } from "react";
import { useFeedbackItemsStore } from "./stores/FeedbackItemsContext";

function App() {
  const fetchFeedbackItems = useFeedbackItemsStore(
    (state) => state.fetchFeedbackItems
  );

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <div className="app">
      <Footer />
      <Container />
      <HashTagList />
    </div>
  );
}

export default App;
