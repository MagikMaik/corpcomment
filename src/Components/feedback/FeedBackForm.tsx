import { useState } from "react";
import { MAX_CHAR } from "../../lib/constants";

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};
export default function FeedBackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("");

  const charCount = MAX_CHAR - text.length;
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length > MAX_CHAR) {
      return;
    }
    setText(newText);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddToList(text);
    setText("");
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder="Enter feedback"
        spellCheck={false}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hastag
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
