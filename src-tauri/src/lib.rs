#[tauri::command]
fn check_pocket_device() -> String {
    // Simulates detecting the hardware over USB/BLE
    "HeyPocket Device Found (v2.1.0) - Connected via USB".into()
}

#[tauri::command]
async fn sync_meetings() -> Vec<String> {
    // Simulates pulling AI transcripts from the backend
    vec![
        "Meeting: Q3 Roadmap Planning - 14:00 (Summarized)".into(),
        "Meeting: Hardware Team Sync - 16:30 (Transcribed)".into(),
        "Meeting: Investor Update - 10:00 (Action Items Pending)".into(),
    ]
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            check_pocket_device,
            sync_meetings
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}