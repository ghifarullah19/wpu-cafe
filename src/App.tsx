import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeToggle } from "./components/ui/ThemeToggle/ThemeToggle";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 9999 }}>
        <ThemeToggle />
      </div>
    </>
  );
}

export default App;
