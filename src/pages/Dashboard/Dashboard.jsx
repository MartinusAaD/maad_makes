import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faPlus,
  faImage,
  faFolder,
  faPalette,
  faShoppingCart,
  faExclamationCircle,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";
import ResponsiveWidthWrapper from "../../components/ResponsiveWidthWrapper/ResponsiveWidthWrapper";
import { useOrders, ORDER_STATUSES } from "../../context/OrdersContext";

const Dashboard = () => {
  const { orders } = useOrders();

  // Calculate order statistics
  const pendingOrders = orders.filter(
    (order) => order.status === ORDER_STATUSES.PENDING,
  ).length;
  const activeOrders = orders.filter(
    (order) =>
      order.status === ORDER_STATUSES.ACTIVE ||
      order.status === ORDER_STATUSES.PRINTING ||
      order.status === ORDER_STATUSES.PRINTED ||
      order.status === ORDER_STATUSES.SHIPPED,
  ).length;
  const totalOrders = orders.length;

  const adminCards = [
    {
      title: "Orders",
      description: "Manage customer orders",
      path: "/admin/orders",
      icon: faShoppingCart,
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
      badge: pendingOrders,
    },
    {
      title: "Products List",
      description: "View and manage all products",
      path: "/admin/products-list",
      icon: faBox,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      title: "Add Product",
      description: "Create a new product",
      path: "/admin/add-product",
      icon: faPlus,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      title: "Image Library",
      description: "Manage product images",
      path: "/admin/image-library",
      icon: faImage,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
    {
      title: "Categories",
      description: "Manage product categories",
      path: "/admin/categories",
      icon: faFolder,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
    },
    {
      title: "Filaments",
      description: "Manage filament options",
      path: "/admin/filaments",
      icon: faPalette,
      color: "bg-pink-500",
      hoverColor: "hover:bg-pink-600",
    },
    {
      title: "Waitlist",
      description: "Waitlist for upcoming Characters",
      path: "/admin/waitlist",
      icon: faScroll,
      color: "bg-yellow-400",
      hoverColor: "hover:bg-yellow-600",
    },
  ];

  return (
    <div className="py-8">
      <ResponsiveWidthWrapper>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your store products, images, and settings
            </p>
          </div>

          {/* Order Statistics */}
          {totalOrders > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">
                      Pending Orders
                    </p>
                    <p className="text-3xl font-bold text-yellow-600">
                      {pendingOrders}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="text-4xl text-yellow-500 opacity-20"
                  />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">
                      Active Orders
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {activeOrders}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-4xl text-blue-500 opacity-20"
                  />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-gray-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">
                      Total Orders
                    </p>
                    <p className="text-3xl font-bold text-gray-600">
                      {totalOrders}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faBox}
                    className="text-4xl text-gray-500 opacity-20"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminCards.map((card) => (
              <Link
                key={card.path}
                to={card.path}
                className={`${card.color} ${card.hoverColor} text-white rounded-lg p-6 shadow-lg transition-all duration-200 active:scale-95 hover:shadow-xl no-underline relative`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={card.icon} className="text-3xl" />
                    <h2 className="text-xl font-bold text-white m-0">
                      {card.title}
                    </h2>
                  </div>
                  <p className="text-white/90 m-0">{card.description}</p>
                </div>
                {card.badge > 0 && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center shadow-lg">
                    {card.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </ResponsiveWidthWrapper>
    </div>
  );
};

export default Dashboard;
