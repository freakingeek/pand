export function success(payload: unknown) {
  return { status: "success", data: payload };
}

export function fail(error: unknown) {
  return { status: "failed", error };
}
