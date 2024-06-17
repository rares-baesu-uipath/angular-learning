import { ConfiguredSculpture } from "./sculpture"

export type Order = {
    id: string,
    buyerName: string,
    buyerDeliveryAddress: string,
    configuredSculptures: ConfiguredSculpture[]
}