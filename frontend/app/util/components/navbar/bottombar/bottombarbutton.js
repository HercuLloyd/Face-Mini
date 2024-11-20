import { useRouter } from "next/navigation";
export default function BottomBarButton({ icon, route }) {
  const router = useRouter();
  return (
    <div>
      <button className="p-2 font-semibold" onClick={() => router.push(route)}>
        {icon}
      </button>
    </div>
  );
}
