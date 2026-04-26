const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    // THÊM: selectedSize vào destructuring
    const { productId, quantity = 1, selectedSize } = req.body;

    if (!productId || quantity < 1) {
      return res
        .status(400)
        .json({ error: "ProductId và quantity hợp lệ là bắt buộc" });
    }

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Stock validation
    if (product.stock !== undefined && quantity > product.stock) {
      return res.status(400).json({ error: `Số lượng sản phẩm không đủ. Chỉ còn ${product.stock} sản phẩm trong kho` });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // SỬA ĐỔI LOGIC: Kiểm tra cả productId VÀ selectedSize
    const itemIndex = cart.items.findIndex(
      (i) =>
        i.product.toString() === productId &&
        (i.selectedSize === selectedSize || (!i.selectedSize && !selectedSize))
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price = product.price; // Cập nhật giá mới nhất
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        // THÊM: selectedSize vào item
        selectedSize: selectedSize || null,
        imageUrl:
          product.images && product.images.length > 0
            ? product.images[0]
            : null,
      });
    }

    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    if (quantity < 1) {
      return res.status(400).json({ error: "Số lượng phải lớn hơn 0" });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find item in cart using _id
    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Stock validation
    const product = await Product.findById(item.product);
    if (product && product.stock !== undefined && quantity > product.stock) {
      return res.status(400).json({ error: `Số lượng sản phẩm không đủ. Chỉ còn ${product.stock} sản phẩm trong kho` });
    }

    item.quantity = quantity;
    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Remove item from cart
    cart.items = cart.items.filter((i) => i._id.toString() !== itemId);
    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = [];
    cart.updatedAt = new Date();
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
