type Location = {
  longitude: number;
  latitude: number;
};

export default function (): Promise<Location> {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        () => {
          resolve({
            longitude: 70,
            latitude: 50,
          });
        }
      );
    } else {
      console.log("klm,");
      resolve({
        longitude: 0,
        latitude: 0,
      });
    }
  });
}
