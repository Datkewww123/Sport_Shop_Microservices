const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

/**
 * @swagger
 * tags:
 *   name: Promotions
 *   description: API quản lý mã giảm giá/khuyến mãi
 */

/**
 * @swagger
 * /promotions:
 *   get:
 *     summary: Lấy danh sách mã giảm giá
 *     tags: [Promotions]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Lọc theo trạng thái hoạt động
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 */
router.get('/', promotionController.getPromotions);

/**
 * @swagger
 * /promotions:
 *   post:
 *     summary: Tạo mã giảm giá mới (Admin)
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discount
 *               - validFrom
 *               - validTo
 *             properties:
 *               code:
 *                 type: string
 *                 example: SUMMER2025
 *               discount:
 *                 type: number
 *                 example: 10
 *               discountType:
 *                 type: string
 *                 enum: [percentage, fixed]
 *                 example: percentage
 *               minOrderValue:
 *                 type: number
 *                 example: 500000
 *               maxDiscount:
 *                 type: number
 *                 example: 100000
 *               validFrom:
 *                 type: string
 *                 format: date-time
 *               validTo:
 *                 type: string
 *                 format: date-time
 *               usageLimit:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Tạo mã giảm giá thành công
 *       401:
 *         description: Chưa xác thực
 *       403:
 *         description: Không có quyền
 */
router.post('/', auth, admin, promotionController.createPromotion);

/**
 * @swagger
 * /promotions/{id}:
 *   put:
 *     summary: Cập nhật mã giảm giá (Admin)
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của mã giảm giá
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: number
 *               validFrom:
 *                 type: string
 *                 format: date-time
 *               validTo:
 *                 type: string
 *                 format: date-time
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy mã giảm giá
 */
router.put('/:id', auth, admin, promotionController.updatePromotion);

/**
 * @swagger
 * /promotions/{id}:
 *   delete:
 *     summary: Xóa mã giảm giá (Admin)
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của mã giảm giá
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy mã giảm giá
 */
router.delete('/:id', auth, admin, promotionController.deletePromotion);

module.exports = router;
