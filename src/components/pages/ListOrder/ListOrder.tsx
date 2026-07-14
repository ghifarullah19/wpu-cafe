import { useState } from "react";
import useSWR from "swr";
import { updateOrder } from "../../../services/orders.service";
import styles from "./ListOrder.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Skeleton from "../../ui/Skeleton";
import type { IOrder } from "../../../types/order";
import { removeLocalStorage } from "../../../utils/storage";
import { fetcher } from "../../../utils/fetch";
import { environment } from "../../../constants/environment";

const ListOrder = () => {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data, isLoading, mutate } = useSWR(`${environment.API_URL}/orders?page=1&pageSize=10`, fetcher);
  const orders = data?.data || [];

  const handleCompletedOrder = async (id: string) => {
    try {
      setUpdatingId(id);
      await updateOrder(id, { status: "COMPLETED" });
      mutate();
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalStorage("auth");
    return navigate("/login");
  };

  const getStatusBadgeClass = (status: string) => {
    if (status === "PROCESSING") return styles["badge-processing"];
    if (status === "COMPLETED") return styles["badge-completed"];
    return null;
  };

  return (
    <main className={styles.order}>
      <div className={styles.container}>
        <section className={styles.header}>
          <h1 className={styles.title}>List Order</h1>
          <div className={styles.button}>
            <Link to="/create">
              <Button>+ New Order</Button>
            </Link>
            <Button color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </section>
        <section className={styles.list}>
          {isLoading ? (
            <Skeleton type="orderCard" count={3} />
          ) : (
            <>
              {orders.map((order: IOrder) => (
            <div key={order.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>{order.customer_name}</h2>
                {getStatusBadgeClass(order.status) !== null ? (
                  <span className={`${styles.badge} ${getStatusBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                ) : (
                  <span className={styles.badge}>{order.status}</span>
                )}
              </div>
              <div className={styles.cardBody}>
                <p><strong>Table:</strong> {order.table_number}</p>
                <p><strong>Total:</strong> Rp {order.total.toLocaleString("id-ID")}</p>
              </div>
              <div className={styles.action}>
                <Link to={`/orders/${order.id}`}>
                  <Button color="secondary">Detail</Button>
                </Link>
                {order.status === "PROCESSING" && (
                  <Button isLoading={updatingId === order.id} onClick={() => handleCompletedOrder(order.id)}>
                    Completed
                  </Button>
                )}
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className={styles.empty}>No orders found.</p>
          )}
          </>
        )}
        </section>
      </div>
    </main>
  );
};

export default ListOrder;
