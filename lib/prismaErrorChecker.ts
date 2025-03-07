import { Prisma } from "@prisma/client";

// @ts-ignore
export function prismaErrorChecker(error) {
  if (error === null) {
    console.error("Error fetching upcoming programs: error is null");
    return {
      status: "ERROR",
      error:
        "Error is null",
    };
  }
  // Handle specific error types
  else if (error instanceof Prisma.PrismaClientInitializationError) {
    // Database connection error
    console.error("Database connection error:", error.message);
    return {
      status: "ERROR",
      error:
        "Database connection error. Please check your database configuration.",
    };
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    // Validation error (e.g., invalid query parameters)
    console.error("Validation error:", error.message);
    return {
      status: "ERROR",
      error: "Invalid query parameters. Please check your input.",
    };
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Known request error (e.g., unique constraint violation)
    console.error("Database request error:", error.message);
    return {
      status: "ERROR",
      error: `Database request error: ${error.message}`,
    };
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    // Unknown request error
    console.error("Unknown database error:", error.message);
    return {
      status: "ERROR",
      error: "An unknown database error occurred.",
    };
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    // Critical database error (e.g., Rust panic in Prisma)
    console.error("Critical database error (Rust panic):", error.message);
    return {
      status: "ERROR",
      error: "A critical database error occurred. Please contact support.",
    };
  } else {
    // Generic error (e.g., network issues, unexpected errors)
    console.error("Unexpected error:", error.message || error);
    return {
      status: "ERROR",
      error:
        error.message ||
        "Something went wrong while fetching upcoming programs.",
    };
  }
}