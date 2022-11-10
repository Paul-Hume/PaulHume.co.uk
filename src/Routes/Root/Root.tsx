import { Header } from "Modules";
import { useOutlet } from "react-router-dom";
import { HomePage } from "Routes/Home";

export const Root = () => {
  const outlet = useOutlet();

  return (
    <div>
      <Header />      
      {outlet || <HomePage />}
    </div>
  );
}