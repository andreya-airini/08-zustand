type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        flexGrow: 1,
      }}
    >
      <aside>{sidebar}</aside>
      <div
        style={{
          margin: "10px",
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default NotesLayout;
