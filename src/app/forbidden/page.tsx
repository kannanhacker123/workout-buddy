import { SignInButton } from '@clerk/nextjs';

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">403 Forbidden</h1>
      <p className="mb-6">You must be signed in to access this page.</p>
      <SignInButton>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          Sign In
        </button>
      </SignInButton>
    </div>
  );
}
