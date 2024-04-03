const peer = new Peer();

peer.on("connection", (conn) => {
    conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);
    });
    conn.on("open", () => {
        conn.send("hello!");
    });
});

peer.on("open", (id) => {
    console.log(id);
});
