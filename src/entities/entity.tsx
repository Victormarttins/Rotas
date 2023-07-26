interface PlaceEntity {

  id: string;
  title: string;
  description: string;
  photoDate: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  imagePath: string;
}

