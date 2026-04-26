const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: API quản lý tồn kho
 */

/**
 * @swagger
 * /inventory/{productId}:
 *   get:
 *     summary: Lấy thông tin tồn kho của sản phẩm
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                 variants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       size:
 *                         type: string
 *                       color:
 *                         type: string
 *                       quantity:
 *                         type: number
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.get('/:productId', inventoryController.getInventory);

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Thêm record tồn kho mới (Admin)
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - variants
 *             properties:
 *               productId:
 *                 type: string
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                       example: M
 *                     color:
 *                       type: string
 *                       example: Đen
 *                     quantity:
 *                       type: number
 *                       example: 100
 *     responses:
 *       201:
 *         description: Tạo record thành công
 *       401:
 *         description: Chưa xác thực
 *       403:
 *         description: Không có quyền
 */
router.post('/', auth, admin, inventoryController.createInventory);

/**
 * @swagger
 * /inventory/{productId}:
 *   put:
 *     summary: Cập nhật số lượng tồn kho (Admin)
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                     color:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.put('/:productId', auth, admin, inventoryController.updateInventory);

module.exports = router;
