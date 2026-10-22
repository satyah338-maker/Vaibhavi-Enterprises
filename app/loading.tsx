// app/loading.tsx

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#0E9696] border-solid" />
    </div>
  );
}
