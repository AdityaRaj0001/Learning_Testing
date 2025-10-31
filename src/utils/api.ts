export async function fetchUserName(): Promise<string> {
  // Simulates an API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return 'Anya Jenkins';
}
