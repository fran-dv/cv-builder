import "./App.css";
import { CVPreview } from "@/components";
import type { PersonalInfo } from "./models";

function App() {
  const mockPersonalInfo: PersonalInfo = {
    name: "Juan",
    jobTitle: "Software Engineer",
    email: "juan@mail.com",
    phone: 2241565656,
    city: "New York",
  };

  return (
    <>
      <main>
        <CVPreview personalInfo={mockPersonalInfo} />
      </main>
    </>
  );
}

export default App;
