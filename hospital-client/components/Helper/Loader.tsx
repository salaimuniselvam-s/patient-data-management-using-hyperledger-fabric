const Loader = ({ isCard }: { isCard?: boolean }) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ minHeight: isCard ? "" : "calc(100vh - 90px)" }}
    >
      <div className="loader "></div>
    </div>
  );
};

function withLoader<T>(
  WrappedComponent: React.ComponentType<T>,
  isLoading: boolean
) {
  return function WithLoader(props: T) {
    return isLoading ? <Loader /> : <WrappedComponent {...(props as any)} />;
  };
}

export default Loader;
