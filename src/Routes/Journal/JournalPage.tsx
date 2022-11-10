import { Link } from "Components";
import { useOutlet } from "react-router-dom";

export const JournalPage = () => {
  const outlet = useOutlet();

  return outlet || (
    <section>
      <h1>Journal</h1>

      <Link to={'1'}>Journal Item 1</Link>
      <Link to={'2'}>Journal Item 2</Link>
      <Link to={'3'}>Journal Item 3</Link>

    </section>
  );
};