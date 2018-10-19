import Book from "./Book";
import Author from "./Author";

const components = {
  Book,
  Author
};

export const renderComponent = ({ name, props }) => {
  const Component = components[name];
  const componentProps = {};

  props.map(({ name, value }) => {
    componentProps[name] = value;
  });

  return <Component {...componentProps} />;
};

export const renderUI = components => {
  return (
    <React.Fragment>
      {components.map(({ name, props }, key) => (
        <React.Fragment key={key}>
          {renderComponent({ name, props })}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
