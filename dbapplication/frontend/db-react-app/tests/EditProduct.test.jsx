import { render, screen, fireEvent } from "@testing-library/react";
import EditProduct from "../src/components/EditProduct";

test("renders edit product modal with existing values", () => {
  const product = { id: 1, product_name: "Test Product", product_price: 99.99, product_description: "Test Desc" };
  render(<EditProduct product={product} onClose={() => {}} refreshProducts={() => {}} />);

  expect(screen.getByDisplayValue("Test Product")).toBeInTheDocument();
  expect(screen.getByDisplayValue("99.99")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Test Desc")).toBeInTheDocument();
});

test("updates product and shows success message", async () => {
  const product = { id: 1, product_name: "Test Product", product_price: 99.99, product_description: "Test Desc" };
  render(<EditProduct product={product} onClose={() => {}} refreshProducts={() => {}} />);

  fireEvent.change(screen.getByDisplayValue("Test Product"), { target: { value: "Updated Product" } });
  fireEvent.click(screen.getByText("Update"));

  expect(await screen.findByText("✅ Product updated successfully!")).toBeInTheDocument();
});
