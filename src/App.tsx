import "./App.css";
import { Controls } from "./components/Controls/Controls";
import { Header } from "./components/Header/Header";
import { Table } from "./components/Table/Table";

function App() {
  return (
    <div>
      <Header />
      <Controls />
      <Table />
    </div>
  );
}

export default App;
