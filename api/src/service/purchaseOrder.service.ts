import To from "../utils/to.util";

import { PurchaseOrder } from "../database/model/purchaseOrder.db";

import { Op } from "sequelize";
import logger from "../middleware/logger";
import {
    CreatePurchaseOrder,
    PurchaseOrderRequest,
} from "../model/purchaseOrder.request";
import { PurchaseOrderItem } from "../database/model/purchaseOrderItem.db";
import ExcelJS from "exceljs";
import moment from "moment";
import projectService from "./project.service";
import { PurchaseOrderResponse } from "../model/response/purchaseOrder.response";
import { sequelize } from "../database/config";

const searchPurchaseOrder = async (criteria: PurchaseOrderRequest) => {
    try {
        const where: any = {};
        if (criteria.id) {
            where.id = criteria.id;
        }
        if (criteria.projectId) {
            where.projectId = criteria.projectId;
        }

        if (criteria.delivery) {
            where.delivery = {
                [Op.like]: `%${criteria.delivery}%`,
            };
        }

        if (criteria.paymentTerm) {
            where.paymentTerm = {
                [Op.like]: `%${criteria.paymentTerm}%`,
            };
        }
        const [error, result] = await To(
            PurchaseOrder.findAndCountAll({
                where,
                limit: criteria.limit,
                offset: criteria.page * criteria.limit - criteria.limit,
            })
        );
        if (error) {
            throw error;
        }
        return result;
    } catch (e) {
        logger.error(e);
        throw e;
    }
};

const getByPurchaseOrderId = async (id: number) => {
    try {
        const [error, result] = await To(
            PurchaseOrder.findOne({
                where: { id },
            })
        );
        if (error) {
            throw error;
        }
        const [itemError, itemResult] = await To(
            PurchaseOrderItem.findAll({
                where: { purchaseOrderId: id },
            })
        );
        if (itemError) {
            throw itemError;
        }
        const resData: any = { ...result?.get() };
        if (itemResult != null) {
            const purchaseOrderItem: any[] = itemResult.map((item) => { return { ...item?.get() } });
            resData.purchaseOrderItem = purchaseOrderItem;
        }

        if (resData != null && resData.projectId != null) {
            const [projectError, projectResult] = await To(
                projectService.findById(resData?.projectId)
            );
            if (projectError) {
                throw projectError;
            }
            const project: any = { ...projectResult?.get() };
            resData.project = project;
        }
        return resData;
    } catch (e) {
        logger.error(e);
        throw e;
    }
};

const createPurchaseOrder = async (purchaseOrder: CreatePurchaseOrder) => {
    try {
        const [error, result] = await To(
            PurchaseOrder.create(
                {
                    ...purchaseOrder, poDate: purchaseOrder?.poDate ? moment(purchaseOrder.poDate).toDate() : null,
                    sendDate: purchaseOrder?.sendDate ? moment(purchaseOrder.sendDate).toDate() : null,
                }, { isNewRecord: true },)
        );
        if (error) {
            throw error;
        }
        result!.dataValues.id = result?.id;
        const purchaseOrderId = result?.id;
        logger.info(`created purchaseOrderId => ${purchaseOrderId}`);

        const purchaseOrderItems = purchaseOrder.purchaseOrderItem.map((item) => {
            return {
                ...item,
                purchaseOrderId,
            };
        });
        await To(PurchaseOrderItem.bulkCreate(purchaseOrderItems));
        return result;
    } catch (e) {
        logger.error(e);
        throw e;
    }
};

const updatePurchaseOrder = async (
    id: number,
    purchaseOrder: CreatePurchaseOrder
) => {
    const transaction = await sequelize.transaction();
    try {
        const [error, result] = await To(
            PurchaseOrder.update(
                {
                    ...purchaseOrder,
                    poDate: purchaseOrder?.poDate ? moment(purchaseOrder.poDate).toDate() : null,
                    sendDate: purchaseOrder?.sendDate ? moment(purchaseOrder.sendDate).toDate() : null,
                },
                { where: { id }, transaction }
            )
        );
        if (error) {
            throw error;
        }
        const purchaseOrderId = id;
        logger.info(`updated purchaseOrderId => ${purchaseOrderId}`);

        await To(PurchaseOrderItem.destroy({ where: { purchaseOrderId }, transaction }));
        const purchaseOrderItems = purchaseOrder?.purchaseOrderItem?.map((item) => {
            return {
                ...item,
                purchaseOrderId,
            };
        });
        await To(PurchaseOrderItem.bulkCreate(purchaseOrderItems, { transaction }));
        await transaction.commit();
        return result;
    } catch (e) {
        await transaction.rollback();
        logger.error(e);
        throw e;
    }
}

const createPurchaseOrderReport = async (reportData: PurchaseOrderResponse) => {
    // const createPurchaseOrderReport = async (purchaseOrder: CreatePurchaseOrder) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("assets/template/TEMPLATE_FT_PO.xlsx");
    let worksheet = workbook.getWorksheet("Sheet1");
    const cellI3 = worksheet?.getCell("I3");
    if (cellI3) {
        cellI3.value = reportData?.poCode ?? "";
    }
    const cellI4 = worksheet?.getCell("I4");
    if (cellI4) {
        cellI4.value = moment(reportData?.poDate).format("DD/MM/YYYY") ?? "";
    }
    const cellI5 = worksheet?.getCell("I5");
    if (cellI5) {
        cellI5.value = reportData.refqno ?? "";
    }
    const cellI6 = worksheet?.getCell("I6");
    if (cellI6) {
        cellI6.value = reportData?.project?.name ?? "";
    }
    const cellA9 = worksheet?.getCell("A9");
    if (cellA9) {
        cellA9.value = `${reportData?.vendor ?? ""} / ${reportData?.vendorName ?? ""}\n${reportData?.vendorAddress ?? ""}`;
    }
    const cellH9 = worksheet?.getCell("H9");
    if (cellH9) {
        cellH9.value = `${reportData?.shipToName ?? ""}\n${reportData?.shipToAddress ?? ""}`;
    }
    const b44 = worksheet?.getCell("B44");
    if (b44) {
        b44.value = `${reportData?.paymentTerm ?? ""}`;
    }
    const b45 = worksheet?.getCell("B45");
    if (b45) {
        b45.value = `${reportData?.delivery ?? ""}`;
    }
    const b46 = worksheet?.getCell("B46");
    if (b46) {
        b46.value = `${reportData?.validity ?? ""}`;
    }
    const b47 = worksheet?.getCell("B47");
    if (b47) {
        b47.value = `${reportData?.warranty ?? ""}`;
    }
    let startRowDataIndex = 18;
    let totalDiscount = 0;
    for (let i = 0; i < reportData?.purchaseOrderItem?.length; i++) {
        const item = reportData?.purchaseOrderItem[i];
        const row = worksheet?.getRow(startRowDataIndex);
        if (row != null) {
            row.getCell(1).value = item?.partNumber ?? "";
            row.getCell(3).value = item?.description ?? "";
            row.getCell(8).value = +(item?.qty ?? 0);
            row.getCell(9).value = +(item?.unitPrice ?? 0);
            row.getCell(10).value = +(item?.discount ?? 0);
            row.getCell(11).value = +(item?.amount ?? 0);
        }
        totalDiscount += +(item?.discount ?? 0);
        startRowDataIndex++;
    }
    const k44 = worksheet?.getCell("K44");
    if (k44) {
        k44.value = +totalDiscount;
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default {
    searchPurchaseOrder,
    getByPurchaseOrderId,
    createPurchaseOrder,
    createPurchaseOrderReport,
    updatePurchaseOrder,
};
