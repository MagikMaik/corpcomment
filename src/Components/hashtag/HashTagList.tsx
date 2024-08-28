type HashtagListProps = {
  children: React.ReactNode;
};

export default function HashTagList({ children }: HashtagListProps) {
  return <ul className="hashtags">{children}</ul>;
}
