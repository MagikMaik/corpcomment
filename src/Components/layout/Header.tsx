import React from "react";
import FeedBackList from "../feedback/FeedBackList";
import Pattern from "../Pattern";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import FeedBackForm from "../feedback/FeedBackForm";

type HeaderProps = {
  handleAddItems: (text: string) => void;
};
export default function Header({ handleAddItems }: HeaderProps) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedBackForm onAddToList={handleAddItems} />
    </header>
  );
}
