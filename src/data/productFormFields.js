const productFormFields = {
  title: "",
  slug: "",
  categories: [],
  price: 0,
  priceOnSale: 0,
  costPrice: 0,
  stock: 0,
  unitsSold: 0,
  materials: [],
  size: { width: "", height: "", depth: "" },
  weight: "",
  colors: [],
  variants: [], // Used for similar products that will be featuerd on this products page
  descriptionMarkdown: `## Product Overview, might not be needed

Enter a little bit of product information here

- List Element 1
- List Element 2 

### Title for more Info about the Product here

More info about product.`,

  searchKeywords: [],
  thumbnailImageId: "",
  imageIds: [], // First image object will be used as Thumbnail

  // Pokemon Related Data
  pokemonData: {
    pokemon: "",
    pokedexNumber: "",
    pokedexEntry: "",
    generation: "",
    typing: { typing1: "", typing2: "" },
    isShiny: false,
    gender: "",
  },

  // 3D Print Related Data
  printedModel: {
    printTime: { hours: "", minutes: "" },
    description: "",
    printColors: [{ filamentId: "", grams: "" }], // filamentId references filaments collection, grams used
  },

  creatorManufacturer: "",
  creatorManufacturerUrl: "",
  eanBarcode: "",
  productCode: "",

  isActive: true,
  isFeatured: false,

  // Sale dates - product is on sale when current date is between from and to
  sale: {
    from: "",
    to: "",
  },

  feedback: [],

  createdAt: "",
  updatedAt: "",
};

export default productFormFields;
