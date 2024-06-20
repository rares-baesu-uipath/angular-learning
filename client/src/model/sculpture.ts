export enum Material {
    WOOD = 'WOOD',
    BRONZE = 'BRONZE',
    PLATINUM = 'PLATINUM'
}

export const MATERIAL_CONFIG = {
    [Material.WOOD]: {
        weightMultiplier: 1,
        priceMultiplier: 1,
    },
    [Material.BRONZE]: {
        weightMultiplier: 12.4,
        priceMultiplier: 2,
    },
    [Material.PLATINUM]: {
        weightMultiplier: 30.3,
        priceMultiplier: 18
    }
}

export type Sculpture = {
    id: string,
    name: string,
    basePrice: number,
    baseWeight: number,
}

export type ConfiguredSculpture = {
    sculpture: Sculpture,
    material: Material
}