import { useQuery } from "@tanstack/react-query";

import type { OrderDTO } from "../dtos/order.dts";
import { OrderService } from "../services/order.service";


export function useOrders() {
    return useQuery<OrderDTO[]>({
        queryKey: ['orders'],
        queryFn: OrderService.list
    });
}

export function useOrder(id: string) {
    return useQuery<OrderDTO>({
        queryKey: ['order', id],
        queryFn: () => OrderService.getById(id),
        enabled: !!id 
    });
}

