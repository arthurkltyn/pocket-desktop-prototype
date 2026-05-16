import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Waiting for device...");
  const [meetings, setMeetings] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  async function connectDevice() {
    setStatus("Scanning for USB/BLE devices...");
    setTimeout(async () => {
      const res = await invoke("check_pocket_device");
      setStatus(res as string);
    }, 800);
  }

  async function sync() {
    setIsSyncing(true);
    setTimeout(async () => {
      const res = await invoke("sync_meetings");
      setMeetings(res as string[]);
      setIsSyncing(false);
    }, 1200);
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#0f172a", color: "white", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px", fontWeight: "bold" }}>HeyPocket Desktop Sync</h1>
      
      <div style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "8px", marginBottom: "30px", border: "1px solid #334155" }}>
        <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Device Status</p>
        <p style={{ color: "#4ade80", fontFamily: "monospace", fontSize: "1.2rem", marginTop: "5px" }}>{status}</p>
        <button 
          onClick={connectDevice}
          style={{ marginTop: "15px", backgroundColor: "#2563eb", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}
        >
          Scan for HeyPocket
        </button>
      </div>

      <div>
        <h2 style={{ fontSize: "1.5rem", borderBottom: "1px solid #334155", paddingBottom: "10px", marginBottom: "20px" }}>Transcripts & Recordings</h2>
        
        {meetings.length === 0 && !isSyncing && (
          <p style={{ color: "#94a3b8", fontStyle: "italic" }}>No meetings synced yet. Click sync to pull from device.</p>
        )}
        
        {isSyncing && (
          <p style={{ color: "#38bdf8", fontWeight: "bold" }}>Syncing from hardware and processing AI summaries...</p>
        )}
        
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {meetings.map((m, idx) => (
            <div key={idx} style={{ padding: "15px", backgroundColor: "#334155", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", fontSize: "1.1rem" }}>
              {m}
            </div>
          ))}
        </div>
        
        <button 
          onClick={sync} 
          disabled={isSyncing}
          style={{ marginTop: "20px", border: "1px solid #38bdf8", backgroundColor: "transparent", color: "#38bdf8", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
        >
          {isSyncing ? "Synchronizing..." : "Sync All Recordings"}
        </button>
      </div>
    </div>
  );
}

export default App;
