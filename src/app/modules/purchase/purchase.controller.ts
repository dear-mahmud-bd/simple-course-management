import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { PurchaseServices } from './purchase.service';

const purchaseCourse = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { courseId, pay } = req.body;
  const purchase = await PurchaseServices.purchaseACourse(
    userId,
    courseId,
    pay,
  );
  sendResponse(res, {
    success: true,
    message: 'Course purchased successfully',
    statusCode: httpStatus.OK,
    data: purchase,
  });
});

const getMyPurchases = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const purchases = await PurchaseServices.myPurchasesCourse(userId);
  sendResponse(res, {
    success: true,
    message: 'Purchased courses fetched successfully',
    statusCode: httpStatus.OK,
    data: purchases,
  });
});

const getAllPurchasesCourse = catchAsync(async (req: Request, res: Response) => {
  const purchases = await PurchaseServices.getAllPurchasesCourse();
  sendResponse(res, {
    success: true,
    message: 'All purchases fetched successfully',
    statusCode: httpStatus.OK,
    data: purchases,
  });
});


export const PurchaseController = {
  purchaseCourse,
  getMyPurchases,
  getAllPurchasesCourse
};
