type Location = {
  longitude: number;
  latitude: number;
};

export default function (): Promise<Location> {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("aa");
        resolve({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      });
    } else {
      resolve({
        longitude: 0,
        latitude: 0,
      });
    }
  });
}
