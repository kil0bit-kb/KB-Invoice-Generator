import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";

describe("code quality", () => {
  it("ESLint reports zero errors and zero warnings", () => {
    execSync("npx eslint src/ --max-warnings 0", {
      encoding: "utf-8",
      stdio: "pipe",
    });
  });

  it("TypeScript compiles without errors", () => {
    execSync("npx tsc --noEmit", {
      encoding: "utf-8",
      stdio: "pipe",
    });
  });

  it("no unused exports in source", () => {
    const result = execSync("npx ts-prune", {
      encoding: "utf-8",
      stdio: "pipe",
    });
    const lines = result.trim().split("\n").filter(Boolean);
    // Filter out exports consumed within their own module
    // (e.g. InvoiceItem and BankDetails used in InvoiceData interface)
    const trulyDead = lines.filter((l) => !l.includes("(used in module)"));
    expect(trulyDead).toEqual([]);
  });
});
