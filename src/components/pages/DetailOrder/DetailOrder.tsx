import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { IOrder, ICart } from "../../../types/order";
import { getOrderById, updateOrder } from "../../../services/orders.service";
import styles from "./DetailOrder.module.css";
import Button from "../../ui/Button";

const DetailOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refetchOrder, setRefetchOrder] = useState(true);

  useEffect(() => {
    if (refetchOrder) {
      const fetchOrder = async () => {
        try {
          const result = await getOrderById(`${id}`);
          setOrder(result);
        } catch {
          setError("Gagal memuat data pesanan");
        }
      };
      fetchOrder();
      setRefetchOrder(false);
    }
  }, [id, refetchOrder]);

  const handleCompletedOrder = async () => {
    if (!id) return;
    await updateOrder(id, { status: "COMPLETED" }).then(() => {
      setRefetchOrder(true);
    });
  };

  const getStatusBadgeClass = (status: string) => {
    if (status === "PROCESSING") return styles["badge-processing"];
    if (status === "COMPLETED") return styles["badge-completed"];
    return null;
  };

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <main className={styles.detail}>
      <div className={styles.container}>
        <section className={styles.header}>
          <h1>Order Detail</h1>
          <Link to="/orders">
            <Button color="secondary">Back</Button>
          </Link>
        </section>
        
        <section className={styles.order}>
          <div className={styles.info}>
            <div className={styles.item}>
              <p>Order ID:</p>
              <h4>{order?.id}</h4>
            </div>
            <div className={styles.item}>
              <p>Customer:</p>
              <h4>{order?.customer_name}</h4>
            </div>
            <div className={styles.item}>
              <p>Table:</p>
              <h4>{order?.table_number}</h4>
            </div>
            <div className={styles.item}>
              <p>Status:</p>
              <h4>
                {order?.status ? (
                  <span className={`${styles.badge} ${getStatusBadgeClass(order.status) || ""}`}>
                    {order.status}
                  </span>
                ) : (
                  "-"
                )}
              </h4>
            </div>
            <div className={styles.item}>
              <p>Total:</p>
              <h4>Rp {order?.total?.toLocaleString("id-ID")}</h4>
            </div>
            {order?.status === "PROCESSING" && (
              <div className={styles.completeAction}>
                <Button onClick={handleCompletedOrder}>
                  Selesaikan Pesanan
                </Button>
              </div>
            )}
          </div>
          
          <div className={styles.cart}>
            <h3>Order Items</h3>
            <div className={styles.list}>
              {order?.cart?.map((item: ICart) => (
                <div className={styles.cardItem} key={item.menuId}>
                  <img
                    className={styles.image}
                    src={item?.menuItem?.image_url}
                    alt={item?.menuItem?.name}
                  />
                  <div className={styles.itemDetails}>
                    <p className={styles.name}>
                      {item.quantity} x {item?.menuItem?.name}
                    </p>
                    <p className={styles.price}>
                      Rp {(parseInt(`${item?.menuItem?.price}`) * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DetailOrder;
