import { useEffect, useRef, useState } from "react";
import Form from "./components/form";
import Table from "./components/table";

export default function App() {
  const [users, setUsers] = useState(() => {
    const localStorageUsers = localStorage.getItem("users");
    return localStorageUsers ? JSON.parse(localStorageUsers) : [];
  });

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  function addUser(newUser) {
    setUsers((prev) => [...prev, newUser]);
  }

  return (
    <main>
      <Form onSubmit={addUser} />
      {users.length === 0 ? (
        <p>No users registered</p>
      ) : (
        <Table users={users} />
      )}
    </main>
  );
}
