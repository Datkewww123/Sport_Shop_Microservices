// src/context/CartContext.jsx (Đã sửa đổi để dùng Backend API)
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { fetchApi } from "../utils/api";
import { useAuth } from "./AuthContext"; // Import AuthContext để kiểm tra trạng thái đăng nhập

const CartContext = createContext();

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Thêm state loading

  // Hàm Fetch Cart từ Backend
  const fetchCart = useCallback(async () => {
    if (!currentUser) {
      setCartItems([]);
      return;
    }
    setIsLoading(true);
    try {
      // Endpoint: GET /cart
      const response = await fetchApi("/cart");
      const cart = response.data || response; // Xử lý cả 2 format

      // Chuyển đổi định dạng dữ liệu từ Backend sang Frontend
      const formattedItems = (cart?.items || []).map((item) => ({
        id: item._id, // ID của Cart Item (quan trọng để PUT/DELETE)
        originalProductId: item.product._id, // ID của Product
        productSlug: item.product.slug, // Slug của Product (cho link chi tiết)
        name:
          item.product.name +
          (item.selectedSize ? ` (Size: ${item.selectedSize})` : ""),
        price: item.price,
        quantity: item.quantity,
        // Lấy ảnh đầu tiên của sản phẩm nếu không có imageUrl riêng
        imageUrl:
          item.imageUrl ||
          (item.product.images?.length > 0 ? item.product.images[0] : null),
        selectedSize: item.selectedSize,
      }));
      setCartItems(formattedItems);
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  // Chạy fetchCart khi component mount hoặc khi trạng thái đăng nhập thay đổi
  useEffect(() => {
    if (currentUser) {
      fetchCart();
    } else {
      // QUAN TRỌNG: Xóa giỏ hàng khi logout
      setCartItems([]);
    }
  }, [currentUser, fetchCart]);

  // Hàm thêm sản phẩm vào giỏ
  const addToCart = async (product, quantityToAdd = 1, selectedSize = null) => {
    if (!currentUser) {
      return { success: false, message: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng." };
    }
    try {
      // Endpoint: POST /cart
      await fetchApi("/cart", {
        method: "POST",
        body: JSON.stringify({
          productId: product.id,
          quantity: quantityToAdd,
          selectedSize: selectedSize, // Cần thêm trường này vào CartController backend
        }),
      });
      await fetchCart(); // Cập nhật lại giỏ hàng
      return { success: true };
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ:", error);
      return { success: false, message: error.message };
    }
  };

  // Hàm cập nhật số lượng
  const updateQuantity = async (itemId, newQuantity) => {
    if (!currentUser || newQuantity < 1) return;

    try {
      // Endpoint: PUT /cart/:itemId
      await fetchApi(`/cart/${itemId}`, {
        method: "PUT",
        body: JSON.stringify({ quantity: newQuantity }),
      });
      await fetchCart();
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };

  // Hàm xóa sản phẩm
  const removeFromCart = async (itemId) => {
    if (!currentUser) return;
    try {
      // Endpoint: DELETE /cart/:itemId
      await fetchApi(`/cart/${itemId}`, { method: "DELETE" });
      await fetchCart();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  // Hàm xóa sạch giỏ hàng (dùng cho thanh toán)
  const clearCart = async () => {
    if (!currentUser) {
      setCartItems([]);
      return;
    }
    try {
      // Endpoint: DELETE /cart
      await fetchApi("/cart", { method: "DELETE" });
      await fetchCart();
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
    }
  };

  // Hàm reset giỏ hàng (khi logout)
  const resetCart = () => {
    setCartItems([]);
  };

  // Tính toán tổng số lượng và tổng tiền (tính toán local)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    cartCount,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    resetCart,
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  return useContext(CartContext);
};
