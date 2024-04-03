(async () => {
    const gyroscopeHelper = new GyroscopeHelper();

    if (!gyroscopeHelper.isPresent()) {
        document.write("Gyroscope is not detected");
        return;
    }

    if (await gyroscopeHelper.isNotGranted()) {
        document.write("Gyroscope permission is not granted");
        return;
    }

    gyroscopeHelper.init();
    gyroscopeHelper.start();

    const peer = new Peer();

    document.getElementById("join-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        const conn = peer.connect(data.get("peer"));
        conn.on("open", () => {
            conn.send("hi!");
            conn.on("data", (data) => {
                console.log("Received", data);
            });
        });
    });
})();
