import { useEffect, useState } from "react";
import "./App.css";
// import Drag from "./Drag";
const Item = ({ price, onDragEnd, onDragStart }) => {
  const onDragEndEvent = () => {
    onDragEnd({ price });
  };
  const onDragStartEvent = () => {
    onDragStart();
  };
  return (
    <div
      draggable="true"
      onDragStart={onDragStartEvent}
      onDragEnd={onDragEndEvent}
      className="items"
    >
      <div>Item 1</div>
      <div>$ {price}</div>
    </div>
  );
};
const Table = ({ id, name, total, quantity, setDropedTable }) => {
  return (
    <div
      id={id}
      onDragOver={(e) => {
        console.log(id);
        setDropedTable(id);
      }}
      className="table"
    >
      <div className="table-name">{name}</div>
      {quantity > 0 ? (
        <div>
          <img
            src={process.env.PUBLIC_URL + "/item.png"}
            className="table-item-img"
            alt="table"
          />
          {quantity > 1 && (
            <img
              src={process.env.PUBLIC_URL + "/item.png"}
              className="table-item-img"
              alt="table"
            />
          )}
        </div>
      ) : (
        <div style={{ height: "50px" }} />
      )}
      <img src={process.env.PUBLIC_URL + "/table.png"} alt="table" />
      <div className="table_details">
        <div>
          Total <span>$ {total}</span>
        </div>
        <div>
          quantity <span>{quantity}</span>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [DropedTable, setDropedTable] = useState("");
  const [Tables, setTables] = useState([]);
  useEffect(() => {
    setTables([
      { id: 1, tableName: "table 1", total: 0, quantity: 0 },
      { id: 2, tableName: "table 2", total: 0, quantity: 0 },
      { id: 3, tableName: "table 3", total: 0, quantity: 0 },
    ]);
  }, []);
  const onDragEnd = (e) => {
    console.log(e);
    console.log(DropedTable);
    if (DropedTable !== "") {
      var TempTable = Tables;
      var i = TempTable.findIndex((e) => e.id === DropedTable);
      TempTable[i].quantity += 1;
      TempTable[i].total += e.price;
      setTables(TempTable);
      console.log(Tables[i]);
    }
    setDropedTable("");
  };
  const onDragStart = () => {
    console.log("drag Start");
    // setDropedTable("");
  };
  return (
    <div className="App">
      <div className="containers">
        <p>Tables</p>
        <div className="tables-container">
          {Tables.map((t) => (
            <Table
              id={t.id}
              key={t.id}
              name={t.tableName}
              total={t.total}
              quantity={t.quantity}
              setDropedTable={setDropedTable}
            />
          ))}
        </div>
        <div className="container">
          <p>Items</p>
          <hr />
          <Item price={10} onDragEnd={onDragEnd} onDragStart={onDragStart} />
          <Item price={20} onDragEnd={onDragEnd} onDragStart={onDragStart} />
          <Item price={30} onDragEnd={onDragEnd} onDragStart={onDragStart} />
          <Item price={40} onDragEnd={onDragEnd} onDragStart={onDragStart} />
        </div>
      </div>
    </div>
  );
}

export default App;
