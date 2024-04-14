import {
  CreatePurchaseOrder,
  PurchaseOrderRequest,
} from "../model/purchaseOrder.request";
import { TypedRequest } from "../types/types";
import To from "../utils/to.util";
import purchaseOrderService from "../service/purchaseOrder.service";
import type { Response } from "express";
import {
  responseDataNotFound,
  responsePaggingSuccess,
  responseServerException,
  responseSuccess,
} from "../utils/return.util";
import logger from "../middleware/logger";

export const searchPurchaseOrder = async (
  req: TypedRequest<PurchaseOrderRequest>,
  res: Response
) => {
  const criteria = req.body as PurchaseOrderRequest;
  criteria.page = req.body?.page ?? 1;
  criteria.limit = req.body?.limit ?? 20;
  criteria.sort = req.body?.sort ?? "id";
  criteria.order = req.body?.order ?? "DESC";

  const [error, result] = await To(
    purchaseOrderService.searchPurchaseOrder(criteria)
  );
  if (error) {
    return responseServerException(res, error.message, null);
  }
  return responsePaggingSuccess(
    res,
    null,
    result?.rows,
    result?.count ?? 0,
    criteria.page,
    criteria.limit
  );
};

export const getByPurchaseOrderId = async (
  req: TypedRequest<PurchaseOrderRequest>,
  res: Response
) => {
  const id = req.params.id as number;
  const [error, result] = await To(
    purchaseOrderService.getByPurchaseOrderId(id)
  );
  if (error) {
    return responseServerException(res, error.message, null);
  }
  if (result == null) {
    return responseDataNotFound(res);
  }
  return responseSuccess(res, null, result);
};

export const createPurchaseOrder = async (
  req: TypedRequest<CreatePurchaseOrder>,
  res: Response
) => {
  const purchaseOrder = req.body as CreatePurchaseOrder;
  const [error, result] = await To(
    purchaseOrderService.createPurchaseOrder(purchaseOrder)
  );
  if (error) {
    return responseServerException(res, error.message, null);
  }
  res.status(201).json({
    message: "success",
    data: result,
  });
};

export const reportPurchaseOrder = async (
  req: TypedRequest<PurchaseOrderRequest>,
  res: Response
) => {
  const id = req.params.id as number;
  const [error, result] = await To(
    purchaseOrderService.getByPurchaseOrderId(id)
  );
  if (error) {
    return responseServerException(res, error.message, null);
  }
  const [reportError, reportResult] = await To(
    purchaseOrderService.createPurchaseOrderReport(result)
  );
  if (reportError) {
    return responseServerException(res, reportError.message, null);
  }

  if (reportResult == null) {
    return responseDataNotFound(res);
  }

  // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  // res.setHeader("Content-Disposition", `attachment; filename=FT_PO.xlsx}`);
  // res.send(reportResult);
  return responseSuccess(res, null, {
    fileName: 'FT_PO.xlsx',
    data: (Buffer.from(reportResult).toString('base64')),
  })
};

export const updatePurchaseOrder = async (
  req: TypedRequest<PurchaseOrderRequest>,
  res: Response
) => {

  const id = req.params.id as number;
  const purchaseOrder = req.body as CreatePurchaseOrder;
  const [_, founded] = await To(purchaseOrderService.getByPurchaseOrderId(id));
  if (founded == null) {
    return res
      .status(404)
      .json({ code: 404, message: "Not found", data: null });
  }
  const [error, result] = await To(
    purchaseOrderService.updatePurchaseOrder(id, purchaseOrder)
  );
  if (error) {
    return responseServerException(res, error.message, null);
  }
  return responseSuccess(res, null, result);
};
