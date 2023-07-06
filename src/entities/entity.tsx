interface PontoTuristico {
    description: string;
    data: string;
    latitude: number;
    longitude: number;
    images: string[];
  }
  
  const pontosTuristicos: PontoTuristico[] = [
    {
      description: "Ponte Metálica",
      data: "Construída em 1912",
      latitude: -22.117745,
      longitude: -43.211875,
      images: [
        "",
        "https://example.com/ponte-metalica-2.jpg",
      ],
    },
    {
      description: "Casa de Cultura",
      data: "Construída no século XIX",
      latitude: -22.119760,
      longitude: -43.210125,
      images: [
        "https://example.com/casa-de-cultura-1.jpg",
        "https://example.com/casa-de-cultura-2.jpg",
      ],
    },
    {
      description: "Parque das Águas",
      data: "Inaugurado em 2007",
      latitude: -22.117402,
      longitude: -43.220875,
      images: [
        "https://example.com/parque-das-aguas-1.jpg",
        "https://example.com/parque-das-aguas-2.jpg",
      ],
    },
    {
      description: "Igreja Matriz de São Sebastião",
      data: "Construída em 1852",
      latitude: -22.118594,
      longitude: -43.212493,
      images: [
        "https://example.com/igreja-matriz-1.jpg",
        "https://example.com/igreja-matriz-2.jpg",
      ],
    },
  ];