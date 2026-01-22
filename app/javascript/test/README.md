# JavaScript/TypeScript Tests

This project uses **Vitest** for unit testing JavaScript/TypeScript code.

## Running Tests

```bash
# Run tests in watch mode
yarn test

# Run tests once
yarn test:run

# Run tests with UI
yarn test:ui

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test:run Companies/New
```

## Test Structure

Tests are located alongside the code they test:

```
app/javascript/
  ├── utils/
  │   ├── cnpj.ts
  │   └── __tests__/
  │       └── cnpj.test.ts
  ├── hooks/
  │   ├── useCNPJMask.ts
  │   └── __tests__/
  │       └── useCNPJMask.test.tsx
  ├── pages/
  │   └── Companies/
  │       ├── New.tsx
  │       ├── Edit.tsx
  │       ├── Index.tsx
  │       └── __tests__/
  │           ├── New.test.tsx
  │           ├── Edit.test.tsx
  │           └── Index.test.tsx
  ├── components/
  │   └── __tests__/
  │       └── ComponentName.test.tsx
  └── test/
      ├── mocks/
      │   ├── inertia.ts     # Mocks for Inertia.js
      │   └── react.tsx      # Mocks for React components
      ├── setup.ts           # Test setup and configuration
      └── README.md          # This file
```

## Writing Tests

### Testing Utilities

```typescript
import { describe, it, expect } from "vitest";
import { formatCNPJ } from "../cnpj";

describe("formatCNPJ", () => {
  it("should format CNPJ correctly", () => {
    expect(formatCNPJ("12345678000190")).toBe("12.345.678/0001-90");
  });
});
```

### Testing Hooks

```typescript
import { renderHook, act } from "@testing-library/react";
import { useCNPJMask } from "../useCNPJMask";

describe("useCNPJMask", () => {
  it("should format value on change", () => {
    const { result } = renderHook(() => useCNPJMask());

    act(() => {
      const mockEvent = {
        target: { value: "12345678000190" },
      } as React.ChangeEvent<HTMLInputElement>;
      result.current.handleChange(mockEvent);
    });

    expect(result.current.displayValue).toBe("12.345.678/0001-90");
  });
});
```

### Testing Inertia.js Pages

For testing Inertia.js pages, you need to mock the Inertia.js dependencies:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockLayout } from "../../../test/mocks/react";

// Mock Inertia.js
vi.mock("@inertiajs/react", () => {
  const { useState } = require("react");

  return {
    Head: ({ title }: { title: string }) => <title>{title}</title>,
    Link: ({ href, children, className, ...props }: any) => (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    ),
    useForm: vi.fn((initialData: any = {}) => {
      const [data, setDataState] = useState(initialData);
      const mockPost = vi.fn();

      const setData = (keyOrData: string | object, value?: any) => {
        if (typeof keyOrData === "string") {
          setDataState((prev: any) => ({ ...prev, [keyOrData]: value }));
        } else {
          setDataState(keyOrData);
        }
      };

      return {
        data,
        errors: {},
        processing: false,
        setData,
        post: mockPost,
        put: vi.fn(),
        transform: vi.fn((callback: any) => callback),
      };
    }),
    router: {
      delete: vi.fn(),
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      // ... other router methods
    },
  };
});

// Mock Layout component
vi.mock("../../../components/Layout", () => ({
  default: MockLayout,
}));

// Import component after mocks
import MyPage from "../MyPage";

describe("MyPage", () => {
  it("should render correctly", () => {
    render(<MyPage />);
    expect(screen.getByText("Page Title")).toBeInTheDocument();
  });
});
```

### Testing React Components

For components that don't depend on Inertia.js:

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyComponent from "../MyComponent";

describe("MyComponent", () => {
  it("should render correctly", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

## Available Mocks

### Inertia.js Mocks

Located in `app/javascript/test/mocks/inertia.ts`:

- `mockUseForm` - Mock for `useForm` hook
- `MockHead` - Mock for `Head` component
- `MockLink` - Mock for `Link` component
- `mockRouter` - Mock for Inertia router

### React Mocks

Located in `app/javascript/test/mocks/react.tsx`:

- `MockLayout` - Mock for Layout component

## Test Coverage

Current test coverage:

- ✅ **Utils** (19 tests) - CNPJ formatting utilities
- ✅ **Hooks** (7 tests) - Custom React hooks
- ✅ **Pages/Companies** (29 tests) - Company pages (New, Edit, Index)

### Running Coverage

```bash
yarn test:coverage
```

Coverage reports are generated in the `coverage-js/` directory.

## Configuration

- **Vitest config**: `vitest.config.ts`
- **Test setup**: `app/javascript/test/setup.ts`
- **Environment**: jsdom (for React components)
- **Test pattern**: `**/*.{test,spec}.{js,ts,jsx,tsx}`

## Best Practices

1. **Test structure**: Place tests in `__tests__/` directories next to the code
2. **Mock external dependencies**: Always mock Inertia.js and other external libraries
3. **Test user interactions**: Use `@testing-library/user-event` for realistic user interactions
4. **Keep tests focused**: Each test should verify one specific behavior
5. **Use descriptive names**: Test names should clearly describe what they're testing

## Examples

See the following test files for examples:

- `app/javascript/utils/__tests__/cnpj.test.ts` - Utility function tests
- `app/javascript/hooks/__tests__/useCNPJMask.test.tsx` - Hook tests
- `app/javascript/pages/Companies/__tests__/New.test.tsx` - Inertia.js page tests
- `app/javascript/pages/Companies/__tests__/Edit.test.tsx` - Form editing tests
- `app/javascript/pages/Companies/__tests__/Index.test.tsx` - List page tests

## Integration with CI/CD

Tests are automatically run in CI/CD pipelines. Make sure all tests pass before pushing code.
