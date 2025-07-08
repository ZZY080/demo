// Auto-generated at 2025-07-08T07:01:08.429Z
import { request } from "../utils/request";

// GET /orders
export const getOrderListRequest = (params) =>
  request.get("/orders", { params });

// GET /orders/:id
export const getOrderDetailRequest = (params) => request.get(`/orders/${id}`);

// POST /orders
export const postOrderCancelRequest = (params) => request.post("/orders");
