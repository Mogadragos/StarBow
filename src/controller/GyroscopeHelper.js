class GyroscopeHelper {
    gyroscope;

    isPresent() {
        return "Gyroscope" in window;
    }

    async isNotGranted() {
        return navigator.permissions
            .query({ name: "gyroscope" })
            .then((result) => result.state != "granted");
    }

    init() {
        this.gyroscope = new Gyroscope({ frequency: 60 });

        this.gyroscope.addEventListener("reading", (e) => {
            console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
            console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
            console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);
        });
    }

    start() {
        console.log("Starting");
        this.gyroscope.start();
    }
}
