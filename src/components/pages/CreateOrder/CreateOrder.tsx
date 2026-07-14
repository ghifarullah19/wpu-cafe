import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { ICart, IMenu } from "../../../types/order";
import { getMenus } from "../../../services/menu.service";
import styles from "./CreateOrder.module.css";
import { filters, tables } from "./CreateOrder.constants";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select/Select";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { createOrder } from "../../../services/orders.service";

const CreateOrder = () => {
  const [menus, setMenus] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [carts, setCarts] = useState<ICart[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingMenu, setIsFetchingMenu] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsFetchingMenu(true);
        const result = await getMenus(searchParams.get("category") as string);
        setMenus(result.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      } finally {
        setIsFetchingMenu(false);
      }
    };
    fetchOrder();
  }, [searchParams.get("category")]);

  const handleAddToCart = (type: string, id: string, name: string) => {
    const itemIsInCart = carts.find((item: ICart) => item.menuId === id);

    if (type === "increment") {
      if (itemIsInCart) {
        setCarts(
          carts.map((item: ICart) =>
            item.menuId === id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        );
      } else {
        setCarts([...carts, { menuId: id, quantity: 1, name }]);
      }
    } else {
      if (itemIsInCart && itemIsInCart.quantity <= 1) {
        setCarts(carts.filter((item: ICart) => item.menuId !== id));
      } else {
        setCarts(
          carts.map((item: ICart) =>
            item.menuId === id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        );
      }
    }
  };

  const navigate = useNavigate();

  const handleOrder = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const payload = {
      customerName: form.customerName.value,
      tableNumber: form.tableNumber.value,
      cart: carts.map((item: ICart) => ({
        menuItemId: item.menuId,
        quantity: item.quantity,
        notes: item.notes || "",
      })),
    };

    try {
      setIsSubmitting(true);
      await createOrder(payload);
      return navigate("/orders");
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.create}>
      <div className={styles.menu}>
        <h1>Explore Our Best Menu</h1>
        <div className={styles.filter}>
          {filters.map((filter) => (
            <Button
              type="button"
              color={
                (!searchParams.get("category") && filter === "All") ||
                searchParams.get("category") === filter
                  ? "primary"
                  : "secondary"
              }
              key={filter}
              onClick={() =>
                setSearchParams(filter === "All" ? {} : { category: filter })
              }
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className={styles.list}>
          {isFetchingMenu ? (
            <LoadingSpinner centered />
          ) : (
            menus.map((item: IMenu) => (
              <div className={styles.item} key={item.id}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className={styles.image}
                />
                <h2>{item.name}</h2>
                <div className={styles.bottom}>
                  <p className={styles.price}>Rp {item.price.toLocaleString("id-ID")}</p>
                  <Button
                    type="button"
                    onClick={() =>
                      handleAddToCart("increment", `${item.id}`, `${item.name}`)
                    }
                    color="secondary"
                  >
                    Add
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <form className={styles.form} onSubmit={handleOrder}>
        <div>
          <div className={styles.header}>
            <h2 className={styles.title}>Customer Info</h2>
            <Link to="/orders">
              <Button type="button" color="secondary">Back</Button>
            </Link>
          </div>
          <div className={styles.input}>
            <Input
              id="name"
              label="Name"
              name="customerName"
              placeholder="Insert Name"
              required
            />
            <Select
              id="table"
              label="Table Number"
              name="tableNumber"
              options={tables}
              required
            />
          </div>
        </div>

        <div>
          <div className={styles.header}>
            <h2 className={styles.title}>Current Order</h2>
          </div>
          <div className={styles.cart}>
            {carts.length > 0 ? (
              <>
                {carts.map((item: ICart) => (
                  <div className={styles.item} key={item.menuId}>
                    <h4>{item.name}</h4>
                    <div className={styles.quantity}>
                      <Button
                        type="button"
                        onClick={() =>
                          handleAddToCart(
                            "decrement",
                            `${item.menuId}`,
                            `${item.name}`,
                          )
                        }
                        color="secondary"
                      >
                        -
                      </Button>
                      <div className={styles.quantityValue}>{item.quantity}</div>
                      <Button
                        type="button"
                        onClick={() =>
                          handleAddToCart(
                            "increment",
                            `${item.menuId}`,
                            `${item.name}`,
                          )
                        }
                        color="secondary"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
                <div className={styles.submitWrapper}>
                  <Button type="submit" isLoading={isSubmitting}>Place Order</Button>
                </div>
              </>
            ) : (
              <p className={styles["empty-cart"]}>Your cart is empty</p>
            )}
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateOrder;
