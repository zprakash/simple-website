import { render, screen, fireEvent } from "@testing-library/react";
import AddProduct from "../src/components/AddProduct"

test("renders add product form", () => {
  render(<AddProduct />);
  
  expect(screen.getByPlaceholderText("Product Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Product Price")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Product Description")).toBeInTheDocument();
  expect(screen.getByText("Add Product")).toBeInTheDocument();
});

test("submits form and shows success message", async () => {
  render(<AddProduct />);

  fireEvent.change(screen.getByPlaceholderText("Product Name"), { target: { value: "Test Product" } });
  fireEvent.change(screen.getByPlaceholderText("Product Price"), { target: { value: "99.99" } });
  fireEvent.change(screen.getByPlaceholderText("Product Description"), { target: { value: "Test Description" } });

  fireEvent.click(screen.getByText("Add Product"));

  expect(await screen.findByText("✅ Product added successfully!")).toBeInTheDocument();
});
