import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders, ORDER_STATUSES } from "../../context/OrdersContext";
import { useAuth } from "../../context/AuthContext";
import { useImages } from "../../context/ImagesContext";
import ResponsiveWidthWrapper from "../../components/ResponsiveWidthWrapper/ResponsiveWidthWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCheckCircle,
  faClock,
  faPrint,
  faShippingFast,
  faMoneyBillWave,
  faBan,
  faUndo,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

const OrderHistory = () => {
  const { orders, loading } = useOrders();
  const { currentUser } = useAuth();
  const { images } = useImages();
  const navigate = useNavigate();

  const getImageUrl = (thumbnailId) => {
    if (!thumbnailId || !images) return null;
    const image = images.find((img) => img.id === thumbnailId);
    return image?.url || null;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case ORDER_STATUSES.PENDING:
        return faClock;
      case ORDER_STATUSES.ACTIVE:
        return faBox;
      case ORDER_STATUSES.PRINTING:
        return faPrint;
      case ORDER_STATUSES.PRINTED:
        return faCheckCircle;
      case ORDER_STATUSES.SHIPPED:
        return faShippingFast;
      case ORDER_STATUSES.COMPLETED:
        return faCheckCircle;
      case ORDER_STATUSES.CANCELLED:
        return faBan;
      default:
        return faBox;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case ORDER_STATUSES.PENDING:
        return "text-yellow-600 bg-yellow-50";
      case ORDER_STATUSES.ACTIVE:
        return "text-blue-600 bg-blue-50";
      case ORDER_STATUSES.PRINTING:
        return "text-purple-600 bg-purple-50";
      case ORDER_STATUSES.PRINTED:
        return "text-indigo-600 bg-indigo-50";
      case ORDER_STATUSES.SHIPPED:
        return "text-orange-600 bg-orange-50";
      case ORDER_STATUSES.COMPLETED:
        return "text-green-600 bg-green-50";
      case ORDER_STATUSES.CANCELLED:
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("no-NO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter orders for the current user
  const userOrders = useMemo(() => {
    if (!currentUser?.email) return [];

    return orders
      .filter((order) => order.customer?.email === currentUser.email)
      .sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );
  }, [orders, currentUser]);

  if (loading) {
    return (
      <ResponsiveWidthWrapper>
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600">Loading your orders...</p>
        </div>
      </ResponsiveWidthWrapper>
    );
  }

  return (
    <ResponsiveWidthWrapper>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="mt-2 text-gray-600">View and track all your orders</p>
        </div>

        {userOrders.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <FontAwesomeIcon
              icon={faShoppingBag}
              className="mx-auto mb-4 text-5xl text-gray-400"
            />
            <p className="text-lg text-gray-600">No orders yet</p>
            <p className="mt-2 text-sm text-gray-500">
              Your order history will appear here once you make a purchase
            </p>
            <button
              onClick={() => navigate("/store")}
              className="mt-6 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-darker"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Order #{order.orderNumber}
                      </h3>
                      <span
                        className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium capitalize ${getStatusColor(order.status)}`}
                      >
                        <FontAwesomeIcon icon={getStatusIcon(order.status)} />
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Ordered: {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {order.total}kr
                    </p>
                    <div className="mt-1 flex items-center justify-end gap-2">
                      {order.isPaid ? (
                        <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                          <FontAwesomeIcon icon={faMoneyBillWave} />
                          Paid
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-red-600">
                          Unpaid
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                {order.items && order.items.length > 0 && (
                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <img
                          src={getImageUrl(item.thumbnailId)}
                          alt={item.title}
                          className="h-20 w-20 rounded-md border border-gray-200 object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {item.price}kr each
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {item.price * item.quantity}kr
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Order Summary */}
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{order.subtotal}kr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">{order.shipping}kr</span>
                  </div>
                  {order.savings > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Savings:</span>
                      <span className="font-medium">-{order.savings}kr</span>
                    </div>
                  )}
                  <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 text-lg font-bold">
                    <span>Total:</span>
                    <span>{order.total}kr</span>
                  </div>
                </div>

                {/* Order Notes */}
                {order.notes && (
                  <div className="mt-4 rounded-lg bg-gray-50 p-3">
                    <p className="text-sm font-medium text-gray-700">Note:</p>
                    <p className="mt-1 text-sm text-gray-600">{order.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ResponsiveWidthWrapper>
  );
};

export default OrderHistory;
