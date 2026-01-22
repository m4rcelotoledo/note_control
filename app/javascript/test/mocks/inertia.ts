import { vi } from "vitest";

// Mock useForm
export const mockUseForm = (initialData: any = {}) => {
  const data = { ...initialData };
  const errors: any = {};
  let processing = false;

  return {
    data,
    errors,
    processing,
    setData: vi.fn((key: string, value: any) => {
      data[key] = value;
    }),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    get: vi.fn(),
    reset: vi.fn(),
    clearErrors: vi.fn(),
    setError: vi.fn(),
    transform: vi.fn((callback: (data: any) => any) => {
      return callback;
    }),
  };
};

// Mock Head component
export const MockHead = ({ title }: { title: string }) => {
  return <title>{title}</title>;
};

// Mock Link component
export const MockLink = ({
  href,
  children,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
};

// Mock router
export const mockRouter = {
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

// Export for use in tests
export default mockRouter;
