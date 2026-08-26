import axios from "axios";

function App() {
  const testBackend = async () => {
    try {
      const response = await axios.get("/api/test");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Frontend</h1>

      <button onClick={testBackend}>
        Test Backend
      </button>
    </div>
  );
}

export default App;