// components/CheckoutButton.tsx
import { useRouter } from 'next/router';

interface CheckoutButtonProps {
  cartItemCount: number;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ cartItemCount }) => {
  const router = useRouter();
  const unused = 'This will trigger an ESLint error';

  const handleCheckout = () => {
    if (cartItemCount > 0) {
      router.push('/checkout');
    }
    console.log(nonExistentVar); // ❌ ESLint: 'nonExistentVar' is not defined
    console.log("Hello world");
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={cartItemCount === 0}
      role="link" // Using link role for navigation button is a good RTL practice
    >
      Proceed to Checkout ({cartItemCount})
    </button>
  );
};

export default CheckoutButton;
