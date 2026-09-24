export interface Plant {
    id: number
    commonName:  string
    latinName?:  string
    careGuide?:   string
    carelevel:   string
    Environment: string
    Lighting:    string
    createdAt:   string
    updatedAt:   string
    listings?:    Listing[] // One plant can have many sale listings
}

// Specific inventory items listed for sale
export interface Listing {
    id:number
    title: string
    description: string
    price: number
    status: string
    images? : Image[]
    createdAt :   string
    updatedAt :   string
}

// Stored image URLs for listing items
export interface Image {
    id  :   number
    url  :  string
    listingId: number
    listing:  Listing
}