import { useEffect, useRef, useState } from "react";

function App() {
  const [message, setMessage] = useState(["Welcome to ChatRoom"]);
  const wsRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:9999"); 

    ws.onmessage = (event) => {
      setMessage((m) => [...m, event.data]);
    };
    ws.onopen=()=>{
      ws.send(JSON.stringify({
        type: "join",
        payload: {
           roomId:"RED"      
            }}
          ))
    }
    wsRef.current = ws;

    return () => {
      ws.close(); 
    };
  }, []);

  return (
    <div className="bg-black h-full">
      <div className="h-[90vh] border-b-blue-100 overflow-auto p-4 text-white">
        {message.map((msg, index) => (
          <div key={index}>
            <span>{msg}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 flex gap-2">
        <input ref={inputRef} type="text" placeholder="Enter your message" className="border p-2 flex-grow" />
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            if (wsRef.current && inputRef.current.value.trim()) {
              wsRef.current.send(
                JSON.stringify({
                  type: "chat",
                  payload: {
                    message: inputRef.current.value.trim(), 
                  },
                })
              );
              inputRef.current.value = ""; // Clear input after sending
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
