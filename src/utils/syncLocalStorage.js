export function syncLocalStorageToDB() {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    // collect all localStorage into an object
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
  
    fetch("/api/save-localstorage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ localStorageData: data }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("🔄 Synced localStorage to DB:", result);
      })
      .catch((err) => console.error("❌ Sync error:", err));
  }
  