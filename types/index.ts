export type Client = {
    'full_name': string,
    'address': string,
    'cups': string,
    'role': string,
    'building_type': string
}

type SupplyPointPower = {
    p1: string,
    p2: string
}

export type SupplyPoint = {
    'cups': string,
    'tariff': string,
    'invoiced_amount': string,
    'power': SupplyPointPower,
    'neighbors': string[]
}

export type Neighbor = {
    'client' : Client,
    'supplyPoint' : SupplyPoint,
}
