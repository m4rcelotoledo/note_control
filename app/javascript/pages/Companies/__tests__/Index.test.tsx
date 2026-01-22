import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockLayout } from "../../../test/mocks/react";

// Mock Inertia.js
const mockRouter = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  reload: vi.fn(),
  visit: vi.fn(),
  replace: vi.fn(),
  remember: vi.fn(),
  forget: vi.fn(),
  restore: vi.fn(),
};

vi.mock("@inertiajs/react", () => {
  const mockRouterInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    reload: vi.fn(),
    visit: vi.fn(),
    replace: vi.fn(),
    remember: vi.fn(),
    forget: vi.fn(),
    restore: vi.fn(),
  };
  
  return {
    Head: ({ title }: { title: string }) => <title>{title}</title>,
    Link: ({ href, children, className, ...props }: any) => (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    ),
    router: mockRouterInstance,
  };
});

// Mock Layout
vi.mock("../../../components/Layout", () => ({
  default: MockLayout,
}));

// Mock CNPJ utils
vi.mock("../../../utils/cnpj", () => ({
  formatCNPJ: (value: string) => {
    if (!value) return "";
    const numbers = value.replace(/\D/g, "").slice(0, 14);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5)
      return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8)
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12)
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  },
}));

// Mock window.confirm
const mockConfirm = vi.fn(() => true);
global.confirm = mockConfirm;

// Import after mocks
import CompaniesIndex from "../Index";

describe("CompaniesIndex", () => {
  const mockCompanies = [
    {
      id: 1,
      name: "Company One",
      cnpj: "12345678000190",
      invoices_count: 5,
      created_at: "2024-01-01T00:00:00Z",
    },
    {
      id: 2,
      name: "Company Two",
      cnpj: "98765432000110",
      invoices_count: 3,
      created_at: "2024-01-02T00:00:00Z",
    },
    {
      id: 3,
      name: "Company Three",
      invoices_count: 0,
      created_at: "2024-01-03T00:00:00Z",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockConfirm.mockReturnValue(true);
  });

  it("should render the page title and new company button", () => {
    render(<CompaniesIndex companies={mockCompanies} />);

    expect(screen.getByText("Empresas")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Nova Empresa" })).toBeInTheDocument();
  });

  it("should display empty state when no companies", () => {
    render(<CompaniesIndex companies={[]} />);

    expect(
      screen.getByText("Nenhuma empresa cadastrada ainda.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Cadastrar primeira empresa" })
    ).toBeInTheDocument();
  });

  it("should display all companies in the list", () => {
    render(<CompaniesIndex companies={mockCompanies} />);

    expect(screen.getByText("Company One")).toBeInTheDocument();
    expect(screen.getByText("Company Two")).toBeInTheDocument();
    expect(screen.getByText("Company Three")).toBeInTheDocument();
  });

  it("should display formatted CNPJ for companies with CNPJ", () => {
    render(<CompaniesIndex companies={mockCompanies} />);

    // Check that CNPJ is displayed with formatting
    expect(screen.getByText(/CNPJ: 12\.345\.678\/0001-90/)).toBeInTheDocument();
    expect(screen.getByText(/CNPJ: 98\.765\.432\/0001-10/)).toBeInTheDocument();
  });

  it("should not display CNPJ for companies without CNPJ", () => {
    render(<CompaniesIndex companies={mockCompanies} />);

    const companyThree = screen.getByText("Company Three").closest("li");
    expect(companyThree).not.toHaveTextContent("CNPJ:");
  });

  it("should display invoice count for each company", () => {
    render(<CompaniesIndex companies={mockCompanies} />);

    expect(screen.getByText("5 nota(s) fiscal(is)")).toBeInTheDocument();
    expect(screen.getByText("3 nota(s) fiscal(is)")).toBeInTheDocument();
    expect(screen.getByText("0 nota(s) fiscal(is)")).toBeInTheDocument();
  });

  it("should display edit and delete buttons for each company", () => {
    render(<CompaniesIndex companies={mockCompanies} />);

    const editButtons = screen.getAllByRole("link", { name: "Editar" });
    const deleteButtons = screen.getAllByRole("button", { name: "Excluir" });

    expect(editButtons).toHaveLength(3);
    expect(deleteButtons).toHaveLength(3);
  });

  it("should have correct edit link href", () => {
    render(<CompaniesIndex companies={mockCompanies} />);

    const editLinks = screen.getAllByRole("link", { name: "Editar" });
    expect(editLinks[0]).toHaveAttribute("href", "/companies/1/edit");
    expect(editLinks[1]).toHaveAttribute("href", "/companies/2/edit");
    expect(editLinks[2]).toHaveAttribute("href", "/companies/3/edit");
  });

  it("should call router.delete when delete button is clicked and confirmed", async () => {
    const user = userEvent.setup();
    mockConfirm.mockReturnValue(true);
    const { router } = await import("@inertiajs/react");

    render(<CompaniesIndex companies={mockCompanies} />);

    const deleteButtons = screen.getAllByRole("button", { name: "Excluir" });
    await user.click(deleteButtons[0]);

    expect(mockConfirm).toHaveBeenCalledWith(
      "Tem certeza que deseja excluir esta empresa?"
    );
    expect(router.delete).toHaveBeenCalledWith("/companies/1");
  });

  it("should not call router.delete when delete is cancelled", async () => {
    const user = userEvent.setup();
    mockConfirm.mockReturnValue(false);
    const { router } = await import("@inertiajs/react");
    vi.clearAllMocks();

    render(<CompaniesIndex companies={mockCompanies} />);

    const deleteButtons = screen.getAllByRole("button", { name: "Excluir" });
    await user.click(deleteButtons[0]);

    expect(mockConfirm).toHaveBeenCalled();
    expect(router.delete).not.toHaveBeenCalled();
  });

  it("should handle single company", () => {
    render(<CompaniesIndex companies={[mockCompanies[0]]} />);

    expect(screen.getByText("Company One")).toBeInTheDocument();
    expect(screen.queryByText("Company Two")).not.toBeInTheDocument();
  });
});
