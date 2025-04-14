import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-xl font-semibold">Orders List</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={order._id || index}
              className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300 shadow-sm bg-white"
            >
              {/* Product Info */}
              <div className="flex gap-5 max-w-80">
                <img
                  className="w-12 h-12 object-contain"
                  src={assets.box_icon}
                  alt="Order"
                />
                <div>
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex flex-col">
                      <p className="font-medium text-sm">
                        {item.product?.name || 'Unnamed Product'}
                        <span className="text-primary ml-1">× {item.quantity}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address Info */}
              <div className="text-sm md:text-base text-black/70 max-w-xs">
                {order.address ? (
                  <>
                    <p className="text-black font-medium">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p>{order.address.street}, {order.address.city}</p>
                    <p>{order.address.state}, {order.address.zipcode}</p>
                    <p>{order.address.country}</p>
                    <p>📞 {order.address.phone}</p>
                  </>
                ) : (
                  <p className="text-red-500">No address info</p>
                )}
              </div>

              {/* Amount */}
              <p className="font-semibold text-lg my-auto text-black">
                {currency}{order.amount}
              </p>

              {/* Order Meta */}
              <div className="flex flex-col text-sm md:text-base text-black/70">
                <p>Method: <span className="text-black">{order.paymentType}</span></p>
                <p>Date: <span className="text-black">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                <p>
                  Payment:
                  <span className={`ml-1 px-2 py-1 rounded text-white text-xs font-medium ${order.isPaid ? 'bg-green-600' : 'bg-yellow-500'}`}>
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

