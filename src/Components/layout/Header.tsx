import Pattern from "../Pattern";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import FeedBackForm from "../feedback/FeedBackForm";

import { useFeedbackItemsStore } from "../../stores/FeedbackItemsContext";

export default function Header() {
  const addItemToList = useFeedbackItemsStore((state) => state.addItemToList);
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedBackForm onAddToList={addItemToList} />
    </header>
  );
}
