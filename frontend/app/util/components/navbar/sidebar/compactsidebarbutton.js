import { useRouter } from "next/navigation";
export default function CompactSideBarButton({ icon, route }) {
  const router = useRouter();
  return (
    <div className="flex w-1/2 justify-center">
      <button className="font-semibold" onClick={() => router.push(route)}>
        {icon}
      </button>
    </div>
  );
}
