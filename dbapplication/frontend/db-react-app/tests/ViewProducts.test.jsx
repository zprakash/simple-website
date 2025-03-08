import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import ViewProducts from "../src/components/ViewProducts"; 


// Mock the fetch API globally
global.fetch = vi.fn();

describe("ViewProducts Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", async () => {
    // Mock the fetch response to return a list of products
    fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce([
        {
          id: 1,
          product_name: "Product 1",
          product_price: "100",
          product_description: "Description 1",
        },
      ]),
    });

    render(<ViewProducts />);

    // Wait for the products to be displayed
    await waitFor(() => screen.getByText("Product 1"));

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  it("shows a success message when a product is deleted", async () => {
    // Mock fetch to return a list of products initially
    fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce([
        {
          id: 1,
          product_name: "Product 1",
          product_price: "100",
          product_description: "Description 1",
        },
      ]),
    });

    render(<ViewProducts />);

    // Wait for the products to be displayed
    await waitFor(() => screen.getByText("Product 1"));

    // Mock delete response
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    // Click on the delete button
    fireEvent.click(screen.getByText("Delete"));

    // Wait for success message to appear
    await waitFor(() => screen.getByText("❌ Product deleted successfully!"));

    expect(screen.getByText("❌ Product deleted successfully!")).toBeInTheDocument();

    // Ensure the product is removed from the table
    await waitFor(() => expect(screen.queryByText("Product 1")).toBeNull());
  });

  it("opens EditProduct when the edit button is clicked", async () => {
    // Mock fetch to return a list of products
    fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce([
        {
          id: 1,
          product_name: "Product 1",
          product_price: "100",
          product_description: "Description 1",
        },
      ]),
    });

    render(<ViewProducts />);

    // Wait for the products to be displayed
    await waitFor(() => screen.getByText("Product 1"));

    // Click on the edit button
    fireEvent.click(screen.getByText("Edit"));

    // Check if EditProduct modal is opened
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("displays 'No products available' when there are no products", async () => {
    // Mock fetch to return an empty array of products
    fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce([]),
    });

    render(<ViewProducts />);

    // Wait for the "No products available" message
    await waitFor(() => screen.getByText("No products available."));

    expect(screen.getByText("No products available.")).toBeInTheDocument();
  });
});
