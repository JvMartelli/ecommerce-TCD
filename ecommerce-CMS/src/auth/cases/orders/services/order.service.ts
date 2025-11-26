import { api } from "../../../lib/axios";
import type { OrderDTO } from "../dtos/order.dts";

const _ENDPOINT = '/order';

export const OrderService = {

    async list(): Promise<OrderDTO[]> {
        const result = await api.get(_ENDPOINT);
        return result.data;
    },

    async create(order: OrderDTO): Promise<OrderDTO> {
        const result = await api.post(_ENDPOINT, order);
        return result.data;
    },

    async getById(id: string): Promise<OrderDTO> {
        const result = await api.get(`${_ENDPOINT}/${id}`);
        return result.data;
    },

    async update(id: string, order: OrderDTO): Promise<OrderDTO> {
        const result = await api.put(`${_ENDPOINT}/${id}`, order);
        return result.data;
    },

    async delete(id: string): Promise<void>{
        await api.delete(`${_ENDPOINT}/${id}`);
    }

};