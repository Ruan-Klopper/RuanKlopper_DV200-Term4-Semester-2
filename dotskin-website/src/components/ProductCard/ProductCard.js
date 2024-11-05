import dynamic from "next/dynamic";
import "./ProductCard.css";
import Link from "next/link";
import { useCart } from "@/hooks/useCart"; // Import useCart hook
import { Container, Row, Col } from "react-bootstrap";

const MobileCard = ({ id, title, price, rating, image, handleAddToCart }) => {
  return (
    <div className="mpcBody">
      <Link
        href={`/products/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="mpcBGtext">{title}</div>
        <div className="mpcConent">
          <div
            className="mpcImage"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="mpcContentContainer">
            <div>
              <div className="mpcRatingGroup">
                <div className="mpcRatingIcon"></div>
                <div className="mpcRating">{rating}</div>
              </div>
              <div className="mpcProductTitle">{title}</div>
              <div className="mpcProductPrice">{price}</div>
            </div>
          </div>
        </div>
      </Link>
      {/* Button outside of Link to prevent navigation */}
      <button className="fancyGreenButton" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

const DesktopCard = ({ id, title, price, rating, image, handleAddToCart }) => {
  return (
    <div className="dpcBody">
      <Link
        href={`/products/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="dpcConent">
          <div
            className="dpcImage"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="dpcContentContainer">
            <div>
              <div className="dpcRatingGroup">
                <div className="dpcRatingIcon"></div>
                <div className="dpcRating">{rating}</div>
              </div>
              <div className="dpcProductTitle">{title}</div>
              <div className="dpcProductPrice">{price}</div>
            </div>
          </div>
        </div>
      </Link>
      {/* Button outside of Link to prevent navigation */}
      <button
        className="fancyGreenButton"
        onClick={handleAddToCart}
        style={{ marginLeft: "30px", marginTop: "10px" }}
      >
        Add to Cart
      </button>
    </div>
  );
};

// Main ProductCard Component
export default function ProductCard({
  cardType,
  id,
  title,
  price,
  rating,
  image,
}) {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching product: ${response.statusText}`);
      }
      const product = await response.json();
      addToCart(product); // Add product data to the cart
      alert("Product added to cart!");
    } catch (err) {
      console.error("Failed to add product to cart:", err);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <div>
      {cardType === "desktop" ? (
        <DesktopCard
          id={id}
          title={title}
          price={price}
          rating={rating}
          image={image}
          handleAddToCart={handleAddToCart}
        />
      ) : (
        <MobileCard
          id={id}
          title={title}
          price={price}
          rating={rating}
          image={image}
          handleAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
