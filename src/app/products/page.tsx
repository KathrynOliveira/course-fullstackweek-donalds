import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductsPage = () => {
  return (
    <div className="border-500 rounded-xl border p-5">
      <h1 className="text-red-500">Products Page</h1>;<Button>Click Me</Button>;
      <Input placeholder="Type here..." />
    </div>
  );
};
export default ProductsPage;
