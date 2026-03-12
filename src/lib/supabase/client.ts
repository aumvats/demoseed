import { createBrowserClient } from "@supabase/ssr";

let _client: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseClient() {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return a mock client for development without Supabase configured
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } },
        }),
        signInWithOAuth: async () => ({ data: null, error: null }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({ data: [], error: null, count: 0 }),
        insert: async () => ({ data: null, error: null }),
        update: () => ({
          eq: () => ({ is: () => ({ order: () => ({ limit: async () => ({ data: null, error: null }) }) }) }),
        }),
      }),
      rpc: async () => ({ data: null, error: null }),
    } as unknown as ReturnType<typeof createBrowserClient>;
  }

  _client = createBrowserClient(url, key);
  return _client;
}
